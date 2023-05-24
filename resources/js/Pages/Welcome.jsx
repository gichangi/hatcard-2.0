import { Link } from '@inertiajs/react'
import Layout from "./Layout";
import {useState} from "react";
import Signing from "./SignIn";
import Landing from "./Landing";

function Welcome(props) {
    const[disp, setDisp] = useState(<Landing/>);
    const onclicks = ()=>{
        setDisp(<Signing/>)
    }
    return (
        <div>
            <Layout/>
            <button type="button" onClick={()=>onclicks()}>Logout</button>
            {disp}
        </div>
    );
}

export default Welcome;
