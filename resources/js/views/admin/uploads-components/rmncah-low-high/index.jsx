import {useEffect, useState, useMemo, useRef} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import RMNCAHLowHighUploadsList from "./RMNCAHLowHighUploadsList";
import RMNCAHLowHighUploadData from "./RMNCAHLowHighUploadData";

function Index(props) {
    const [reComp, setReComp] = useState()

    const pageSwitch = (action,uploadId=null) =>{
        switch (action) {
            case 'add':
                setReComp(<RMNCAHLowHighUploadData uploadId={uploadId} pageSwitch={pageSwitch}/>);
                break;
            default:
                setReComp(<RMNCAHLowHighUploadsList pageSwitch={pageSwitch}/>);
        }
    }
    useEffect(()=>{
        setReComp(<RMNCAHLowHighUploadsList pageSwitch={pageSwitch}/>)
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
