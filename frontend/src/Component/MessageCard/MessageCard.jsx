import "./MessageCard.css";

export default function MessageCard({ user, Post }) {
    return (
        <div className="message-card">
            <img src={user.imageUrl} alt="user profil picture" />

            <div className="message-card-name">
                <h2>{user.firstName} {user.lastName}</h2>
                <p>{Post.message}</p>
                <img src={Post.picture} alt="post picture" />

            </div>
        </div>
    )
}