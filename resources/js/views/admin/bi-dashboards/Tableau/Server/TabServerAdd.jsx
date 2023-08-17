import {useEffect, useState,useRef} from "react";
import {apiFetch} from "../../../../../assets/api/utils";
import _ from "lodash";
import {Card, Col, Form, Row} from "react-bootstrap";
import Grid from "@mui/material/Grid";
import {
    Button,
    CardMedia,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import TreeNode from "../../../../../components/MenuTree/TreeNode";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CustomMenuTree from "../../../../../components/MenuTree/CustomMenuTree";

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
    if (!values.parent_menu_uid) {
        errors.parent_menu_uid = 'Required';
    }
    if (!values.server_uid) {
        errors.server_uid = 'Required';
    }
    if (!values.config_json.project_id) {
        errors.project_id = 'Required';
    }
    if (!values.config_json.workbook_id) {
        errors.workbook_id = 'Required';
    }
    if (!values.config_json.view_id) {
        errors.view_id = 'Required';
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


function TabServerAdd({details,pageSwitch}) {

    const [servers, setServers]=useState([]);
    const [projects, setProjects] = useState([]);
    const [workbooks, setWorkbooks] = useState([]);
    const [views, setViews] = useState([]);
    const [image, setImage] = useState('');
    const [selectedMenu, setSelectedMenu] = useState([]);

    const [formErrors, setFormErrors] = useState({});
    const [defaultSwitch, setDefaultSwitch] = useState(true);
    const [tempVal,setTempVal] = useState("");
    const [enableSubmit, setEnableSubmit] = useState(false)
    const MySwal = withReactContent(Swal);
    const [dashboard, setDashboard]=useState({
        name:null,
        description:null,
        parent_menu_uid:'',
        dashboard_type:'tableau_server',
        server_uid:'',
        config_json:{
            project_id: '',
            workbook_id:'',
            view_id:'',
            view_content_url:'',
            preview_image:'',

        },
        status:'Active'
    });



    useEffect(()=>{
        apiFetch('GET',{},'/api/bi-platforms/tableau_server/Configured',{}).then(res=>{
            //Read only resource since we are receiving a collection
            setServers(_.map(res.data.platforms, 'resource'));
        });

    },[]);


    const handleChange = (e,node)=>{
        e.preventDefault();
        dashboard[e.target.id] = e.target.value === ''?null:e.target.value;
        setDashboard(dashboard);
        setTempVal(e.target.value);
        setEnableSubmit(formValidation(dashboard))
    }

    const handleServerChange = (event,node) => {
        event.preventDefault();
        dashboard.server_uid = node.props.value;
        dashboard.config_json.project_id = '';
        dashboard.config_json.workbook_id = '';
        dashboard.config_json.view_id = '';
        setDashboard(dashboard);
        apiFetch('POST',{},'/api/tableau/projects',{id:node.props.value}).then(res=>{
            setProjects(res.data.message.projects);
        });
        setEnableSubmit(formValidation(dashboard))
    };

    const handleProjectChange = (event,node) => {
        event.preventDefault();
        dashboard.config_json.project_id = node.props.value;
        dashboard.config_json.workbook_id = '';
        dashboard.config_json.view_id = '';
        setDashboard(dashboard);
        apiFetch('POST',{},'/api/tableau/workbooks',{id:dashboard.server_uid,project:node.props.name}).then(res=>{
            setWorkbooks(res.data.message.workbooks);
        })
        setEnableSubmit(formValidation(dashboard))
    };

    const handleWorkbookChange = (event,node) => {
        event.preventDefault();
        dashboard.config_json.workbook_id = node.props.value;
        dashboard.config_json.view_id = '';
        setDashboard(dashboard);
        apiFetch('POST',{},'/api/tableau/workbook-views',{id:dashboard.server_uid,workbook:node.props.value}).then(res=>{
            setViews(res.data.message.views);
        })
        setEnableSubmit(formValidation(dashboard))
    };
    const handleViewChange = (event,node) => {
        event.preventDefault();
        dashboard.config_json.view_id = node.props.value;
        dashboard.config_json.view_content_url = node.props.contentUrl.replace('/sheets/','/');

        apiFetch('POST',{},'/api/tableau/workbook-view-image',{id:dashboard.server_uid,view:node.props.value}).then(res=>{
            if(res.data.message.type !== 'success'){
                dashboard.config_json.preview_image =" data:image/png;base64,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";
            }else{
                dashboard.config_json.preview_image = res.data.message.image
            }
            setDashboard(dashboard);
            setImage(res.data.message.image);
        })
        setEnableSubmit(formValidation(dashboard))
    };

    const setSelectedItems = (items) => {
        dashboard.parent_menu_uid = items[0];
        setDashboard(dashboard);
        setTempVal(items[0]);
        setEnableSubmit(formValidation(dashboard))
    }

    const formValidation = (dashboard = dashboard)=>{
        return Object.keys(validate(dashboard)).length === 0;
    }

    const handleSubmit = () =>{
        if(formValidation && Object.keys(validate(dashboard)).length === 0){
            console.log(dashboard)
            apiFetch('POST',{},'/api/bi-dashboards',dashboard).then(res=>{
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
                {dashboard.parent_menu_uid}
                <Grid container item xs={6}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                >
                    <Grid item xs={6}                    >
                        <Card.Title as="h5"><Typography sx={{fontSize:'18px',color:'#992E62', fontWeight:'bolder'}}>Tableau Server Dashboard</Typography></Card.Title>
                    </Grid>

                </Grid>
            </Card.Header>
            <Card.Body>
                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <Item>
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
                                            id="select-server"
                                            value={dashboard.server_uid}
                                            onChange={(e,node)=>handleServerChange(e,node)}
                                            renderValue={(selected,node) => {
                                                if (selected.length === 0) {
                                                    return <>Select Server</>;
                                                }
                                                return _.find(servers,{id:dashboard.server_uid}).name;
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
                                            id="select-project"
                                            value={dashboard.config_json.project_id}
                                            onChange={(e,node)=>handleProjectChange(e,node)}
                                            renderValue={(selected,node) => {
                                                if (selected.length === 0) {
                                                    return <>Select Project</>;
                                                }
                                                return _.find(projects,{id:dashboard.config_json.project_id}).name;
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

                                <Form.Group as={Row} controlId="workbooks">
                                    <Form.Label  column sm={3}>
                                        Workbooks
                                        {formErrors.workbook &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.workbook}</FormHelperText>
                                            </>
                                        }
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Select
                                            displayEmpty
                                            id="select-workbook"
                                            value={dashboard.config_json.workbook_id}
                                            onChange={(e,node)=>handleWorkbookChange(e,node)}
                                            renderValue={(selected,node) => {
                                                if (selected.length === 0) {
                                                    return <>Select Workbook</>;
                                                }
                                                return _.find(workbooks,{id:dashboard.config_json.workbook_id}).name;
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
                                            {workbooks.map((p)=>(
                                                <MenuItem key={p.id} value={p.id}  name={p.name}>{p.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </Col>
                                </Form.Group>


                                <Form.Group as={Row} controlId="views">
                                    <Form.Label  column sm={3}>
                                        Views
                                        {formErrors.view &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.view}</FormHelperText>
                                            </>
                                        }
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Select
                                            displayEmpty
                                            id="select-workbook"
                                            value={dashboard.config_json.view_id}
                                            onChange={(e,node)=>handleViewChange(e,node)}
                                            renderValue={(selected,node) => {
                                                if (selected.length === 0) {
                                                    return <>Select View</>;
                                                }
                                                return _.find(views,{id:dashboard.config_json.view_id}).name;
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
                                            {views.map((p)=>(
                                                <MenuItem key={p.id} value={p.id}  name={p.name} contentUrl={p.contentUrl}>{p.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="image">
                                    <Form.Label as="legend" column sm={3}>
                                        Image
                                        {formErrors.image &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.image}</FormHelperText>
                                            </>
                                        }
                                    </Form.Label>
                                    <Col sm={9}>
                                        <div className="switch d-inline m-r-10">
                                            <Item>
                                                <CardMedia
                                                    component="img"
                                                    height="auto"
                                                    image={`${dashboard.config_json.preview_image}`}
                                                    alt="preview image"
                                                />

                                            </Item>


                                        </div>

                                    </Col>
                                </Form.Group>

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
                                        <Form.Control type="text" placeholder="Name" onChange={handleChange} value={dashboard.name} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="description">
                                    <Form.Label  column sm={3}>
                                        Description
                                        {formErrors.description &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.description}</FormHelperText>
                                            </>
                                        }
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control as="textarea" rows="3" onChange={handleChange} value={dashboard.description} />
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
                                    <CustomMenuTree numberOfItems={'single'} selectedItem={setSelectedItems}  />
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
                                    onClick={()=>pageSwitch('list')}
                                >
                                    Back
                                </Button>
                            </Grid>
                            {dashboard &&
                                <Grid item xs={6} md={6}>
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
