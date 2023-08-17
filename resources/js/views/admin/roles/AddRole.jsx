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



const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
    "& .MuiDataGrid-columnHeaders": { display: "none" },
    "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },
    "& .root":{height:'100px'}
}));

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length > 250) {
        errors.name = 'Must be 200 characters or less';
    }
    if (!values.description) {
        errors.description = 'Required';
    } else if (values.description.length > 1000) {
        errors.description = 'Must be 1000 characters or less';
    }


    return errors;
};


function AddRole({row,pageSwitch}) {
    const transferListRef = useRef(null);
    const [formErrors, setFormErrors] = useState({});
    const [tempVal,setTempVal] = useState("");
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [permissions, setPermissions] = useState([])
    const MySwal = withReactContent(Swal);
    const [role,setRole]=useState({
        name:null,
        description: null,
        permissions:null
    });

    useEffect(()=>{
        if (row){
            setRole({
                id:row.id,
                name:row.name,
                description: row.description,
                permissions:row.permissions
            });
        }
    },[row]);

    useEffect(()=>{
        apiFetch('Get',{},'/api/roles/permissions',{}).then(res=>{
            setPermissions(res.data.permissions)
        })
    },[])


    const updateFormHelperText = () =>{
        setFormErrors(validate(role));
    }

    const handleChange = (e)=>{
        e.preventDefault();
        role[e.target.id] = e.target.value === ''?null:e.target.value;
        setRole(role);
        setTempVal(e.target.value);
        setEnableSubmit(formValidation(role))
    }
    const formValidation = (formData = role)=>{
        return _.values(formData).some(el => el == null) === false && Object.keys(formData).length > 0;
    }

    const UpdatePermissions = (items) =>{
        role.permissions = items.length === 0? null:items;
        setRole(role);
        setEnableSubmit(formValidation(role))
    }

    const handleSubmit = () =>{
        if(formValidation && Object.keys(validate(role)).length === 0){
            apiFetch('POST',{},'/api/roles',role).then(res=>{
                console.log(res.data)
                if(res.data.message.type === 'success'){
                    MySwal.fire('', 'Successfully Saved!', 'success').then(()=>{
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
                        <Card.Title as="h5"><Typography sx={{fontSize:'18px',color:'#992E62', fontWeight:'bolder'}}>Role </Typography></Card.Title>
                    </Grid>
                </Grid>
            </Card.Header>
            <Card.Body>
                <Grid container>
                    <Grid item xs={6}>
                        <Form>
                            <Form.Group as={Row} controlId="name">
                                <Form.Label  column sm={3}>
                                    Role
                                    {formErrors.name &&
                                        <>
                                            <FormHelperText sx={{color:'red'}}>{formErrors.name}</FormHelperText>
                                        </>
                                    }
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" placeholder="Title" onChange={handleChange} value={role.name} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="description">
                                <Form.Label as="legend" column sm={3}>
                                    Description
                                    {formErrors.description &&
                                        <>
                                            <FormHelperText sx={{color:'red'}}>{formErrors.description}</FormHelperText>
                                        </>
                                    }
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control as="textarea" rows="3" onChange={handleChange} value={role.description} />
                                </Col>
                            </Form.Group>


                        </Form>
                    </Grid>
                    <Grid item xs={8} sx={{marginTop:'-25px'}}>
                        <Form.Group as={Row} controlId="permissions">
                            <Col sm={12}>
                                <Form.Label as="legend" column sm={12}>
                                    <Typography sx={{textAlign:'center',fontSize:'18px',color:'#992E62', fontWeight:'bolder', paddingBottom:'10px'}}>
                                        Permissions
                                    </Typography>
                                    {formErrors.permissions &&
                                        <>
                                            <FormHelperText sx={{color:'red'}}>{formErrors.permissions}</FormHelperText>
                                        </>
                                    }
                                </Form.Label>
                                {permissions  &&
                                    <TransferList allItems={permissions} selectedItems={role.permissions}  action={UpdatePermissions}/>
                                }

                            </Col>
                        </Form.Group>

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
                            {role &&
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

export default AddRole;
