import {useEffect, useState, useMemo, useRef} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DHISPullsList from "./DHISPullsList";
import DHISData from "./DHISData";

function Index(props) {
    const [reComp, setReComp] = useState()

    const pageSwitch = (action,periodId=null) =>{
        switch (action) {
            case 'add':
                setReComp(<DHISData periodId={periodId} pageSwitch={pageSwitch}/>);
                break;
            case 'indicators':
                setReComp(<DHISData pageSwitch={pageSwitch}/>);
                break;
            default:
                setReComp(<DHISPullsList pageSwitch={pageSwitch}/>);
        }
    }
    useEffect(()=>{
        setReComp(<DHISPullsList pageSwitch={pageSwitch}/>)
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
