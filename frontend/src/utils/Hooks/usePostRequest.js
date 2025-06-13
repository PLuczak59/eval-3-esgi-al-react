import { useState } from 'react';

export function usePostRequest(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const postData = async (body) => {
        if (!url) {
            console.error('URL not provided for post request');
            setError(new Error('URL not provided'));
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL_BACKEND}${url}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Une erreur est survenue lors de la réponse réseau');
            }

            const responseData = await response.json();
            setData(responseData);
            return responseData;
        } catch (err) {
            console.error('Erreur lors de la soumission des données:', err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, postData };
};

export function usePostRequestFormData(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const postData = async (body) => {
        if (!url) {
            console.error('URL not provided for post request');
            setError(new Error('URL not provided'));
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL_BACKEND}${url}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: body,
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Une erreur est survenue lors de la réponse réseau');
            }

            const responseData = await response.json();
            setData(responseData);
            return responseData;
        } catch (err) {
            console.error('Erreur lors de la soumission des données:', err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, postData };
};