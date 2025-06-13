import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PasswordField.css";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PasswordField({onKeyUp, isConfirm = false}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-group">
            <label htmlFor={isConfirm ? "confirmPassword" : "password"}>{isConfirm ? "Confirm Password" : "Password"}</label>

            <input
                type={showPassword ? "text" : "password"}
                className="password-field" 
                name={isConfirm ? "confirmPassword" : "password"}
                id={isConfirm ? "confirmPassword" : "password"} 
                onKeyUp={(e) => onKeyUp(e.target.value)}
                required
            />
            <div className="show-password">
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="eye-icon" onClick={() => setShowPassword(!showPassword)} />
            </div>
        </div>
    )
}