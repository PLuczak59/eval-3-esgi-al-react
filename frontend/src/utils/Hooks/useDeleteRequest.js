import { useState } from "react";

export function useDeleteRequest(url = '') {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async (urlOverride = '') => {
        const finalUrl = urlOverride || url;
        
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL_BACKEND}${finalUrl}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || "Erreur de suppression");
            }
            
            return true;
        } catch (err) {
            console.error("Erreur lors de la suppression des données :", err);
            setError(err.message || "Erreur inconnue");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { isLoading, error, deleteData };
}