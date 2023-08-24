import {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {Card, Col, Form, Row} from "react-bootstrap";
import {Button, FormHelperText, Typography} from "@mui/material";
import ImageUpload from "../../../components/Image/ImageUpload";
import {styled} from "@mui/material/styles";
import {DataGridPro as MuiDataGrid} from "@mui/x-data-grid-pro/DataGridPro/DataGridPro";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {apiFetch} from "../../../assets/api/utils";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import _ from "lodash";
import CustomMenuTree from "../../../components/MenuTree/CustomMenuTree";
import Paper from "@mui/material/Paper";


const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
    "& .MuiDataGrid-columnHeaders": { display: "none" },
    "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },
    "& .root":{height:'100px'}
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height:'100%'
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


function OrgAdd({pageSwitch, rowData}) {
    const [menuTreeItems, setMenuTreeItems] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [defaultSwitch, setDefaultSwitch] = useState(true);
    const [tempVal,setTempVal] = useState("");
    const [enableSubmit, setEnableSubmit] = useState(false)
    const MySwal = withReactContent(Swal);
    const [orgForm,setOrgForm]=useState({
        name:null,
        description: null,
        status:'active'
    });

    useEffect(()=>{
        if (rowData){
            setOrgForm({
                id:rowData.id,
                name:rowData.name,
                parent_id:rowData.parent_id,
                description: rowData.description,
                status:rowData.status
            });
            setDefaultSwitch(rowData.status==='active'?true:false);
        }
    },[rowData]);


    const updateFormHelperText = () =>{
        setFormErrors(validate(orgForm));
    }
    const toggleHandler = () => {
        setDefaultSwitch((prevState) => !prevState);
        orgForm.status =  !defaultSwitch?"active":"inactive";
        setOrgForm(orgForm);
        setEnableSubmit(formValidation(orgForm))

    };
    const handleChange = (e)=>{
        e.preventDefault();
        orgForm[e.target.id] = e.target.value === ''?null:e.target.value;
        setOrgForm(orgForm);
        setTempVal(e.target.value);
        setEnableSubmit(formValidation(orgForm))
    }
    const formValidation = (formData = orgForm)=>{
        return Object.keys(validate(formData)).length ===0;
        //return _.values(formData).some(el => el == null) === false && Object.keys(formData).length > 0;
    }

    const handleSubmit = () =>{
        if(formValidation && Object.keys(validate(orgForm)).length === 0){
            let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
            let headers = {
                "Accept": "application/json",
                "Authorization": `Bearer ${autStore.token}`
            }
            console.log(orgForm)
            apiFetch('POST',headers,'/api/organisations',orgForm).then(res=>{
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
            setMenuTreeItems(orgs);
        })

    },[]);

    const setSelectedItems = (items) => {
        orgForm.parent_id = items[0];
        setTempVal(items[0]);
        setEnableSubmit(formValidation(orgForm))
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
                        <Card.Title as="h5"><Typography sx={{fontSize:'18px',color:'#992E62', fontWeight:'bolder'}}>Organisation </Typography></Card.Title>
                    </Grid>
                </Grid>
            </Card.Header>
            <Card.Body>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Item>
                            <Form>
                                <Form.Group as={Row} controlId="name">
                                    <Form.Label  column sm={3}>
                                        Organisation
                                        {formErrors.name &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.name}</FormHelperText>
                                            </>
                                        }
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="Title" onChange={handleChange} value={orgForm.name} />
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
                                        <Form.Control as="textarea" rows="3" onChange={handleChange} value={orgForm.description} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label as="legend" column sm={3}>
                                        Status
                                    </Form.Label>
                                    <Col sm={9}>
                                        <div className="switch d-inline m-r-10">
                                            <Form.Control type="checkbox"  id="checked-default" checked={defaultSwitch}  onChange={toggleHandler} />
                                            <Form.Label htmlFor="checked-default" className="cr" />
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Form>
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
                                    <CustomMenuTree title={"Organisation Tree"} menuTreeItems={menuTreeItems} orderField={'date_created'} numberOfItems={'single'} selectedItem={setSelectedItems} selectLevels={[]}  />
                                </Col>
                            </Form.Group>
                        </Item>
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
                            {orgForm &&
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

export default OrgAdd;
