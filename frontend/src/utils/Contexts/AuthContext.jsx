// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// (A mettre dans le .env)
const API_BASE = import.meta.env.VITE_REACT_APP_URL_BACKEND;

// Cette variable définit a quelle moment on refait un token (ici j'ai mis 30 secondes avant qu'il expire)
const REFRESH_BUFFER_MS = 10 * 1000;


export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));
    const [userRole, setUserRole] = useState(null);
    const [username, setUsername] = useState(null);
    const [user, setUser] = useState(null);
    const refreshTimer = useRef(null);

    // Logout : supprime le cookie et reset état
    const logout = useCallback(() => {
        console.log("Déconnexion")
        Cookies.remove('token');
        setIsLoggedIn(false);
        setUserRole(null);
        setUsername(null);
        setUser(null);
        clearTimeout(refreshTimer.current);
    }, []);

    // Parse et extrait role/username du JWT
    const parseToken = useCallback((token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUserRole(payload.role || null);
            setUsername(payload.username || null);
        } catch {
            setUserRole(null);
            setUsername(null);
        }
    }, []);

    // Fonction pour rafraîchir le token via l'API
    const refreshAuthToken = useCallback(async () => {
        console.log("refresh-token");
        try {
            // récupère le refreshToken stocké
            const refreshToken = Cookies.get('refreshToken');

            if (!refreshToken){
                throw new Error('Refresh token manquant');
            }

            const res = await fetch(`${API_BASE}/auth/refresh-tokens`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            if(!res.ok){
                throw new Error('Refresh échoué');
            }

            const data = await res.json();
            const newToken = data.data.tokens.accessToken.token;
            const newRefreshToken = data.data.tokens.refreshToken.token;

            if (newToken && newRefreshToken) {
                // mise à jour des cookies
                const payload = JSON.parse(atob(newToken.split('.')[1]));
                const expiresAt = new Date(payload.exp * 1000);
                const days = (expiresAt - new Date()) / (1000 * 60 * 60 * 24);

                // stocke aussi le nouveau token
                Cookies.set('token', newToken, { expires: days, path: '/' });
                // stocke aussi le nouveau refresh token
                Cookies.set('refreshToken', newRefreshToken, { expires: 7, path: '/' });
                // re-planifier un rafraichissement
                scheduleRefresh(newToken);
                parseToken(newToken);
            }
        } catch (err) {
            // en cas d'erreur, on logout
            logout();
        }
    }, [logout, parseToken]);


    // Planifie le rafraîchissement automatique du token s'il va expirer
    const scheduleRefresh = useCallback((token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiresAt = payload.exp * 1000;
            const now = Date.now();
            const delay = expiresAt - now - REFRESH_BUFFER_MS;
            if (delay > 0) {
                clearTimeout(refreshTimer.current);
                refreshTimer.current = setTimeout(() => {
                    refreshAuthToken();
                }, delay);
            }
        } catch {
            console.log("erreur authtoken")
        }
    }, [refreshAuthToken]);

    // Au montage, ou quand isLoggedIn change
    useEffect(() => {
        const token = Cookies.get('token');
        const userData = Cookies.get('user');
        if (token) {
            parseToken(token);
            scheduleRefresh(token);
            setIsLoggedIn(true);
            if(userData){
                setUser(JSON.parse(userData));
            }
        } else {
            setIsLoggedIn(false);
            setUserRole(null);
            setUsername(null);
            setUser(null);
            clearTimeout(refreshTimer.current);
        }
    }, [isLoggedIn, parseToken, scheduleRefresh]);

    // Login : envoie userName/password, stocke le JWT et extrait user
    const login = useCallback(async (userName, password) => {
        const res = await fetch(`${API_BASE}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ userName, password }),
        });

        if (!res.ok) {throw new Error('Échec de la connexion');}

        // On choppe les infos des tokens
        const data = await res.json();
        const newToken = data.data.tokens.accessToken.token;
        const newRefreshToken = data.data.tokens.refreshToken.token;

        if (!newToken) {throw new Error('Token manquant dans la réponse');}

        setUser(data.data.user);

        // Stockage des infos dans le cookie
        const payload = JSON.parse(atob(newToken.split('.')[1]));
        const expiresAt = new Date(payload.exp * 1000);
        const days = (expiresAt - new Date()) / (1000 * 60 * 60 * 24);
        Cookies.set('token', newToken, { expires: days });
        Cookies.set('refreshToken', newRefreshToken, { expires: 7, path: '/' });
        Cookies.set('isLoggedIn', true, { expires: days });
        Cookies.set("user", JSON.stringify(data.data.user), { expires: days });
        setIsLoggedIn(true);
        parseToken(newToken);
        scheduleRefresh(newToken);
    }, [parseToken, scheduleRefresh, user]);


    // Vérification des accès de l'utilisateur
    const fetchMeAndCheckAccess = useCallback(async (allowedRoles) => {
        try {
            const token = Cookies.get('token');
            const res = await fetch(`${API_BASE}/auth/me`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error("Erreur dans la requête");

            const data = await res.json();
            setUser(data);
            setIsLoggedIn(true);

            // Vérifie l'accès
            const roleNames = Array.isArray(data.data.roles) ? data.data.roles.map(r => r.name) : [];
            console.log("Rôles utilisateur : " + roleNames);

            return Array.isArray(allowedRoles)
                ? allowedRoles.some(role => roleNames.includes(role))
                : roleNames.includes(allowedRoles);
        } catch (err) {
            console.error("Erreur dans fetchMeAndCheckAccess :", err);
            logout();
            return false;
        }
    }, [logout]);


    // Nettoyage du timer au démontage
    useEffect(() => () => clearTimeout(refreshTimer.current), []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, username, user, login, logout, fetchMeAndCheckAccess }}>
            {children}
        </AuthContext.Provider>
    );
}