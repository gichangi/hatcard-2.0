import {useEffect, useState} from "react";
import { Card,  Row, Col } from 'react-bootstrap';
import {Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import NavGroup from "./NavGroup";
import NavCollapse from "./NavCollapse";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ReplyIcon from '@mui/icons-material/Reply';
import Box from "@mui/material/Box";
import _ from 'lodash';
import {apiFetch, updateMenuStore} from "../../../../assets/api/utils";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import NavLink from "./NavLink";
import {FacebookCircularProgress} from "../../../../assets/ui";
import {connect, useDispatch} from "react-redux";
import {updateMenuTree} from "../../../../actions/user";

function Index({menuDetails,pageSwitch,updatemenutree}) {
    const [menuType,setMenuType] = useState('')
    const [menuTypeName,setMenuTypeName] = useState("")
    const [enableCreate, setEnableCreate] = useState(false);
    const [enableEdit, setEnableEdit] = useState();
    const [menuComponent, setMenuComponent] = useState();
    const [formData, setFormData] = useState({});
    const [tempVa, setTempVa] = useState('');
    const [enableSubmit, setEnableSubmit] = useState(false)
    const [formValidate, setFormValidate] = useState(false)
    const MySwal = withReactContent(Swal);
    const [reComp, setReComp] = useState(<FacebookCircularProgress />)


    const updateFormData = (childForm) =>{
        setTempVa(JSON.stringify(childForm))
        setFormData(childForm);
        setEnableSubmit(formValidation(childForm.data))
    }

    const handleSubmit = () =>{
        //Check if form data has null values if no null then submit if null show
        ///console.log(formData)
        if(formValidation && Object.keys(formValidate.validate(formData.data)).length === 0){
            let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
            let headers = {
                "Accept": "application/json",
                "Authorization": `Bearer ${autStore.token}`
            }
            apiFetch('POST',headers,'/api/menu-items',formData).then(res=>{
/*                storeDispatch(updateMenuAction([]));//update store
                dispatch(updateMenuAction([]));//update menu state by actionv*/

                console.log("res.data")
                if(res.data.message.type === 'success'){
                    updatemenutree();

                    MySwal.fire('', 'Successfully Saved!', 'success').then(()=>{
                        pageSwitch(null)
                    })
                }else{
                    MySwal.fire('', 'An error occurred while saving the data', 'error');
                }
            })
        }else{
            formValidate.updateFormHelperText();
            MySwal.fire('', 'Check form for missing/wrong data', 'error');
        }

    }

    const formValidation = (childForm = formData)=>{
        return _.values(childForm).some(el => el == null) === false && Object.keys(childForm).length > 0;
    }
    const handleChange = (event,node) => {
        event.preventDefault();
        switchMenuComponent(node.props.value);
        setMenuType(event.target.value);
        setMenuTypeName(node.props.name)
    };
    useEffect(()=>{
        if (menuDetails != null){
            setEnableEdit(true);
            switchMenuComponent(_.capitalize(menuDetails.menu_type));
        }else{
            setEnableCreate(true)
        }
    },[]);

    const switchMenuComponent = (m) =>{
        console.log(m)
        switch (m){
            case 'Group':
                setReComp( <NavGroup  updateFormData={updateFormData} setFormValidate={setFormValidate} formData={menuDetails}/>);
                break;
            case 'Collapse':
                setReComp(<NavCollapse updateFormData={updateFormData} setFormValidate={setFormValidate} formData={menuDetails}/>);
                break;
            case 'Item':
                setReComp(<NavLink updateFormData={updateFormData} setFormValidate={setFormValidate} formData={menuDetails}/>);
                break;
            default:
                setReComp(<FacebookCircularProgress />);
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

                <Grid container item xs={6}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                >
                    <Grid item xs={3}                    >
                        <Card.Title as="h5"><Typography sx={{fontSize:'18px',color:'#992E62', fontWeight:'bolder'}}>Menu Item </Typography></Card.Title>
                    </Grid>
                    {enableCreate &&
                        <Grid item xs={9}>
                            <FormControl sx={{ m: 1, width:'100%' }}>
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
                                    <MenuItem value={'Group'}  name={'Group'}>Group</MenuItem>
                                    <MenuItem value={'Collapse'} name={'Collapse'}>Collapse</MenuItem>
                                    <MenuItem value={'Item'} name={'Link'}>Link</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                   }

                </Grid>


            </Card.Header>
            <Card.Body>
                <Grid container>
                    {/*{switchMenuComponent()}*/}
                    {reComp}
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


const mapActionToProps = {
    updatemenutree:updateMenuTree,
};

export default connect(null, mapActionToProps)(Index);
//export default Index; fetchUsers
