import "./Toolbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, LogoutButton, AddMessageForm} from  "../components"

export default function Toolbar({onAddPost}){
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (!token) {
            navigate("/");
        }
    }, []);
    

    return (
        <>
            <div className="toolbar">
                <Button text="Nouveau Post" onClick={() => setModalOpen(true)} />
                <LogoutButton />
            </div>

            <Modal isOpen={modalOpen} title="Ajouter un message" onClose={() => setModalOpen(false)}>
                <AddMessageForm onClose={() => setModalOpen(false)} onAddPost={onAddPost} />
            </Modal>
        </>
    )
}