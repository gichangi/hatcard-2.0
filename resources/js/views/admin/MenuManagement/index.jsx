import {connect} from "react-redux";
import './custom-css.css'
import NavItemGrid from "./Navigation/NavItemGrid";
import {useEffect, useState} from "react";
import Navigation from "./Navigation";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import NavGroupOrder from "./Navigation/NavGroupOrder";

function index(props) {
    const [menuDetails, setMenuDetails] = useState(null);
    const [showGroupOrderPage,setShowGroupOrderPage]=useState(false);
    const [showMenuGrid,setShowMenuGrid]=useState(true);
    const pageSwitch = (menu_details = '') =>{
        if(menu_details === 'group_order'){
            setShowGroupOrderPage(!showGroupOrderPage);
            setShowMenuGrid(false);
        }else if (menu_details !== '' && menu_details !== 'group_order'){
            setMenuDetails(menu_details);
            setShowMenuGrid(!showMenuGrid);
            setShowGroupOrderPage(false);
        }else{
            setShowMenuGrid(!showMenuGrid);
            setShowGroupOrderPage(false);
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
                {showMenuGrid && !showGroupOrderPage  &&
                    <NavItemGrid pageSwitch={pageSwitch}  />
                }
                {/*Page switch allow to reset the display to show grid by passing null*/}
                { !showMenuGrid && !showGroupOrderPage  &&
                    <Navigation menuDetails={menuDetails} pageSwitch={pageSwitch} />
                }
                {/*Show page to order groups*/}
                { showGroupOrderPage &&
                    <NavGroupOrder pageSwitch={pageSwitch}/>
                }
            </Paper>
        </Box>

    );
}

const mapStateToProps = state => {
    return {
        reduxStore: state
    };
};
export default connect(mapStateToProps)(index);
