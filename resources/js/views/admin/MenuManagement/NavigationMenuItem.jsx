import {useEffect, useState} from "react";
import { Card,  Row, Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuGroupItem from "./MenuGroupItem";
import MenuSubFolder from "./MenuSubFolder";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ReplyIcon from '@mui/icons-material/Reply';
import Box from "@mui/material/Box";
import {useHistory} from "react-router-dom";
import { Link } from 'react-router-dom'
import _ from 'lodash';
import {apiFetch} from "../../../assets/api/utils";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";



function NavigationMenuItem({menuDetails,pageSwitch}) {
    const [menuType,setMenuType] = useState('')
    const [menuTypeName,setMenuTypeName] = useState("")
    const [enableCreate, setEnableCreate] = useState(false);
    const [enableEdit, setEnableEdit] = useState();
    const [menuComponent, setMenuComponent] = useState();
    const [formData, setFormData] = useState({});
    const [tempVa, setTempVa] = useState('');
    const [enableSubmit, setEnableSubmit] = useState(false)
    const [formValidate, setFormValidate] = useState(false)

    const sweetAlertHandler = (alert) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: alert.title,
            text: alert.text,
            type: alert.type
        });
    };


    const updateFormData = (childForm) =>{
        setTempVa(JSON.stringify(childForm))
        setFormData(childForm);
        setEnableSubmit(formValidation)
    }

    const handleSubmit = () =>{
        //Check if form data has null values if no null then submit if null show
        ///console.log(formData)
        if(formValidation && Object.keys(formValidate.validate(formData)).length === 0){
            let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
            let headers = {
                "Accept": "application/json",
                "Authorization": `Bearer ${autStore.token}`
            }
            apiFetch('POST',headers,'/api/menu-items',formData).then(res=>{
            })
        }else{
            formValidate.updateFormHelperText();
            sweetAlertHandler({ title: 'Good job!', type: 'error', text: 'You clicked the button!' });
        }

    }
    const formValidation = ()=>{
        return _.values(formData).some(el => el == null) === false && Object.keys(formData).length > 0;
    }
    const handleChange = (event,node) => {
        event.preventDefault();
        setMenuComponent(node.props.name);
        setMenuType(event.target.value);
        setMenuTypeName(node.props.name)
    };
    useEffect(()=>{
        if (menuDetails != null){
            setEnableEdit(true);
            setMenuComponent(_.capitalize(menuDetails.menu_type));
            switchMenuComponent();
        }else{
            setEnableCreate(true)
        }
    },[]);

    const switchMenuComponent = () =>{
        switch (menuComponent){
            case 'Group':
                return <MenuGroupItem  updateFormData={updateFormData}/>
            case 'Sub-Folder':
                return <MenuSubFolder updateFormData={updateFormData} setFormValidate={setFormValidate}/>
            case 'Link':
                return <MenuGroupItem formData={formData} />
            default:
                return null
        }
    }

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
                <Grid container>
                    <Grid item xl={6} xs={6} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        fontSize:'14px',
                                        fontWeight:'bolder',
                                        backgroundColor:'#992E62'
                                    }}
                                    startIcon={<ReplyIcon />}
                                    onClick={()=>pageSwitch(null)}
                                >
                                    Back
                                </Button>
                            </Grid>
                            {formData &&
                                <Grid item xs={6} md={6}>
                                    {/*Check if formdata object is not default empty object and all fields are filled*/}

                                    {enableSubmit &&
                                        <Box display="flex" justifyContent="flex-end" >
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    fontSize:'14px',
                                                    fontWeight:'bolder',
                                                    backgroundColor:'#0E6073'
                                                }}
                                                startIcon={<ControlPointIcon />}
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </Button>

                                        </Box>
                                    }

                                </Grid>
                            }

                        </Grid>
                    </Grid>

                </Grid>

            </Card.Footer>
        </Card>
    );
}
export default NavigationMenuItem;
