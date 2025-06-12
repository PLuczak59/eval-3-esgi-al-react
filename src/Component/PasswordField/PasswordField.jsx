import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PasswordField.css";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { checkPasswordComplexity } from "check-password-complexity";

export default function PasswordField({onKeyUp}) {
    const [showPassword, setShowPassword] = useState(false);
    const [score, setScore] = useState(0);

    function onPasswordChange(e){
        const res = checkPasswordComplexity(e.target.value);
        setScore(res.score);
        onKeyUp({
            password: e.value,
            streght: res.score
        })
    }

    return (
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
                type={showPassword ? "text" : "password"}
                className="password-field" 
                name="password" 
                id="password" 
                onKeyUp={(e) => onKeyUp(onPasswordChange)}
                required
            />
            <div className="show-password">
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="eye-icon" onClick={() => setShowPassword(!showPassword)} />
            </div>

            <div className="progress-bar">

                
                <div className="complexity-percent-${complexityLevel}"></div>
            </div>
        </div>
    )
}