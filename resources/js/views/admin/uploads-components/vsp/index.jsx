import {useEffect, useState, useMemo, useRef} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import VSPUploadData from "./VSPUploadData";
import VSPUploads from "./VSPUploadsList";
import VSPUploadsList from "./VSPUploadsList";

function Index(props) {
    const [reComp, setReComp] = useState()

    const pageSwitch = (action,uploadId=null) =>{
        switch (action) {
            case 'add':
                setReComp(<VSPUploadData uploadId={uploadId} pageSwitch={pageSwitch}/>);
                break;
            default:
                setReComp(<VSPUploadsList pageSwitch={pageSwitch}/>);
        }
    }
    useEffect(()=>{
        setReComp(<VSPUploadsList pageSwitch={pageSwitch}/>)
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
