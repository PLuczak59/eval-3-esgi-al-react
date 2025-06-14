import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "./DarkModeButton.css";
import { useContext } from "react";
import { DarkModeContext } from "../../utils/Contexts/DarkModeContext";

export default function DarkModeButton() {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);

    return (
        <button
            className="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
        >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
    )
}