import {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {Card, Col, Form, Row} from "react-bootstrap";
import {Button, FormHelperText, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {DataGridPro as MuiDataGrid} from "@mui/x-data-grid-pro/DataGridPro/DataGridPro";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {apiFetch} from "../../../assets/api/utils";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import _ from "lodash";
import TransferList from '../../../components/TransferList';
import {useRef} from "react";
import CustomMenuTree from "../../../components/MenuTree/CustomMenuTree";
import Paper from "@mui/material/Paper";
import EmailField from "../../../assets/FormField/EmailField";
import PasswordField from "../../../assets/FormField/PasswordField";


const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
    "& .MuiDataGrid-columnHeaders": { display: "none" },
    "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },
    "& .root":{height:'100px'}
}));

const validate = (values) => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = 'Required';
    } else if (values.first_name.length > 250) {
        errors.first_name = 'Must be 200 characters or less';
    }
    if (!values.last_name) {
        errors.last_name = 'Required';
    } else if (values.last_name.length > 1000) {
        errors.last_name = 'Must be 1000 characters or less';
    }


    return errors;
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height:'100%'
}));



function AddUser({row,pageSwitch}) {
    const transferListRef = useRef(null);
    const [userMenus, setUserMenus] = useState([]);
    const [userOrganisations, setUserOrganisations] = useState([]);
    const [menuTreeItems, setMenuTreeItems] = useState([]);
    const [orgsTreeItems, setOrgsTreeItems] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [tempVal,setTempVal] = useState("");
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [roles, setRoles] = useState([])
    const [passwordStrength,setPasswordStrength] = useState(true);
    const [userEmail, setUserEmail] = useState(null)
    const MySwal = withReactContent(Swal);
    const [user,setUser]=useState({
        first_name: null,
        middle_name: null,
        last_name: null,
        organisations: null,
        email: null,
        phone: null,
        roles: null,
        menus: null
    });

    useEffect(()=>{
        if (row){
            setUser({
                id:row.id,
                first_name:row.first_name,
                middle_name:row.middle_name,
                last_name:row.last_name,
                organisations: [..._.map(row.organisations,'id')],
                email:{ value: row.email, dirty: true, errors: [] },
                phone:row.phone,
                roles:row.user_roles,
                menus:[..._.map(row.menus,'id')],
            });
            setUserEmail(row.email);
            setUserMenus(_.map(row.menus,'id'))
            setUserOrganisations(_.map(row.organisations,'id'))
            loadRoles()
        }else{
            loadRoles()
        }
    },[row]);

    const loadRoles = () =>{
        apiFetch('Get',{},'/api/roles',{}).then(res=>{
            setRoles(res.data.roles)
        })
    }


    useEffect(()=>{
        apiFetch('GET',{},'/api/organisations',{}).then(res=>{
            let orgs = [];
            res.data.organisations.forEach(i =>{
                orgs.push({
                    id:i.id,
                    name:i.name,
                    date_created:i.created_at,
                    parent_id:i.parent_id
                });
            })
            setOrgsTreeItems(orgs);
        });
        apiFetch('GET',{},'/api/menu-items',{}).then(res=>{
            let temp = [];
            res.data.menu_items.forEach(i =>{
                temp.push({
                    name:i.name,
                    id:i.id,
                    order_id:i.order_id,
                    parent_id:i.parent_id,
                    menu_type:i.menu_type
                });
            })
            setMenuTreeItems(temp);
        })

    },[]);



    const updateFormHelperText = () =>{
        setFormErrors(validate(user));
    }
    const handleChange = (e)=>{
        e.preventDefault();
        user[e.target.id] = e.target.value === ''?null:e.target.value;
        setUser(user);
        setTempVal(e.target.value);
        setEnableSubmit(formValidation(user))
    }
    const emailChange = (e) =>{
        console.log(e)
        user.email = e.value === ''?null:e
        setUser(user);
        setTempVal(e.value);
        setEnableSubmit(formValidation(user))
    }
    const passwordChange = (e) =>{
        //null id for new user
        if(user.id != null && e.value === ""){
            _.omit(password, ['password']);
        }else{
            if(e.value === ""){
                user.password = null;
            }else{
                user.password = e;
            }

        }
        setUser(user);
        setTempVal(e.value);
        setEnableSubmit(formValidation(user))
    }
    const formValidation = (formData = user)=>{
        return Object.keys(validate(formData)).length ===0;
        //return _.values(formData).some(el => el == null) === false && Object.keys(formData).length > 0;
    }

    const UpdateRoles = (items) =>{
        user.roles = items.length === 0? null:items;
        setUser(user);
        setEnableSubmit(formValidation(user))
    }
    const setSelectedItems = (items) => {
        user.menus = items;
        setTempVal(items[0]);
        setEnableSubmit(formValidation(user))
    }
    const setSelectedOrgs= (items) => {
        user.organisations = items;
        setTempVal(items[0]);
        setEnableSubmit(formValidation(user))
    }
    const handleSubmit = () =>{

        if(user.hasOwnProperty('password')){
            if(user.password.errors.length > 0 ){
                MySwal.fire('', user.password.errors[0], 'error');
                setEnableSubmit(false)
            }else{
                user.password = user.password.value
            }
        }
        if(user.email.hasOwnProperty('value')){
            if(user.email.errors.length > 0 ){
                alert([user.email.errors]);
                MySwal.fire('', user.email.errors, 'error');
                setEnableSubmit(false)
            }
        }

        if(formValidation && Object.keys(validate(user)).length === 0 && enableSubmit){
            let userObj = new Object(JSON.parse(JSON.stringify(user)));
            userObj.roles = [..._.map(user.roles, 'name')]
            userObj.email = user.email.value
            apiFetch('POST',{},'/api/user',userObj).then(res=>{
                if(res.data.message.type === 'success'){
                    MySwal.fire('', 'Successfully Uploaded!', 'success').then(()=>{
                        pageSwitch(null)
                    })
                }else{
                    MySwal.fire('', 'An error occurred while saving the data', 'error');
                }
            })
        }else{
            updateFormHelperText();
            MySwal.fire('', 'Check form for missing/wrong data', 'error');
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
                padding:`25px`
            }}>

                <Grid container item xs={6}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                >
                    <Grid item xs={3}                    >
                        <Card.Title as="h5"><Typography sx={{fontSize:'18px',color:'#992E62', fontWeight:'bolder'}}>user </Typography></Card.Title>
                    </Grid>
                </Grid>
            </Card.Header>
            <Card.Body>
                <Grid container>
                    <Grid container spacing={1} sx={{padding:'10px'}}>
                        <Item sx={{width:'100%'}}>
                            <Grid container spacing={1} sx={{padding:'0px 10px 0px 10px'}}>
                                <Grid item xs={4} >
                                    <Form.Group as={Row} controlId="first_name">
                                        <Col sm={9}>
                                            <Form.Label column sm={12}>
                                                First Name
                                                {formErrors.name &&
                                                    <>
                                                        <FormHelperText sx={{color:'red'}}>{formErrors.name}</FormHelperText>
                                                    </>
                                                }
                                            </Form.Label>
                                            <Form.Control style={{marginBottom:'0px'}} type="text" placeholder="First Name" onChange={handleChange} value={user.first_name} />
                                        </Col>
                                    </Form.Group>
                                </Grid>
                                <Grid item xs={4}>
                                    <Form.Group as={Row} controlId="middle_name">
                                        <Col sm={9}>
                                            <Form.Label  column sm={12}>
                                                Middle Name(s)
                                                {formErrors.name &&
                                                    <>
                                                        <FormHelperText sx={{color:'red'}}>{formErrors.middle_name}</FormHelperText>
                                                    </>
                                                }
                                            </Form.Label>
                                            <Form.Control style={{marginBottom:'0px'}} type="text" placeholder="Middle Name(s)" onChange={handleChange} value={user.middle_name} />
                                        </Col>
                                    </Form.Group>
                                </Grid>
                                <Grid item xs={4}>
                                    <Form.Group as={Row} controlId="last_name">
                                        <Col sm={9}>
                                            <Form.Label  column sm={12}>
                                                Last Name
                                                {formErrors.last_name &&
                                                    <>
                                                        <FormHelperText sx={{color:'red'}}>{formErrors.last_name}</FormHelperText>
                                                    </>
                                                }
                                            </Form.Label>
                                            <Form.Control style={{marginBottom:'0px'}} type="text" placeholder="Last Name" onChange={handleChange} value={user.last_name} />
                                        </Col>
                                    </Form.Group>
                                </Grid>
                            </Grid>

                            <Grid container spacing={1} sx={{padding:'0px 10px 0px 10px'}}>

                                <Grid item xs={4}>
                                    <Form.Group as={Row} controlId="email">
                                        <Col sm={9}>
                                            {userEmail === null &&
                                                <EmailField  label={"Email Address"} fieldId={'user-email-1'} placeholder={'Email'} onStateChanged={emailChange} required/>
                                            }
                                            {userEmail !== null &&
                                                <EmailField initValue={userEmail} label={"Email Address"} fieldId={'user-email-1'} placeholder={'Email'} onStateChanged={emailChange} required/>

                                            }
                                            <Form.Label  column sm={12}>
                                                {formErrors.email &&
                                                    <>
                                                        <FormHelperText sx={{color:'red'}}>{formErrors.email}</FormHelperText>
                                                    </>
                                                }
                                            </Form.Label>
                                            {/*<Form.Control style={{marginBottom:'0px'}} type="text" placeholder="Email Address" onChange={handleChange} value={user.email} />*/}
                                        </Col>
                                    </Form.Group>
                                </Grid>
                                <Grid item xs={4}>
                                    <Form.Group as={Row} controlId="phone">
                                        <Col sm={9}>
                                            <Form.Label  column sm={12}>
                                                Phone Number
                                                {formErrors.name &&
                                                    <>
                                                        <FormHelperText sx={{color:'red'}}>{formErrors.phone}</FormHelperText>
                                                    </>
                                                }
                                            </Form.Label>
                                            <Form.Control style={{marginBottom:'0px'}} type="text" placeholder="Phone Number" onChange={handleChange} value={user.phone} />
                                        </Col>
                                    </Form.Group>
                                </Grid>
                                <Grid item xs={4}>
                                    <Form.Group as={Row} controlId="password">
                                        <Col sm={9}>

                                            <PasswordField fieldId="password" label="Password" placeholder="Enter Password" onStateChanged={passwordChange} thresholdLength={7} minStrength={3} required autoComplete="off"/>
                                            <Form.Label  column sm={12}>
                                                {formErrors.password &&
                                                    <>
                                                        <FormHelperText sx={{color:'red'}}>{formErrors.password}</FormHelperText>
                                                    </>
                                                }
                                            </Form.Label>
                                        </Col>
                                    </Form.Group>
                                </Grid>



                            </Grid>

                        </Item>
                    </Grid>


                    <Grid container spacing={1}>
                        <Grid item xs={6} >
                            <Item>
                                <Form.Group as={Row} controlId="parent_menu_uid">
                                    <Col sm={12}>
                                        {formErrors.parent_menu_uid &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.parent_menu_uid}</FormHelperText>
                                            </>
                                        }
                                        {userOrganisations &&
                                            <CustomMenuTree title={"Select Organisations"} menuTreeItems={orgsTreeItems} orderField={'created_at'} numberOfItems={'multi'} selectedItem={setSelectedOrgs} selectLevels={[]} defaultSelected={userOrganisations}  />
                                        }


                                    </Col>
                                </Form.Group>
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                                <Form.Group as={Row} controlId="parent_menu_uid">
                                    <Col sm={12}>
                                        {formErrors.parent_menu_uid &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.parent_menu_uid}</FormHelperText>
                                            </>
                                        }
                                        {userMenus &&
                                            <CustomMenuTree title={"Select Menus"}  menuTreeItems={menuTreeItems} orderField={'order_id'} numberOfItems={'multi'} selectedItem={setSelectedItems} selectLevels={[]} defaultSelected={userMenus}  />
                                        }

                                    </Col>
                                </Form.Group>
                            </Item>
                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <Form.Group as={Row} controlId="permissions">
                                    <Col sm={12}>
                                        <Form.Label as="legend" column sm={12}>
                                            <Typography sx={{textAlign:'center',fontSize:'18px',color:'#992E62', fontWeight:'bolder', paddingBottom:'10px'}}>
                                                Roles
                                            </Typography>
                                            {formErrors.roles &&
                                                <>
                                                    <FormHelperText sx={{color:'red'}}>{formErrors.roles}</FormHelperText>
                                                </>
                                            }
                                        </Form.Label>
                                        {roles  &&
                                            <TransferList allItems={roles} selectedItems={user.roles}  action={UpdateRoles}/>
                                        }

                                    </Col>
                                </Form.Group>
                            </Item>

                        </Grid>


                    </Grid>

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
                            {user &&
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

export default AddUser;
