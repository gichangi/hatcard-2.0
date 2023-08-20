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
import ImageUpload from "../../../../../components/Image/ImageUpload";

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
    if (!values.config_json.preview_image) {
        errors.preview_image = 'Required';
    }
    if (!values.config_json.public_url) {
        errors.public_url = 'Required';
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




function TabPubAdd({details,pageSwitch}) {
    const [menuTreeItems, setMenuTreeItems] = useState([]);
    const imageUploadRef = useRef(null);
    const [servers, setServers]=useState([]);
    const [image, setImage] = useState('');
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [parentMenu, setParentMenu] = useState();
    const [formErrors, setFormErrors] = useState({});
    const [defaultSwitch, setDefaultSwitch] = useState(true);
    const [tempVal,setTempVal] = useState("");
    const [enableSubmit, setEnableSubmit] = useState(false)
    const MySwal = withReactContent(Swal);
    const [dashboard, setDashboard]=useState({
        name:null,
        description:null,
        parent_menu_uid:'',
        dashboard_type:'tableau_public',
        server_uid:null,
        config_json:{
            public_url:'',
            preview_image:''
        },
        status:'Active'
    });


    useEffect(()=>{
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
    useEffect(()=>{
        if(details){
            setDashboard(details)
            setParentMenu(details.parent_menu_uid)
        }else{
            setParentMenu([])
        }
    },[]);


    const handleChange = (e,node)=>{
        e.preventDefault();
        if(e.target.id === 'public_url'){
            dashboard['config_json']['public_url'] = e.target.value === ''?null:e.target.value;
        }else{
            dashboard[e.target.id] = e.target.value === ''?null:e.target.value;
        }
        setDashboard(dashboard);
        setTempVal(e.target.value);
        setEnableSubmit(formValidation(dashboard))
    }




    const handleImageChange = (base64) => {
        dashboard.config_json.preview_image = base64;
        setDashboard(dashboard)
    }



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
                        <Card.Title as="h5"><Typography sx={{fontSize:'18px',color:'#992E62', fontWeight:'bolder'}}>Tableau Public Dashboard</Typography></Card.Title>
                    </Grid>

                </Grid>
            </Card.Header>
            <Card.Body>
                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <Item>
                            <Form>

                                <Form.Group as={Row} controlId="public_url">
                                    <Form.Label  column sm={3}>
                                        Public URL
                                        {formErrors.public_url &&
                                            <>
                                                <FormHelperText sx={{color:'red'}}>{formErrors.public_url}</FormHelperText>
                                            </>
                                        }
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="URL" onChange={handleChange} value={dashboard.config_json.public_url} />
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




                                <Form.Group as={Row} controlId="image">
                                    <Col sm={12}>
                                        <Form.Label as="legend" column sm={12}>
                                            Select Preview Image
                                            {formErrors.preview_image &&
                                                <>
                                                    <FormHelperText sx={{color:'red'}}>{formErrors.preview_image}</FormHelperText>
                                                </>
                                            }
                                        </Form.Label>
                                        <Col sm={12}>
                                            <div className="switch d-inline m-r-10">
                                                <ImageUpload ref={imageUploadRef} imageBase64={handleImageChange} defaultImage={dashboard.config_json.preview_image}/>
                                            </div>

                                        </Col>


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
                                    {parentMenu &&
                                        <CustomMenuTree menuTreeItems={menuTreeItems} orderField={'order_id'} numberOfItems={'single'} selectedItem={setSelectedItems} selectLevels={['group','collapse']}  defaultSelected={[parentMenu]} />
                                    }
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

export default TabPubAdd;




