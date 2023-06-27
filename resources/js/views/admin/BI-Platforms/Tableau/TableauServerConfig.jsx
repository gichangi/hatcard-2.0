import {Card, Col, Form, Row} from "react-bootstrap";
import Grid from "@mui/material/Grid";
import {Button, FormHelperText, MenuItem, Select, Typography} from "@mui/material";
import _ from "lodash";
import {BI_Platforms_List} from "../../../../assets/const/Constants";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {useEffect, useState} from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {apiFetch} from "../../../../assets/api/utils";


const validate = (values) => {
    const errors = {};
    if (!values.uri_prefix) {
        errors.uri_prefix = 'Required';
    }

    if (!values.target_site) {
        errors.target_site = 'Required';
    }

    if (!values.username) {
        errors.username = 'Required';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
    if (!values.proxy) {
        errors.proxy = 'Required';
    }
    return errors;
};

function TableauServerConfig({configDetails, pageSwitch}) {
    const [formErrors, setFormErrors] = useState({});
    const [defaultSwitch, setDefaultSwitch] = useState(true);
    const [tempVal,setTempVal] = useState("");
    const [platformType,setPlatformType] = useState('');
    const [enableSubmit, setEnableSubmit] = useState(false)
    const [configJson, setConfigJson] = useState({
        uri_prefix:null,
        target_site:null,
        username:null,
        password:null,
        proxy:null
    })
    const MySwal = withReactContent(Swal);

    useEffect(()=>{
        if (configDetails){

            if(configDetails.config_status !== 'Pending'){
                setConfigJson(configDetails.config_json)
            }
            setPlatformType(_.find(_.find(BI_Platforms_List,{value:configDetails.platform}).children, {value:configDetails.platform_type}).name)
        }
    },[configDetails]);


    const updateFormHelperText = () =>{
        setFormErrors(validate(configJson));
    }

    const handleChange = (e)=>{
        e.preventDefault();
        configJson[e.target.id] = e.target.value === ''?null:e.target.value;
        setConfigJson(configJson);
        setTempVal(e.target.value);
        setEnableSubmit(formValidation(configJson))
    }


    const formValidation = (configJson = configJson)=>{
        return _.values(configJson).some(el => el == null) === false && Object.keys(configJson).length > 0;
    }

    const handleSubmit = () =>{
        if(formValidation && Object.keys(validate(configJson)).length === 0){
           configJson.base_url = configDetails.base_url;
            console.log(configJson)
            apiFetch('POST',{},'/api/tableau/check',configJson).then(res=>{
                console.log(res.data)
                if(res.data.message.type === 'success'){
                    apiFetch('POST',{},'/api/bi-platforms/configs',{ id:configDetails.id,config:configJson}).then(response=>{
                        if (response.data.message.type === 'success'){
                            MySwal.fire('', 'Successfully Saved!', 'success').then(()=>{
                                pageSwitch('list')
                            })
                        }else{
                            MySwal.fire('', 'An error occurred while saving of the configuration details', 'error');
                        }
                    })

                }else{
                    MySwal.fire('', 'Credentials check failed. Kindly check your server credentials.', 'error').then(res=>{
                        setEnableSubmit(false)
                    })
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
                    <Grid item xs={6}                    >
                        <Card.Title as="h5"><Typography sx={{fontSize:'18px',color:'#992E62', fontWeight:'bolder',textTransform:'capitalize'}}>Configuration : {configDetails.platform} - {platformType} </Typography></Card.Title>
                    </Grid>
                </Grid>
            </Card.Header>
            <Card.Body>
                <Grid container>
                    <Grid item xs={6}>
                        <Form>
                            <Box
                                sx={{
                                    boxShadow: 1,
                                    width: '120%',
                                    height: 'auto',
                                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                    color: (theme) =>
                                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                    p: 3,
                                    borderRadius: 0,
                                    textAlign: 'center',
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                }}
                            >
                                <Form.Group as={Row} controlId="base_url">
                                    <Form.Label className="form-label col-form-label col-sm-3" column sm={3}>
                                        Name
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control  type="text" placeholder="Connection Name" disabled={true} value={configDetails.name} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="base_url">
                                    <Form.Label className="form-label col-form-label col-sm-3" column sm={3}>
                                        Description
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control as="textarea" rows="3" value={configDetails.description} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="base_url">
                                    <Form.Label className="form-label col-form-label col-sm-3" column sm={3}>
                                        Base URL
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control  type="text" placeholder="Title" disabled={true} value={configDetails.base_url} />
                                    </Col>
                                </Form.Group>
                            </Box>



{/*                            <Form.Group as={Row} >
                                <Form.Label as="legend" column sm={3}>
                                    Status
                                </Form.Label>
                                <Col sm={9}>
                                    <div className="switch d-inline m-r-10">
                                        <Form.Control type="checkbox"  id="checked-default" checked={defaultSwitch}  disabled />
                                        <Form.Label htmlFor="checked-default" className="cr" />
                                    </div>
                                </Col>
                            </Form.Group>*/}



                            <Box
                                sx={{
                                    width: '120%',
                                    height: 'auto',
                                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                    color: (theme) =>
                                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                    p: 3,
                                    marginTop:'10px',
                                    borderRadius: 0,
                                    textAlign: 'center',
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                }}
                            >
                                <Form.Group as={Row} controlId="uri_prefix">
                                    <Form.Label  column sm={3}>
                                        URI Prefix
                                        {formErrors.uriPrefix &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.uriPrefix}</FormHelperText>
                                            </>
                                        }
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="URI Prefix" onChange={handleChange} value={configJson.uri_prefix} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="target_site">
                                    <Form.Label as="legend" column sm={3}>
                                        Target Site
                                        {formErrors.description &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.targetSite}</FormHelperText>
                                            </>
                                        }
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="Target Site"  onChange={handleChange} value={configJson.target_site} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="username">
                                    <Form.Label  column sm={3}>
                                        Username
                                        {formErrors.username &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.username}</FormHelperText>
                                            </>
                                        }
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="Username" onChange={handleChange}  value={configJson.username}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="password">
                                    <Form.Label  column sm={3}>
                                        Password
                                        {formErrors.password &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.password}</FormHelperText>
                                            </>
                                        }
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="Password" onChange={handleChange}  value={configJson.password}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="proxy">
                                    <Form.Label  column sm={3}>
                                        Proxy
                                        {formErrors.proxy &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.proxy}</FormHelperText>
                                            </>
                                        }
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="Proxy" onChange={handleChange}  value={configJson.proxy}/>
                                    </Col>
                                </Form.Group>

                            </Box>


                        </Form>

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
                                    onClick={()=>pageSwitch('list')}
                                >
                                    Back
                                </Button>
                            </Grid>
                            {configDetails &&
                                <Grid item xs={6} md={6}>
                                    {/*Check if configDetails object is not default empty object and all fields are filled*/}

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

export default TableauServerConfig;
