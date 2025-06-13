import "./Modal.css";

export default function Modal({children, title, isOpen, onClose}){
    
    function handleCloseModal(e){
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;
    
    return (
        <div className="modal-open" onClick={handleCloseModal}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={onClose}>&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
}