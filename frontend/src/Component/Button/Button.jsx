import "./Button.css";

export default function Button(
    { 
    text = "Button",
    color = "blue",
    onClick = () => {console.log("Button clicked")}
    }
){
    return (
        <button className="button" onClick={onClick} style={{backgroundColor: color}}>
            {text}
        </button>
    )
}