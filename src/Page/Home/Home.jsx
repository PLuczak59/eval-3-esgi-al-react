import "./Home.css";
import { Button } from '../../Component/components';
import { useState } from "react";


export default function Home(){
    const [test, setTest] = useState(0);
    return (
        <>
            <Button text={"compteur : " + test} color="rgb(255, 0, 0)" onClick={() => setTest(test+1)}/>
        </>
    )
}