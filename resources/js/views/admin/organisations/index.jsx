import {useEffect, useState, useMemo, useRef} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Navigation from "../menumanagement/navigation";
import OrgList from "./OrgList";
import OrgAdd from "./OrgAdd";


function Index(props) {
    const [rowData, setRowData] = useState(null);
    const [showOrgList,setShowOrgList]=useState(true);

    const pageSwitch = (org_details = '') =>{
        if (org_details !== ''){
            setRowData(org_details);
            setShowOrgList(!showOrgList);
        }else{
            setShowOrgList(!showOrgList);
        }

    }
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
                {/*PageSwitch is used here to pass the menu details from the selected row*/}
                { showOrgList &&
                    <OrgList pageSwitch={pageSwitch}  />
                }
                {/*Page switch allow to reset the display to show grid by passing null*/}
                { !showOrgList   &&
                   <OrgAdd pageSwitch={pageSwitch} rowData={rowData} />
                }

            </Paper>
        </Box>

    );
}

export default Index;
