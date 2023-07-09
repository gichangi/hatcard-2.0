import {useRef, useState} from 'react';
import { render } from 'react-dom';
import { Editor } from "@tinymce/tinymce-react";
import '../../../../assets/tinymce/tinymce.min.js';
import DeleteIcon from '@mui/icons-material/Delete';
import {apiFetch} from "../../../../assets/api/utils";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {Col, Form, Row} from "react-bootstrap";
import {Button, FormHelperText} from "@mui/material";
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
    const [editorContent, setEditorContent] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [enableSubmit, setEnableSubmit] = useState(true)
    const [dashboard, setDashboard]=useState({
        name:null,
        description:null,
        parent_menu_uid:'',
        dashboard_type:'html_page',
        config_json:{
            html_code:'',
            preview_image:''
        },
        status:'Active'
    });


    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const formValidation = (dashboard = dashboard)=>{
        return Object.keys(validate(dashboard)).length === 0;
    }

    const handleSubmit = () => {
        dashboard.config_json.html_code = editorRef.current.getContent()
        console.log(dashboard)
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
       // setEnableSubmit(formValidation(dashboard))
    }
    const setSelectedItems = (items) => {
        dashboard.parent_menu_uid = items[0];
        setDashboard(dashboard)
        //setEnableSubmit(formValidation(dashboard))
    }
    const handleImageChange = (base64) => {
        dashboard.config_json.preview_image = base64;
        setDashboard(dashboard)
        //setEnableSubmit(formValidation(dashboard))
    }
    return (
        <>
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
                                <CustomMenuTree numberOfItems={'single'} selectedItem={setSelectedItems}  />
                            </Col>
                        </Form.Group>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <Editor
                            /*tinymceScriptSrc='../../../../assets/tinymce/tinymce.min.js'*/
                            ref={editorRef}
                            disabled={false}
                            initialValue='test initialValue'
                            inline={false}
                            plugins=''
                            tagName='div'
                            textareaName=''
                            toolbar=''
                            value=''
                            outputFormat='html'
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
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
/*                                setup: function (editor) {
                                    editor.ui.registry.addButton("saveBTN", {
                                        icon: 'comment-add',
                                        text: "Save",
                                        classes: 'ampforwp-copy-content-button ',
                                        onAction: onSaveClick
                                    });
                                    editor.ui.registry.addButton("backBTN", {
                                        icon: 'undo',
                                        text: "Back",
                                        onAction: onPageSwitch
                                    });
                                },
                                toolbar1: "saveBTN| backBTN",
                                toolbar_groups: {
                                    formatting: {
                                        icon: 'bold',
                                        tooltip: 'Formatting',
                                        items: 'bold italic underline | superscript subscript'
                                    }
                                }*/
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
