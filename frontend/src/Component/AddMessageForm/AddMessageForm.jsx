import { Button } from "../components";
import { useState } from "react";
import { usePostRequestFormData } from "../../utils/Hooks/usePostRequest";

export default function AddMessageForm({ onClose, onAddPost }) {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const { postData, loading } = usePostRequestFormData("/post");

    async function handleSubmit() {
        const Data = new FormData();

        if (!content.trim()) {
            setError("Vous ne pouvez pas créer un message vide.");
            return;
        }

        const post = {
            message: content,
        };

        Data.append("post", JSON.stringify(post));

        if (image) {
            Data.append("file", image);
        }

        try {
            const response = await postData(Data);
            setContent("");
            setImage(null);
            setError(null);
            onAddPost(response);
            onClose();

        } catch (err) {
            console.log(err);
            setError("Une erreur est survenue lors de la création du post. Veuillez réessayer.");
        }
    };

    return (
        <div className="form-message">
            <div className="form-group">
                <label htmlFor="content">Contenu du post</label>
                <textarea id="content" name="content" className="form-textarea" onKeyUp={(e) => setContent(e.target.value)} required></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="image">Image (optionnel)</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </div>

            <Button text={loading ? "Envoi en cours..." : "Envoyer"} onClick={handleSubmit} />

            {error &&
                <p className="error-message">{error}</p>
            }
        </div>
    )
}