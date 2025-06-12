import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "./DarkModeButton.css";
import { useContext } from "react";
import { DarkModeContext } from "../../utils/Contexts/DarkModeContext";

export default function DarkModeButton(){
    const {darkMode, setDarkMode} = useContext(DarkModeContext);

    return (
        <div>
            <FontAwesomeIcon icon={darkMode ? faMoon : faSun} onClick={() => setDarkMode(!darkMode)}/>
        </div>
    )
}