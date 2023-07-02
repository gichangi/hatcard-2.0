import PlatformAdd from "../BI-Platforms/PlatformAdd";
import PlatformList from "../BI-Platforms/PlatformList";
import TableauServerConfig from "../BI-Platforms/Tableau/TableauServerConfig";
import TableauOnlineConfig from "../BI-Platforms/Tableau/TableauOnlineConfig";
import {useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "./List";
import TabServerAdd from "./Tableau/Server/TabServerAdd";
import TabPubAdd from "./Tableau/Public/TabPubAdd";

function Index() {
    const pageSwitch = (action,rowData = null) =>{
        switch (action) {
            case 'list':
                setReComp(<List pageSwitch={pageSwitch}/>);
                break;
            case 'tableau_server':
                setReComp(<TabServerAdd details={rowData} pageSwitch={pageSwitch}/>);
                break;
            case 'tableau_public':
                setReComp(<TabPubAdd configDetails={rowData} pageSwitch={pageSwitch}/>);
                break;
            case 'power_bi_premium':
                setReComp(<TableauServerConfig configDetails={rowData} pageSwitch={pageSwitch}/>);
                break;
            default:
                setReComp(<PlatformList pageSwitch={pageSwitch}/>);
        }

    }
    const [reComp, setReComp] = useState(<List pageSwitch={pageSwitch}/>)
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
    )
}

export default Index;
