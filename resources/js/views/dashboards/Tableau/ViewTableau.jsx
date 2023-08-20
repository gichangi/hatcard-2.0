import {createRef, useEffect, useRef, useState} from 'react';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {apiFetch} from "../../../assets/api/utils";
import {Button} from "@mui/material";

const {tableau} = window;



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


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

let defaultHeight =0;
let defaultWidth =0;
function ViewTableau({id}) {
    const [height, setHeight] = useState(1)
    const [width, setWidth] = useState(0)
    const [tabViz, setTabViz] = useState();
    const [vizLoaded, setVizLoaded] = useState(false);
    const divRef = createRef();
    const dimensions = useRefDimensions(divRef,width,height);
    const ref = useRef();

    function initViz(url){
        const myNode = document.getElementById("tableauBody");
        myNode.innerHTML = '';
        let g = document.createElement('div');
        g.setAttribute("id", "tableauViz");
        myNode.append(g)

        let placeholderDiv = document.getElementById("tableauViz");
        let options = {
            hideTabs: true,
            width: `${defaultWidth}px`,
            height: `${defaultHeight}px`,

            onFirstInteractive: function() {
                // The viz is now ready and can be safely used.
                setVizLoaded(true);
            }
        };

        let viz = new tableau.Viz(placeholderDiv, url, options);
        setTabViz(viz);
    }

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            if(ref.current !== null){
                setWidth(entries[0].contentRect.width)
                setHeight(ref.current.clientHeight)
            }
        })
        observer.observe(ref.current)
        return () => ref.current && observer.unobserve(ref.current)
    }, [id])


    useEffect(()=>{
        apiFetch('POST',{},`/api/tableau/view-url`,{id:id}).then(res=>{
            defaultHeight=ref.current.clientHeight - 30;
            defaultWidth=ref.current.clientWidth -20;
            initViz(res.data.message.url);
        })
    },[id]);

    //Check if Box dimensions have changed and update the tableau viz dimensions
    useEffect(()=>{
        if( ref.current !== null && vizLoaded===true && tabViz !== undefined ){
            tabViz.setFrameSize(parseInt(`${dimensions.width - 20}`, 10), parseInt(`${dimensions.height -50}`, 10))
        }
    },[dimensions])


    function exportToPDF() {
        if( ref.current !== null && vizLoaded===true && tabViz !== undefined ){
            tabViz.showExportPDFDialog();
        }
    }
    function exportToImage() {
        if( ref.current !== null && vizLoaded===true && tabViz !== undefined ){
            tabViz.showExportImageDialog();
        }
    }


    function toFullscreen(elem) {
        if( ref.current !== null && vizLoaded===true && tabViz !== undefined ){
            elem =  document.getElementById("tableauVizHolder");
            let actionButtons =  document.getElementById("actionButtons");
            if (!document.fullscreenElement && !document.mozFullScreenElement &&
                !document.webkitFullscreenElement && !document.msFullscreenElement) {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
    }


    return (
        <>
            <Box ref={ref}  sx={{height:`85vh`,width:`100%`,marginTop:'-50px'}} id={"tableauVizHolder"} >
                <div style={{ height: '100%', width: `100%` }}>
                    <div
                        ref={divRef}
                        style={{
                            margin: '5px',
                            width: `100%`,
                            height: '100%',
                            /*  border: '1px solid black',*/
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >

                        <Grid container>
                            <Item sx={{height:`95%`,width:`100%`,margin:'2px'}} id={"tableauBody"} >
                                <div id={'tableauViz'}>

                                </div>
                            </Item>

                        </Grid>

                    </div>
                </div>
            </Box>
            <Item sx={{height:"50px",width:`100%`,margin:'2px'}} id={"actionButtons"}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Button variant="contained" sx={{fontWeight:'bolder'}} onClick={exportToPDF}>Export To PDF</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" sx={{fontWeight:'bolder'}} onClick={exportToImage}>Export To Image</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" sx={{fontWeight:'bolder'}} onClick={toFullscreen}>Fullscreen</Button>
                    </Grid>
                </Grid>
            </Item>
        </>


    );
}

export default ViewTableau;
