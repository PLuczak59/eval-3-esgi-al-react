import "./EditMessageForm.css";
import { Button } from "../components";
import { useState } from "react";
import { usePutRequest } from "../../utils/Hooks/usePutRequest";

export default function EditMessageForm({onClose, 
    messageData={
        id: "",
        message: "",
        picture:""
    }
}) {
    const [content, setContent] = useState(messageData.message);
    const [image, setImage] = useState(messageData.picture);
    const [error, setError] = useState(null);
    const { fetchData, loading } = usePutRequest(`/post/${messageData.id}`);

    async function handleSubmit() {
        const Data = new FormData();

        if (!content.trim()) {
            setError("Vous ne pouvez pas laisser un message vide.");
            return;
        }

        const updatedPost = {
            message: content,
        };

        Data.append("post", JSON.stringify(updatedPost));

        if (image) {
            Data.append("file", image);
        }

        try {
            const response = await fetchData(Data);
            console.log(response);
            setContent("");
            setImage(null);
            setError(null);
            onClose();
            window.location.reload();
        } catch (err) {
            console.log(err);
            setError("Une erreur est survenue lors de la mise à jour du post. Veuillez réessayer.");
        }
    };

    return (
        <div className="form-message">
            <div className="form-group">
                <label htmlFor="content">Contenu du post</label>
                <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="image">Image (optionnel)</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} /> 
            </div>

            <Button text={loading ? "Envoi en cours..." : "Modifier"} onClick={handleSubmit} />

            {error &&
                <p className="error-message">{error}</p>
            }
        </div>
    )
}