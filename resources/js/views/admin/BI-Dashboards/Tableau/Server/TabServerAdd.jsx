import {useEffect, useState} from "react";
import {apiFetch} from "../../../../../assets/api/utils";
import _ from "lodash";
import {Card, Col, Form, Row} from "react-bootstrap";
import Grid from "@mui/material/Grid";
import {Button, FormHelperText, MenuItem, Select, Typography} from "@mui/material";
import {BI_Platforms_List} from "../../../../../assets/const/Constants";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

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


function TabServerAdd({details,pageSwitch}) {
    const [dashboard, setDashboard] = useState();
    const [servers, setServers]=useState([]);
    const [biServer, setBiServer]=useState("");
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState("");




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

        apiFetch('GET',{},'/api/bi-platforms/tableau_server/Configured',{}).then(res=>{
            //Read only resource since we are receiving a collection
            console.log("ddd")
            console.log(_.map(res.data.platforms, 'resource'))
            console.log("dd")
            setServers(_.map(res.data.platforms, 'resource'));
        })
    },[]);

    const handleServerChange = (event,node) => {
        event.preventDefault();
        setBiServer(node.props.name);
        apiFetch('POST',{},'/api/tableau/projects',{id:node.props.value}).then(res=>{
            //Read only resource since we are receiving a collection
            console.log("ddd")
            console.log()
            console.log("dd")
            setProjects(res.data.message.projects);
        })
    };

    const handleProjectChange = (event,node) => {
        event.preventDefault();
        setBiServer(node.props.name);
        apiFetch('POST',{},'/api/tableau/workbooks',{id:biServer,project:node.props.value}).then(res=>{
            //Read only resource since we are receiving a collection
            console.log("ddd")
            console.log()
            console.log("dd")
            setProjects(res.data.message.projects);
        })
    };




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

                </Grid>
            </Card.Header>
            <Card.Body>
                <Grid container>
                    <Grid item xs={6}>
                        <Form>

                            <Form.Group as={Row} controlId="biServer">
                                <Form.Label  column sm={3}>
                                    Server
                                    {formErrors.biServer &&
                                        <>
                                            <FormHelperText sx={{color:'red'}}>{formErrors.biServer}</FormHelperText>
                                        </>
                                    }
                                </Form.Label>
                                <Col sm={9}>
                                    <Select
                                        displayEmpty
                                        id="select-platform"
                                        value={biServer}
                                        onChange={(e,node)=>handleServerChange(e,node)}
                                        renderValue={(selected,node) => {
                                            if (selected.length === 0) {
                                                return <>Select Server</>;
                                            }
                                            return biServer;
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
                                        {servers.map((p)=>(
                                            <MenuItem key={p.id} value={p.id}  name={p.name}>{p.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="biServer">
                                <Form.Label  column sm={3}>
                                    Projects
                                    {formErrors.biServer &&
                                        <>
                                            <FormHelperText sx={{color:'red'}}>{formErrors.biServer}</FormHelperText>
                                        </>
                                    }
                                </Form.Label>
                                <Col sm={9}>
                                    <Select
                                        displayEmpty
                                        id="select-platform"
                                        value={project}
                                        onChange={(e,node)=>handleProjectChange(e,node)}
                                        renderValue={(selected,node) => {
                                            if (selected.length === 0) {
                                                return <>Select Project</>;
                                            }
                                            return project;
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
                                        {projects.map((p)=>(
                                            <MenuItem key={p.id} value={p.id}  name={p.name}>{p.name}</MenuItem>
                                        ))}
                                    </Select>
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

export default TabServerAdd;
