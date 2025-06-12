import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PasswordField.css";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { checkPasswordComplexity } from "check-password-complexity";

export default function PasswordField({onKeyUp, needStrength}) {
    const [showPassword, setShowPassword] = useState(false);
    const [score, setScore] = useState(0);

    function onPasswordChange(e){
        const res = checkPasswordComplexity(e.target.value);
        setScore(res.score);


        if(needStrength) {
            onKeyUp({
                password: e.target.value,
                complexity: res
            });
        }else {
            onKeyUp({
                password: e.target.value
            });
        }
    }

    return (
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
                type={showPassword ? "text" : "password"}
                className="password-field" 
                name="password" 
                id="password" 
                onKeyUp={onPasswordChange}
                required
            />
            <div className="show-password">
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="eye-icon" onClick={() => setShowPassword(!showPassword)} />
            </div>

            <div className="progress-bar">

                
                <div className="complexity-percent-${score}"></div>
            </div>
        </div>
    )
}