import {createRef, useEffect, useRef, useState} from 'react';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {apiFetch} from "../../../assets/api/utils";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import _ from "lodash";
const {tableau} = window;
import {
    FilterUpdateType,
    TableauDialogType,
    TableauEventType,
    SelectionUpdateType,
    SheetSizeBehavior,
    TableauViz
} from "./tableau.embedding.3.latest.min";


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

    const userPermissions= useSelector(state => state.user.user.permissions);
    const userOrganisations= useSelector(state => state.user.user.organisations);
    const [height, setHeight] = useState(1)
    const [width, setWidth] = useState(0)
    const [tabViz, setTabViz] = useState();
    const [vizLoaded, setVizLoaded] = useState(false);
    const[currentid, setCurrentId] = useState('');
    const divRef = createRef();
    const dimensions = useRefDimensions(divRef,width,height);
    const ref = useRef();
    let limitIpFilter =true;
    let tempId = '';

    function initViz(url){
        const myNode = document.getElementById("tableauBody");
        myNode.innerHTML = '';
        let g = document.createElement('div');
        g.setAttribute("id", "tableauViz");
        myNode.append(g)

        let viz = new TableauViz();
        viz.src = url;
        viz.style.height = `${defaultHeight}px`;
        viz.style.width = `${defaultWidth}px`;
        viz.hideTabs = true;
        //viz.hideToolbar = true;
        viz.toolbar = 'hidden';

        viz.addEventListener(TableauEventType.FirstInteractive, (event) => {
            setVizLoaded(true)
            if(limitIpFilter){
                viz.workbook.activeSheet.applyFilterAsync("IP", userOrganisations, tableau.FilterUpdateType.REPLACE);
            }

            const observer = new ResizeObserver(entries => {
                if(ref.current !== null){
                    //Working just check css

                    const viz2 = document.getElementById("tableauViz");
                    var divs = viz2.getElementsByTagName('tableau-viz')[0];
                    divs.width=entries[0].contentRect.width;
                    divs.height=ref.current.clientHeight - 30;
                    setHeight(ref.current.clientHeight - 30);
                    setWidth(entries[0].contentRect.width)
                }
            })
            observer.observe(ref.current)
            return () => ref.current && observer.unobserve(ref.current)
        });

        var onSuccess = function (filters) {
            filters.map(function (filter, i) {
                // use .value property of each DataValue object
                /*                console.log(i)
                                console.log(filter)
                                console.log(filter._appliedValues)
                                console.log(_.map(filter._appliedValues,'_value'))*/
                if(filter._fieldName === "IP"){
                    if(!_.map(filter._appliedValues,'_value').every(val => userOrganisations.includes(val))){
                        viz.workbook.activeSheet.applyFilterAsync("IP", userOrganisations, tableau.FilterUpdateType.REPLACE);
                    }
                }
            })
        };

        // var onError = function (err) {
        //     console.log("tableu init error",err);
        // };


        viz.addEventListener(TableauEventType.FilterChanged, async (event) => {
            if(limitIpFilter){
                viz.workbook.activeSheet.getFiltersAsync("IP").then(onSuccess, onError);
            }

        });
        viz.addEventListener(TableauEventType.FirstInteractive, (e) => {
            document.getElementById('export-pdf').onclick = async () => {
                await viz.displayDialogAsync(TableauDialogType.ExportPDF);
            };
            document.getElementById('export-image').onclick = async () => {
                await viz.exportImageAsync();
            };
        });

        document.getElementById("tableauViz").appendChild(viz)

        setTabViz(viz);
    }

    /*
        useEffect(() => {
            const observer = new ResizeObserver(entries => {
                if(ref.current !== null){
                    const viz = document.getElementById("tableauViz")
                    viz.style.width=entries[0].contentRect.width;
                    viz.style.height=ref.current.clientHeight;
                    setWidth(entries[0].contentRect.width)
                    setHeight(ref.current.clientHeight)
                }
            })
            observer.observe(ref.current)
            return () => ref.current && observer.unobserve(ref.current)
        }, [id,vizLoaded])
    */



    useEffect(()=>{
        const viz = document.getElementById("tableauViz")

        apiFetch('POST',{},`/api/tableau/view-url`,{id:id}).then(res=>{
            defaultHeight=ref.current.clientHeight - 30;
            defaultWidth=ref.current.clientWidth -20;
            if(userPermissions.includes('ALL')){
                limitIpFilter=false;
                if(tempId  !== id){
                    initViz(res.data.message.url+'&:toolbar=no');
                }
                tempId = id;
                setCurrentId(id);

            }else{
                if(tempId !== id){
                    initViz(res.data.message.url+"&:toolbar=no&IP="+_.join(userOrganisations,','));
                }
                tempId = id;
                setCurrentId(id);
            }

        })
    },[id]);

    //Check if Box dimensions have changed and update the tableau viz dimensions
    useEffect(()=>{
        if( ref.current !== null ){
            const viz = document.getElementById("tableauViz")
            if(viz.style.width !== width){
                viz.style.width=parseInt(`${dimensions.width - 20}`, 10);
                viz.style.height=parseInt(`${dimensions.height -50}`, 10);

                setWidth(parseInt(`${dimensions.width - 20}`, 10));
                setHeight(parseInt(`${dimensions.height -50}`, 10));
                console.log(viz.style.width,"dimensions change",width)
            }

        }

    },[dimensions])



    function toFullscreen(elem) {
        if( ref.current !== null  ){
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
            <Box ref={ref}  sx={{height:`80vh`,width:`100%`,marginTop:'0px'}} id={"tableauVizHolder"} >
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
                        <Button id="export-pdf" variant="contained" sx={{fontWeight:'bolder'}}>Export To PDF</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button id="export-image" variant="contained" sx={{fontWeight:'bolder'}}>Export To Image</Button>
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
