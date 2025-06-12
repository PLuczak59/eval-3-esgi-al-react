import "./User.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faUser } from '@fortawesome/free-solid-svg-icons';

function User({user}) {
    function showNumbers (number, index) {
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
                <label htmlFor="">Prénom</label>
                <div className="firstname">{user.firstname}</div>
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="">Nom</label>
                <div className="lastname">{user.lastname}</div>
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
                    Object.entries([1, 2, 3]).map(([key, value]) =>  showNumbers(value, key))
                }
            </div>
        </>
    );
}

export default User;