import {useEffect, useState, useMemo, useRef} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Navigation from "../MenuManagement/Navigation";
import PlatformList from "./PlatformList";
import PlatformAdd from "./PlatformAdd";


function Index(props) {
    const [rowData, setRowData] = useState(null);
    const [showList,setShowList]=useState(true);
    const [renderItem, setRenderItem] = useState(1);

/*    const checkoutSteps = [PlatformAdd,PlatformList]

    const Checkout = ({step}) => {

        const ToRender = checkoutSteps[step]

        return (
            <ToRender pageSwitch={pageSwitch}/>
        )
    }


    const HeaderComponent = (comp = 1) => {
        console.log('comp')
        console.log(comp)
        console.log('comp')
        return (
            <div>
                <Checkout step={renderItem}  pageSwitch={pageSwitch}/>
            </div>
        )
    }

    useEffect(()=>{
        HeaderComponent(0)
    },[]);*/

    const pageSwitch = (action,rowData) =>{
        console.log("ddddddddd");
        console.log(rowData);
        console.log("ddddddddd");
        switch (action) {
            case 'add':
                setReComp(<PlatformAdd rowData={rowData} pageSwitch={pageSwitch}/>);
                break;
            case 'list':
                setReComp(<PlatformList pageSwitch={pageSwitch}/>);
                break;
            case 'config':
                setReComp(<PlatformAdd details={rowData} pageSwitch={pageSwitch}/>);
                break;
            default:
                setReComp(<PlatformList pageSwitch={pageSwitch}/>);
        }

    }
    const [reComp, setReComp] = useState(<PlatformList pageSwitch={pageSwitch}/>)
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
