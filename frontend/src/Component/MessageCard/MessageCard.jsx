import "./MessageCard.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faHeart, faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, EditMessageForm } from '../components';
import { usePostRequest } from "../../utils/Hooks/usePostRequest";

export default function MessageCard({ post, onRefresh }) {
    const [myReaction, setMyReaction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    const isMyPost = userId === post.authorId;

    const [localEmoticons, setLocalEmoticons] = useState(post.emoticons || []);

    const { postData } = usePostRequest('/emoticon');

    useEffect(() => {
        setLocalEmoticons(post.emoticons || [])

        if (post.emoticons?.length > 0 && userId) {
            const found = post.emoticons.find(e => e.userId === userId);
            if (found) setMyReaction(found);
        }
    }, [post, userId]);

    const handleReaction = async (type) => {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            if (myReaction && myReaction.type === type) {
                await fetch(`${import.meta.env.VITE_REACT_APP_URL_BACKEND}/emoticon/${myReaction.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                setLocalEmoticons(prev => prev.filter(e => e.id !== myReaction.id))
                setMyReaction(null);
            } else {
                if (myReaction) {
                    await fetch(`${import.meta.env.VITE_REACT_APP_URL_BACKEND}/emoticon/${myReaction.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    setLocalEmoticons(prev => prev.filter(e => e.id !== myReaction.id))
                }

                const response = await postData({
                    emoticon: type,
                    postId: post.id
                });

                if (response) {
                    const newEmoticon = {
                        ...response,
                        userId: userId,
                        type: type
                    };

                    setLocalEmoticons(prev => [...prev, newEmoticon])
                    setMyReaction(newEmoticon);
                }
            }

        } catch (err) {
            console.error("Erreur avec la réaction:", err);
        }

        setLoading(false);
    };

    const handleDelete = async () => {
        if (!window.confirm("Supprimer ce post ?")) return;

        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            await fetch(`${import.meta.env.VITE_REACT_APP_URL_BACKEND}/post/${post.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            onRefresh();
        } catch (err) {
            console.error("Erreur suppression:", err);
        }

        setLoading(false);
    };

    const countReactions = (type) => {
        if (!localEmoticons) return 0;
        return localEmoticons.filter(e => e.type === type).length;
    };

    return (
        <div className="message-card">
            <div className="message-header">
                <h2>{post.user?.nickname || 'Inconnu'}</h2>

                {isMyPost &&
                    <div className="message-actions">
                        <button className="action-btn edit" onClick={() => setModalOpen(true)} disabled={loading}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </button>

                        <button className="action-btn delete" onClick={handleDelete} disabled={loading}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>

                }
            </div>

            <div className="message-card-content">

                <div className="message-content">
                    <p>{post.message}</p>
                </div>

                {post.picture && (
                    <img className="message-image" src={`http://localhost:3000/images/${post.picture}`} alt="image" />
                )}
            </div>

            <div className="message-card-reactions">
                <button
                    className={`reaction-btn ${myReaction?.type === 'like' ? 'active' : ''}`}
                    onClick={() => handleReaction('like')}
                    disabled={loading || post.authorId === userId}
                >
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{countReactions('like')}</span>
                </button>

                <button
                    className={`reaction-btn ${myReaction?.type === 'dislike' ? 'active' : ''}`}
                    onClick={() => handleReaction('dislike')}
                    disabled={loading || post.authorId === userId}
                >
                    <FontAwesomeIcon icon={faThumbsDown} />
                    <span>{countReactions('dislike')}</span>
                </button>

                <button
                    className={`reaction-btn ${myReaction?.type === 'love' ? 'active' : ''}`}
                    onClick={() => handleReaction('love')}
                    disabled={loading || post.authorId === userId}
                >
                    <FontAwesomeIcon icon={faHeart} />
                    <span>{countReactions('love')}</span>
                </button>
            </div>

            <Modal isOpen={modalOpen} title="Modifier un message" onClose={() => setModalOpen(false)}>
                <EditMessageForm onClose={() => setModalOpen(false)} messageData={post} />
            </Modal>
        </div>
    );
}