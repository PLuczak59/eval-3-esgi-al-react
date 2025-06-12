import "./MessageCard.css";

export default function MessageCard({ post }) {
    return (
        <div className="message-card">
            {/* <img src={post.user?.image} alt="user profil picture" /> */}
            <h2>{post.user?.nickname || 'Utilisateur inconnu'}</h2>

            <div className="message-card-name">
                <p>{post.message}</p>
                {post.picture && (
                    <img src={`/images/${post.picture}`} alt="post picture" />
                )}
            </div>
        </div>
    );
}