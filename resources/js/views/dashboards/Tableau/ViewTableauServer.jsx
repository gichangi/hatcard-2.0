import {Tableau} from "./Tableau";
import {useEffect, useRef, useState} from 'react';
import newtableau from "tableau-api";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { sizing } from '@mui/system';


const {tableau} = window;



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ViewTableauServer(props) {
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const ref = useRef();
    const url =  "http://public.tableau.com/views/RegionalSampleWorkbook/Storms";
    function initViz(){
        const myNode = document.getElementById("tableauBody");
        myNode.innerHTML = '';
        let g = document.createElement('div');
        g.setAttribute("id", "tableauViz");
        myNode.append(g)

        var placeholderDiv = document.getElementById("tableauViz");
        var url = "https://public.tableau.com/views/excel-prep-book/standard_dashboard?:language=en-US&:display_count=n&:origin=viz_share_link";
        var options = {
            hideTabs: true,
            width: width,
            height: height,

            onFirstInteractive: function() {
                // The viz is now ready and can be safely used.
            }
        };

        var viz = new tableau.Viz(placeholderDiv, url, options);
    }
    useEffect(()=>{
        //initViz()
    },[])

    const [dimensions, setDimensions] = useState({

        height: window.innerHeight,

        width: window.innerWidth

    })

    useEffect(()=>{
        console.log(ref.current.clientWidth+"-xxx-"+ref.current.clientHeight)
        setHeight(dimensions.height * 0.89)
        setWidth(window.innerWidth *0.7)
    },[])

/*    useEffect(()=>{

        //initViz()
    },[width,height])*/

        useEffect(()=>{
            setWidth(window.innerWidth *0.9);
/*            var element = document.getElementById('boxss');
            var positionInfo = element.getBoundingClientRect();
            var heightz = positionInfo.height;
            var widthz = positionInfo.width;
            console.log(widthz+'+xxx+'+heightz)*/
        })

    return (
        <>
            {height} {width} mm
            {document.getElementById('boxss').getBoundingClientRect().width}
            <Box height={height} sx={{backgroundColor:'red'}} ref={ref} id='boxss'>
                <Grid container sx={{height:"99%",width:'100%'}}>
                    <Grid item xs={12} sx={{height:"99%",width:'100%'}}>
                        <Item sx={{height:"99%",width:'99%',margin:'5px'}} id={"tableauBody"} >

                            {window.innerWidth}
                            xx
                            {window.innerHeight}
                            Rendered at {width} x {dimensions.height}
                            mew

                        </Item>
                    </Grid>
                </Grid>
            </Box>



        </>


    );
}

export default ViewTableauServer;
