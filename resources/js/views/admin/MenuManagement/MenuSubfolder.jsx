import Grid from "@mui/material/Grid";
import {Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import ImageUpload from "../../../components/Image/ImageUpload";
import {FormHelperText, MenuItem, Select} from "@mui/material";
import {apiFetch} from "../../../assets/api/utils";


const validate = (values) => {
    const errors = {};
    if(values.parent_id === null){
        errors.parent = 'Select valid parent'
    }
    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length > 10) {
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


function MenuSubfolder({updateFormData,setFormValidate}) {
    const [defaultSwitch, setDefaultSwitch] = useState(true);
    const [parentName, setParentName] = useState("");
    const [parentId,setParentId] = useState("");
    const [menuGroups,setMenuGroups] = useState([]);
    const [tempVal,setTempVal] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [dataTemplate,setDataTemplate]=useState({
        parent_id:null,
        name:null,
        description:null,
        menu_icon:null,
        menu_type:'sub-folder',
        menu_category:'custom-sub-folder',
        status:true,
        save:false
    });

    const updateFormHelperText = () =>{
        setFormErrors(validate(dataTemplate));
    }


    const toggleHandler = () => {
        setDefaultSwitch((prevState) => !prevState);
        dataTemplate.status =  defaultSwitch;
        updateFormData(dataTemplate);
    };
    const handleChange = (e)=>{
        /*   dataTemplate = tempTT;*/
        e.preventDefault();
        dataTemplate[e.target.id] = e.target.value === ''?null:e.target.value;
        setDataTemplate(dataTemplate);
        setTempVal(e.target.value);

        updateFormData(dataTemplate)
    }
    useEffect(()=>{
        let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
        let headers = {
            "Accept": "application/json",
            "Authorization": `Bearer ${autStore.token}`
        }
        apiFetch('GET',headers,'/api/menu-groups',{}).then(res=>{
            setMenuGroups(res.data.menu_groups);
            setFormValidate({"validate":validate,'updateFormHelperText':updateFormHelperText})
        })

    },[]);

    const handleImageChange = (base64) => {
        setTempVal(base64);
        dataTemplate.menu_icon = base64;
        updateFormData(dataTemplate)
    }
    const handleParentChange = (event,node) => {
        event.preventDefault();
        dataTemplate.parent_id = node.props.value;
        setParentName(node.props.name);
        setParentId(node.props.value);
        updateFormData(dataTemplate)

    };

    return (
        <Grid item xs={6}>
            <Form>
                <Form.Group as={Row} controlId="parent">
                    <Form.Label  column sm={3}>
                        Parent
                    </Form.Label>
                    <Col sm={9}>
                        <Select
                            displayEmpty
                            id="select-menu-type-select"
                            value={parentId}
                            onChange={(e,node)=>handleParentChange(e,node)}
                            renderValue={(selected,node) => {
                                if (selected.length === 0) {
                                    return <>Select Parent</>;
                                }
                                return parentName;
                            }}
                            MenuProps={{
                                sx: {
                                    "&& .MuiMenuItem-root": {
                                        color: "rgba(0, 0, 0, 0.6)",
                                        fontWeight:'500 !important'
                                    }
                                }
                            }}
                            sx={{
                                color:'rgba(0, 0, 0, 0.7)',
                                /*fontWeight:'bold',*/
                                minWidth: 300,
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ddd',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ddd',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ddd',
                                },
                            }}
                        >
                            {menuGroups.map(group => (
                                <MenuItem key={group.id} value={group.id}  name={group.name}>{group.name}</MenuItem>
                            ))}
                        </Select>
                    </Col>
                </Form.Group>
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
                        <Form.Control type="text" placeholder="Title" onChange={handleChange} />
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
                        <Form.Control as="textarea" rows="3" onChange={handleChange} />
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
                            <ImageUpload imageBase64={handleImageChange}/>
                        </div>

                    </Col>
                </Form.Group>
            </Form>
        </Grid>
    );
}

export default MenuSubfolder;
