import {useEffect, useState, useMemo, useRef} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ListUsers from "./ListUsers";
import AddUser from "./AddUser";
import { connect } from "react-redux";
import {  fetchUsers} from './../../../actions/user';

function Index(props) {
    const [reComp, setReComp] = useState()
    useEffect(() => {

        loadUsers()

    }, []); //componentDidMount to get module menus

    const loadUsers =()=>{
        props.fetchUsersAll();

    }

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

const mapStateToProps = (state, ownProps) => {

    return {

        userItem: state.users.list,

    };

};



const mapActionToProps = {

    fetchUsersAll: fetchUsers,

};

export default connect(mapStateToProps, mapActionToProps)(Index);
//export default Index; fetchUsers
