import "./UserCard.css";

export default function UserCard({ user }) {
    return (
        <div className="user-card">
            {/* <img src={user.imageUrl} alt="user profil" /> */}

            <div className="user-card-name">
                <h2>{user.nickname}</h2>
                <p>{user.email}</p>
            </div>
        </div>
    )
}