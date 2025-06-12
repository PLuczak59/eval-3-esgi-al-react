import "./UpdateUser.css";

function UpdateUser({user}) {
    return (
        <button className="btn btn-primary" onClick={() => alert("User updated!")}>
            Update User
        </button>
    );
}

export default UpdateUser;