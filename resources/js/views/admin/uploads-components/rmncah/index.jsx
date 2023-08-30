import {useEffect, useState, useMemo, useRef} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import RMNCAHUploadsList from "./RMNCAHUploadsList";
import RMNCAHUploadData from "./RMNCAHUploadData";

function Index(props) {
    const [reComp, setReComp] = useState()

    const pageSwitch = (action,uploadId=null) =>{
        switch (action) {
            case 'add':
                setReComp(<RMNCAHUploadData uploadId={uploadId} pageSwitch={pageSwitch}/>);
                break;
            default:
                setReComp(<RMNCAHUploadsList pageSwitch={pageSwitch}/>);
        }
    }
    useEffect(()=>{
        setReComp(<RMNCAHUploadsList pageSwitch={pageSwitch}/>)
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
