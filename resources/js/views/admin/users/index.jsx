import {useEffect, useState, useMemo, useRef} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ListUsers from "./ListUsers";
import AddUser from "./AddUser";

function Index(props) {
    const [reComp, setReComp] = useState()

    const pageSwitch = (action,rowData) =>{
        switch (action) {
            case 'add':
                setReComp(<AddUser row={rowData} pageSwitch={pageSwitch}/>);
                break;
            case 'list':
                setReComp(<ListUsers pageSwitch={pageSwitch}/>);
                break;
            default:
                setReComp(<ListUsers pageSwitch={pageSwitch}/>);
        }
    }
    useEffect(()=>{
        setReComp(<ListUsers pageSwitch={pageSwitch}/>)
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
