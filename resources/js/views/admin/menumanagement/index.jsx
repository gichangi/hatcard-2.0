import {connect} from "react-redux";
import './custom-css.css'
import NavItemGrid from "./navigation/NavItemGrid";
import {useEffect, useState} from "react";
import Navigation from "./navigation";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import NavGroupOrder from "./navigation/NavGroupOrder";
import {FacebookCircularProgress} from "../../../assets/ui";


function index(props) {
    const [reComp, setReComp] = useState(<FacebookCircularProgress />)

    useEffect(()=>{
        pageSwitch('grid')
    },[])

    const pageSwitch = (page,row) =>{
        switch (page) {
            case 'grid':
                setReComp(<NavItemGrid pageSwitch={pageSwitch}  />);
                break;
            case 'crud':
                setReComp(<Navigation menuDetails={row} pageSwitch={pageSwitch} />);
                break;
            case 'order':
                setReComp(<NavGroupOrder pageSwitch={pageSwitch}/>);
                break;
            default:
                setReComp(<NavItemGrid pageSwitch={pageSwitch}  />);
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
                {reComp}
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
