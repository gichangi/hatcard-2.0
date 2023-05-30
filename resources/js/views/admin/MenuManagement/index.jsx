import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import './custom-css.css'
import MenuItemGrid from "./MenuItemGrid";
import {useEffect, useState} from "react";
import NavigationMenuItem from "./NavigationMenuItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function index(props) {
    const [showMenuItemPage, setShowMenuItemPage]= useState(false);
    const [menuDetails, setMenuDetails] = useState(null)
    const pageSwitch = (menu_details = null) =>{
        if (menu_details !== null){
            setMenuDetails(menu_details)
        }else{
            setMenuDetails(null)
        }
        setShowMenuItemPage(!showMenuItemPage);
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
                {!showMenuItemPage &&
                    <MenuItemGrid pageSwitch={pageSwitch}  />
                }
                {/*Page switch allow to reset the display to show grid by passing null*/}
                { showMenuItemPage &&
                    <NavigationMenuItem menuDetails={menuDetails} pageSwitch={pageSwitch} />
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
