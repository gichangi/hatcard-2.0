import {useEffect, useRef, useState} from 'react';
import { Editor } from "@tinymce/tinymce-react";
import '../../../../assets/tinymce/tinymce.min.js';
import './style.css';
import {apiFetch} from "../../../../assets/api/utils";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {Card, Col, Form, Row} from "react-bootstrap";
import {Button, FormHelperText, Typography} from "@mui/material";
import CustomMenuTree from "../../../../components/MenuTree/CustomMenuTree";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MySwal from "sweetalert2";
import ImageUpload from "../../../../components/Image/ImageUpload";


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
    if (!values.config_json.html_code) {
        errors.html_code = 'Required';
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

function Index({details,pageSwitch}) {
    const editorRef = useRef(null);
    const imageUploadRef = useRef(null);
    const [editorContent, setEditorContent] = useState(null);
    const [menuTreeItems, setMenuTreeItems] = useState([]);
    const [temps, setTemps] = useState(null);
    const [parentMenu, setParentMenu] = useState();
    const [formErrors, setFormErrors] = useState({});
    const [enableSubmit, setEnableSubmit] = useState(false)
    const [dashboard, setDashboard]=useState({
        name:null,
        description:null,
        parent_menu_uid:null,
        dashboard_type:'html_dashboard',
        config_json:{
            html_code:'',
            preview_image:''
        },
        status:'Active'
    });

    useEffect(()=>{
        if(details !== undefined && details !== null){
            setDashboard(details)
            setEditorContent(details.config_json.html_code);
            setParentMenu(details.parent_menu_uid)
        }else{
            setParentMenu([])
        }
    },[])

    const formValidation = (dashboard = dashboard)=>{
        return Object.keys(validate(dashboard)).length === 0;
    }
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
    },[])
    const handleSubmit = () => {
        dashboard.config_json.html_code = editorRef.current.getContent()
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
        console.log()
       // setEditorContent(editorRef.current.getContent());
    };
    const handleChange = (e,node)=>{
        e.preventDefault();
        dashboard[e.target.id] = e.target.value === ''?null:e.target.value;
        setDashboard(dashboard);
        setTemps(e.target.value);
        setEnableSubmit(formValidation(dashboard))
    }
    const setSelectedItems = (items) => {
        dashboard.parent_menu_uid = items[0];
        setDashboard(dashboard)
        setEnableSubmit(formValidation(dashboard))
    }
    const handleImageChange = (base64) => {
        dashboard.config_json.preview_image = base64;
        setDashboard(dashboard)
        setEnableSubmit(formValidation(dashboard))
    }
    const handleEditorChange = (text) =>{
        dashboard.config_json.html_code = text;
        setDashboard(dashboard)
        setEnableSubmit(formValidation(dashboard))
    }

    return (
        <>
            <Grid container item xs={6}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
            >
                <Grid item xs={6}                    >
                    <Card.Title as="h5"><Typography sx={{fontSize:'18px',color:'#992E62', fontWeight:'bolder'}}>HTML Dashboard</Typography></Card.Title>
                </Grid>

            </Grid>
            <Grid container spacing={2}>

                <Grid item xs={6}>
                    <Item>
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
                                    <Form.Control type="text" placeholder="Description" onChange={handleChange} value={dashboard.description} />
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row} controlId="image">
                                <Col sm={12}>
                                    <Form.Label as="legend" column sm={12}>
                                        Preview Image
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
                                    <CustomMenuTree title={"Menu Tree"} menuTreeItems={menuTreeItems} orderField={'created_at'} numberOfItems={'single'} selectedItem={setSelectedItems} selectLevels={[]} defaultSelected={[parentMenu]}  />

                                }


                            </Col>
                        </Form.Group>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        {formErrors.html_code &&
                            <>
                                <FormHelperText sx={{color:'red'}}>{formErrors.html_code}</FormHelperText>
                            </>
                        }
                        <Editor
                            /*tinymceScriptSrc='../../../../assets/tinymce/tinymce.min.js'*/
                            apiKey='7d40xxgpm87kfu0rjpjxgzpo79uoa8hpr5lvyixjyqu9ki3z'
                            ref={editorRef}
                            disabled={false}
                            initialValue={editorContent}
                            inline={false}
                            plugins=''
                            tagName='div'
                            textareaName=''
                            toolbar=''
                            onEditorChange={(newText) => handleEditorChange(newText)}
                            outputFormat='html'
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
                                extended_valid_elements: '+*[*]',
                                valid_children : "+body[style],+body[br]",
                                height: '80vh',
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'+
                                    '.ampforwp-copy-content-button {color:red,background:blue}',
                            }}
                        />
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <Grid container spacing={0}>
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
                    </Item>
                </Grid>

            </Grid>

        </>
    );
}

export default Index;
