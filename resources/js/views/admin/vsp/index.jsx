import {useEffect, useState, useMemo, useRef} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import VSPUploadData from "./VSPUploadData";

function Index(props) {
    const [reComp, setReComp] = useState()

    const pageSwitch = (action,rowData) =>{
        switch (action) {
            case 'add':
                setReComp(<VSPUploadData row={rowData} pageSwitch={pageSwitch}/>);
                break;
            case 'list':
                setReComp(<VSPUploadData row={rowData} pageSwitch={pageSwitch}/>);
                break;
            default:
                setReComp(<VSPUploadData row={rowData} pageSwitch={pageSwitch}/>);
        }
    }
    useEffect(()=>{
        setReComp(<VSPUploadData  pageSwitch={pageSwitch}/>)
    },[])

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                    minHeight: 500,
                },
            }}
        >
            <Paper elevation={0}>
                {reComp}
            </Paper>
        </Box>

    );
}

export default Index;
