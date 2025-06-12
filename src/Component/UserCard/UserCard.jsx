import "./UserCard.css";

export default function UserCard({user}){
    return (
        <div className="user-card">
            <img src={user.imageUrl} alt="user profil"/>

            <div className="user-card-name">
                <h2>{user.firstName} {user.lastName}</h2>
                <p>{user.email}</p>
                <p>{user.jobTitle}</p>
            </div>
        </div>
    )
}