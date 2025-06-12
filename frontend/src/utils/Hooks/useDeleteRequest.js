// useDeleteRequest.js
import { useState, useEffect } from "react";

export function useDeleteRequest() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async (url) => {
        try {
            setLoading(true);
            const token = Cookies.get("token");
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL_BACKEND}${url}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const responseData = await response.json();
                setError(
                    responseData.message ||
                    "Une erreur est survenue lors de la suppression."
                );
            }
        } catch (err) {
            console.error("Erreur lors de la suppression des données :", err);
            setError(err.message || true);
        } finally {
            setLoading(false);
        }
    };

    return { isLoading, error, deleteData };
}