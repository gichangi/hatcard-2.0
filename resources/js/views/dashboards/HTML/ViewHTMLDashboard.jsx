import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import {useRef} from "react";
import {useEffect} from "react";
import {useState} from "react";
import {IFrame} from "./IFrame";

const useRefDimensions = (ref,w,h) => {
    const [dimensions, setDimensions] = useState({ width: 2, height: 2 })
    useEffect(() => {
        if (ref.current) {
            const { current } = ref
            const boundingRect = current.getBoundingClientRect()
            const { width, height } = boundingRect
            setDimensions({ width: Math.round(width), height: Math.round(height) })
        }
    }, [w,h])
    return dimensions
}


function ViewHtmlDashboard({id,details}) {
    const ref = useRef();
    const refNew = useRef();
    const [height, setHeight] = useState(1)
    const [width, setWidth] = useState(0)
    const dimensions = useRefDimensions(ref,width,height);
    function changeColor(coll, color){

        for(let i=0, len=coll.length; i<len; i++)
        {
            coll[i].style["background-color"] = color;
            coll[i].style["padding"] = '2px';
        }
    }

    useEffect(()=>{
        const elements = document.getElementsByClassName('breadcrumb');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        let aColl = document.getElementsByClassName('pcoded-content')
        changeColor(aColl, 'white');

        const observer = new ResizeObserver(entries => {
            if(ref.current !== null){
                setWidth(entries[0].contentRect.width)
                setHeight(ref.current.clientHeight)
            }

        })
        observer.observe(ref.current)
        return () => ref.current && observer.unobserve(ref.current)

    },[])
    useEffect(()=>{
        const elements = document.getElementsByClassName('breadcrumb');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    },[dimensions])
    return (
        <>

            <Box ref={refNew} style={{m: 0,height:'90vh'}}>

                {/*{JSON.stringify(details['config_json']['html_code'])}*/}

                <Box ref={ref}  sx={{height:`100%`,width:`100%`}} >
                    <IFrame style={{width:'100%',height:'100%'}}>
                        <div style={{width:'100%',height:'100%'}} dangerouslySetInnerHTML={{ __html: details['config_json']['html_code'] }} />
                    </IFrame>
                    {/*<div style={{width:'100%',height:'100%',backgroundColor:"blue"}} dangerouslySetInnerHTML={{ __html: details['config_json']['html_code'] }} />*/}
                </Box>
            </Box>
        </>

    );
}

export default ViewHtmlDashboard;
