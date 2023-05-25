import {useEffect, useState} from "react";
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuGroupItem from "./MenuGroupItem";
import MenuSubFolder from "./MenuSubFolder";

const validate = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.age) {
        errors.age = 'Required';
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number';
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old';
    }
    return errors;
};
const warn = (values) => {
    const warnings = {};
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...';
    }
    return warnings;
};

function NewMenuItem(props) {
    const [menuType,setMenuType] = useState("")
    const [menuTypeName,setMenuTypeName] = useState("")
    const [enableCreate, setEnableCreate] = useState(false);
    const [enableEdit, setEnableEdit] = useState(false);
    const [menuComponent, setMenuComponent] = useState();

    const handleSubmit = () =>{
        alert("mew mew")
    }
    const handleChange = (event,node) => {
        event.preventDefault();
        setMenuComponent(node.props.name);
        setMenuType(event.target.value);
        setMenuTypeName(node.props.name)
    };
    useEffect(()=>{
        if (props.menuDetails != null){
            setEnableEdit(true)
        }else{
            setEnableCreate(true)
        }
    },[]);

    const switchMenuComponent = () =>{
        switch (menuComponent){
            case 'Group':
                return <MenuGroupItem />
            case 'Sub-Folder':
                return <MenuSubFolder />
            case 'Link':
                return <MenuGroupItem />
            default:
                return null
        }
    }



    const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
        <Row className="my-3">
            <Col sm={3}>
                <label className="label-control">{label}</label>
            </Col>
            <Col sm={9}>
                <input {...input} placeholder={label} type={type} className="form-control" />
                {touched &&
                    ((error && <span className="text-c-red">* {error} </span>) || (warning && <span className="text-c-yellow">{warning}</span>))}
            </Col>
        </Row>
    );
    return (
        <Card
            style={{
                minWidth: 275,
                paddingTop:'0px !important'
            }}
        >
            <Card.Header style={{
                padding:`${ enableCreate ?'5px':'20px'} 25px`
            }}>
                <Grid container spacing={2}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                >
                    <Grid item xs={2}                    >
                        <Card.Title as="h5"><Typography sx={{fontSize:'18px',color:'#992E62', fontWeight:'bolder'}}>Menu Item </Typography></Card.Title>
                    </Grid>
                    {enableCreate &&
                        <Grid item xs={4}>
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <Select
                                    displayEmpty
                                    id="select-menu-type-select"
                                    value={menuType}
                                    onChange={(e,node)=>handleChange(e,node)}
                                    renderValue={(selected,node) => {
                                        if (selected.length === 0) {
                                            return <>Select Menu Type</>;
                                        }
                                        return menuTypeName;
                                    }}
                                    MenuProps={{
                                        sx: {
                                            "&& .MuiMenuItem-root": {
                                                color: "#992E62"
                                            }
                                        }
                                    }}
                                    sx={{
                                        color:'#0E6073',
                                        fontWeight:'bold',
                                        minWidth: 300,
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#992E62',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#0E6073',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#992E62',
                                        },
                                    }}
                                >
                                    <MenuItem value={'group'}  name={'Group'}>Group</MenuItem>
                                    <MenuItem value={'sub-folder'} name={'Sub-Folder'}>Sub-Folder</MenuItem>
                                    <MenuItem value={'item'} name={'Link'}>Link</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    }

                </Grid>


            </Card.Header>
            <Card.Body>
                <Grid container>
                    {switchMenuComponent()}
                </Grid>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        </Card>
    );
}
export default NewMenuItem;
