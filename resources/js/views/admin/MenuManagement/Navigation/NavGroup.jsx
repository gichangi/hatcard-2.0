import Grid from "@mui/material/Grid";
import {Col, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import ImageUpload from "../../../../components/Image/ImageUpload";
import {FormHelperText, MenuItem, Select, Typography} from "@mui/material";
import {apiFetch} from "../../../../assets/api/utils";



const validate = (values) => {
    const errors = {};
    if(values.parent_id === null){
        errors.parent = 'Select valid parent'
    }
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

    if (values.menu_icon === null ||values.menu_icon === '' ) {
        errors.menu_icon = 'Required';
    }

    return errors;
};


function NavGroup({updateFormData,setFormValidate,formData}) {
    const imageUploadRef = useRef(null);
    const [defaultSwitch, setDefaultSwitch] = useState(true);
    const [parentName, setParentName] = useState("");
    const [parentId,setParentId] = useState("");
    const [tempVal,setTempVal] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [dataTemplate,setDataTemplate]=useState({
        name:null,
        description: null,
        menu_url:"#",
        menu_image: null,
        menu_type:'group',
        menu_category:'system-group',
        order_id:1,
        status:'active'
    });

    const updateFormHelperText = () =>{
        setFormErrors(validate(dataTemplate));
    }

    useEffect(()=>{
        setFormValidate({"validate":validate,'updateFormHelperText':updateFormHelperText});
        if(formData!=null){
            setDataTemplate({
                id:formData.id,
                name:formData.name,
                description:formData.description,
                menu_url:"#",
                menu_image:formData.menu_image,
                menu_type:'group',
                menu_category:'system-group',
                order_id:1,
                status:formData.status
            });
        }


    },[]);


    const toggleHandler = () => {
        setDefaultSwitch((prevState) => !prevState);
        dataTemplate.status =  defaultSwitch;
        updateFormData(dataTemplate);
    };
    const handleChange = (e)=>{
        e.preventDefault();
        dataTemplate[e.target.id] = e.target.value === ''?null:e.target.value;
        setDataTemplate(dataTemplate);
        setTempVal(e.target.value);

        updateFormData(dataTemplate)
    }
    const handleImageChange = (base64) => {
        setTempVal(base64);
        dataTemplate.menu_image = base64;
        updateFormData(dataTemplate)
    }

    return (
        <Grid item xs={6}>
            <Form>
                <Form.Group as={Row} controlId="name">
                    <Form.Label  column sm={3}>
                        Title
                        {formErrors.name &&
                            <>
                                <FormHelperText sx={{color:'red'}}>{formErrors.name}</FormHelperText>
                            </>
                        }
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder="Title" onChange={handleChange} value={dataTemplate.name} />
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
                        <Form.Control as="textarea" rows="3" onChange={handleChange} value={dataTemplate.description} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label as="legend" column sm={3}>
                        Status
                    </Form.Label>
                    <Col sm={9}>
                        <div className="switch d-inline m-r-10">
                            <Form.Control type="checkbox"  id="checked-default" defaultChecked={defaultSwitch} onChange={() => toggleHandler} />
                            <Form.Label htmlFor="checked-default" className="cr" />
                        </div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="menu_url">
                    <Form.Label as="legend" column sm={3}>
                        Image
                        {formErrors.menu_icon &&
                            <>
                                <FormHelperText sx={{color:'red'}}>{formErrors.menu_icon}</FormHelperText>
                            </>
                        }
                    </Form.Label>
                    <Col sm={9}>
                            <div className="switch d-inline m-r-10">
                                <ImageUpload ref={imageUploadRef} imageBase64={handleImageChange} defaultImage={dataTemplate.menu_image}/>
                            </div>

                    </Col>
                </Form.Group>
            </Form>
        </Grid>
    );
}

export default NavGroup;
