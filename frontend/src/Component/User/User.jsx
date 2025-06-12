import "./User.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faUser } from '@fortawesome/free-solid-svg-icons';

function User({ user }) {
    function showNumbers(number, index) {
        return (
            <div key={index} className="number">
                {number}
            </div>
        );
    }

    return (
        <>
            <div className="form-group">
                <label htmlFor="">Email</label>
                <div className="email">{user.email}</div>
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="">Nickname</label>
                <div className="nickname">{user.nickname}</div>
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="">Rôle</label>
                {user.role === "admin" &&
                    <div className="role"><FontAwesomeIcon icon={faCrown} /></div>
                }
                {user.role !== "admin" &&
                    <div className="role"><FontAwesomeIcon icon={faUser} /></div>
                }
                {
                    Object.entries([1, 2, 3]).map(([key, value]) => showNumbers(value, key))
                }
            </div>

            <br />

            <div className="form-group">
                <label htmlFor="">Image</label>
                <div className="image">
                    <img src={user.image} alt="user profile" />
                </div>
            </div>
        </>
    );
}

export default User;