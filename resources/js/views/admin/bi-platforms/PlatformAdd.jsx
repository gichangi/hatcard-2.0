import {useEffect, useState} from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import _ from "lodash";
import {apiFetch} from "../../../assets/api/utils";
import {Card, Col, Form, Row} from "react-bootstrap";
import Grid from "@mui/material/Grid";
import {Button, FormHelperText, MenuItem, Select, Typography} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {BI_Platforms_List} from "../../../assets/const/Constants";


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
    if (!values.platform) {
        errors.platform = 'Required';
    }
    if (!values.platform_type) {
        errors.platform_type = 'Required';
    }
    if (!values.base_url) {
        errors.base_url = 'Required';
    }
    return errors;
};
function PlatformAdd({pageSwitch, rowData}) {
    const [formErrors, setFormErrors] = useState({});
    const [defaultSwitch, setDefaultSwitch] = useState(true);
    const [tempVal,setTempVal] = useState("");
    const [platform,setPlatform] = useState("");
    const [platformChildren,setPlatformChildren] = useState([]);
    const [platformType,setPlatformType] = useState('');
    const [enableSubmit, setEnableSubmit] = useState(false)
    const MySwal = withReactContent(Swal);
    const [formData,setFormData]=useState({
        name:null,
        description: null,
        platform:null,
        platform_type:null,
        base_url:null,
        status:'Active',
        config_status:'Pending'
    });

    useEffect(()=>{
        if (rowData){
            setFormData({
                id:rowData.id,
                name:rowData.name,
                description: rowData.description,
                platform:rowData.platform,
                platform_type:rowData.platform_type,
                base_url:rowData.base_url,
                status:rowData.status,
                config_status:rowData.config_status
            });
            setPlatform(rowData.platform);

            setPlatformChildren((_.find(BI_Platforms_List,{value:rowData.platform}).children));
            setPlatformType(rowData.platform_type);
            setDefaultSwitch(rowData.status==='Active'?true:false);
        }
    },[rowData]);


    const updateFormHelperText = () =>{
        setFormErrors(validate(formData));
    }
    const toggleHandler = () => {
        setDefaultSwitch((prevState) => !prevState);
        formData.status =  !defaultSwitch?"Active":"Archived";
        setFormData(formData);
        setEnableSubmit(formValidation(formData))

    };
    const handleChange = (e,node)=>{
        e.preventDefault();
        formData[e.target.id] = e.target.value === ''?null:e.target.value;
        setFormData(formData);
        setTempVal(e.target.value);
        setEnableSubmit(formValidation(formData))
    }
    const handleSelectChange = (e,node,selectElement)=>{
        e.preventDefault();
        switch (selectElement) {
            case 'platform':
                setPlatform(e.target.value);
                setPlatformType('');
                setPlatformChildren(_.find(BI_Platforms_List,{value:e.target.value}).children)
                break;
            case 'platform_type':
                setPlatformType(e.target.value);
                break;
        }

        formData[selectElement] = e.target.value === ''?null:e.target.value;
        setFormData(formData);
        setTempVal(e.target.value);
        setEnableSubmit(formValidation(formData))
    }


    const formValidation = (formData = formData)=>{
        return _.values(formData).some(el => el == null) === false && Object.keys(formData).length > 0;
    }

    const handleSubmit = () =>{
        if(formValidation && Object.keys(validate(formData)).length === 0){
            let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
            let headers = {
                "Accept": "application/json",
                "Authorization": `Bearer ${autStore.token}`
            }
            console.log(formData)
            apiFetch('POST',headers,'/api/bi-platforms',formData).then(res=>{
                console.log(res.data)
                if(res.data.message.type === 'success'){
                    MySwal.fire('', 'Successfully Saved!', 'success').then(()=>{
                        pageSwitch('list')
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
                        <Card.Title as="h5"><Typography sx={{fontSize:'18px',color:'#992E62', fontWeight:'bolder'}}>Platform</Typography></Card.Title>
                    </Grid>
                    {platform}
                </Grid>
            </Card.Header>
            <Card.Body>
                <Grid container>
                    <Grid item xs={6}>
                        <Form>
                            <Form.Group as={Row} controlId="name">
                                <Form.Label  column sm={3}>
                                    Name
                                    {formErrors.name &&
                                        <>
                                            <FormHelperText sx={{color:'red'}}>{formErrors.name}</FormHelperText>
                                        </>
                                    }
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" placeholder="Title" onChange={handleChange} value={formData.name} />
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
                                    <Form.Control as="textarea" rows="3" onChange={handleChange} value={formData.description} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="url">
                                <Form.Label  column sm={3}>
                                    Platform
                                    {formErrors.platform &&
                                        <>
                                            <FormHelperText sx={{color:'red'}}>{formErrors.platform}</FormHelperText>
                                        </>
                                    }
                                </Form.Label>
                                <Col sm={9}>
                                    <Select
                                        displayEmpty
                                        id="select-platform"
                                        value={platform}
                                        onChange={(e,node) => handleSelectChange(e,node,'platform')}
                                        renderValue={(selected,node) => {
                                            if (selected.length === 0) {
                                                return <>Select Platform</>;
                                            }
                                            return _.find(BI_Platforms_List, {value:formData.platform}).name;
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
                                        {BI_Platforms_List.map((p)=>(
                                            <MenuItem value={p.value}>{p.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="platform_type">
                                <Form.Label  column sm={3}>
                                    Type
                                    {formErrors.platform_type &&
                                        <>
                                            <FormHelperText sx={{color:'red'}}>{formErrors.platform_type}</FormHelperText>
                                        </>
                                    }
                                </Form.Label>
                                <Col sm={9}>
                                    <Select
                                        displayEmpty
                                        id="select-platform-type"
                                        value={platformType}
                                        onChange={(e,node) => handleSelectChange(e,node,'platform_type')}
                                        renderValue={(selected,node) => {
                                            if (selected.length === 0) {
                                                return <>Select Type</>;
                                            }
                                            return _.find(platformChildren, {value:formData.platform_type}).name;
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
                                        {platformChildren.map((p)=>(
                                            <MenuItem value={p.value}>{p.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="base_url">
                                <Form.Label  column sm={3}>
                                    Url
                                    {formErrors.base_url &&
                                        <>
                                            <FormHelperText sx={{color:'red'}}>{formErrors.base_url}</FormHelperText>
                                        </>
                                    }
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" placeholder="URL" onChange={handleChange} value={formData.base_url} />
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

export default PlatformAdd;
