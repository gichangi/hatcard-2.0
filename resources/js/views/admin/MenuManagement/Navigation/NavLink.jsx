import Grid from "@mui/material/Grid";
import {Col, Form, Row} from "react-bootstrap";
import {useEffect, useState, useRef} from "react";
import ImageUpload from "../../../../components/Image/ImageUpload";
import {FormHelperText, MenuItem, Select, Typography} from "@mui/material";
import {apiFetch} from "../../../../assets/api/utils";
import IconPicker from "../../../../components/IconPicker";
import _ from "lodash";



const validate = (values) => {
    const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    const errors = {};

    if(values.menu_url !== null){
/*        if(!httpRegex.test(values.menu_url)){
            errors.menu_url = 'Enter a valid link URL';
        }*/
        //errors.menu_url = 'Enter a valid link URL';

    }else if(values.menu_url === null){
        errors.menu_url = 'Link URL is required';
    }


    if(values.parent_id === null){
        errors.parent = 'Select valid parent'
    }
    if (!values.name) {
        errors.name = 'Requiredx';
    } else if (values.name.length > 200) {
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


function NavLink({updateFormData,setFormValidate,formData}) {
    const imageUploadRef = useRef(null);
    const [defaultSwitch, setDefaultSwitch] = useState(true);
    const [parentName, setParentName] = useState("");
    const [parentId,setParentId] = useState("");
    const [menuItems,setMenuItems] = useState([]);
    const [menuGroups,setMenuGroups] = useState([]);
    const [tempVal,setTempVal] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [dataTemplate,setDataTemplate]=useState({
        data:{
            parent_id:null,
            name:null,
            description:null,
            menu_icon:'fa fa-wrench',
            menu_image:null,
            menu_url:null,
            menu_type:'item',
            menu_category:'custom',
            order_id:1,
            status:'active'
        },
        childItems: []
    });



    const updateFormHelperText = () =>{
        setFormErrors(validate(dataTemplate));
    }


    const toggleHandler = () => {
        setDefaultSwitch((prevState) => !prevState);
        dataTemplate.data.status =  !defaultSwitch?"active":"inactive";
        updateFormData(dataTemplate);
    };
    const handleChange = (e)=>{
        e.preventDefault();
        dataTemplate.data[e.target.id] = e.target.value === ''?null:e.target.value;
        setDataTemplate(dataTemplate);
        setTempVal(e.target.value);

        updateFormData(dataTemplate)
    }
    useEffect(()=>{
        setFormValidate({"validate":validate,'updateFormHelperText':updateFormHelperText})
        let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
        let headers = {
            "Accept": "application/json",
            "Authorization": `Bearer ${autStore.token}`
        }
        let menu_items;
        apiFetch('GET',headers,'/api/menu-items',{}).then(res=>{
            console.log('res.data.menu_items')
            console.log(res.data.menu_items)
            console.log('res.data.menu_items')
            menu_items = res.data.menu_items;
            setMenuItems(res.data.menu_items);
            setMenuGroups(res.data.menu_items);
        }).then(()=>{
            if(formData!=null) {
                setDataTemplate({
                    data: {
                        id: formData.id,
                        name: formData.name,
                        description: formData.description,
                        menu_url: formData.menu_url,
                        menu_image: formData.menu_image,
                        menu_icon:formData.menu_icon,
                        parent_id:formData.parent_id,
                        menu_type: 'item',
                        menu_category: formData.menu_category,
                        order_id: formData.order_id,
                        status: formData.status
                    },
                    childItems: []
                });
                setDefaultSwitch(formData.status==='active'?true:false);

                setParentName(_.find(menu_items, {id:formData.parent_id}).name);
                setParentId(formData.parent_id);
            }
        })
    },[]);

    const handleImageChange = (base64) => {
        setTempVal(base64);
        dataTemplate.data.menu_image = base64;
        updateFormData(dataTemplate)
    }
    const handleIconChange = (icon) =>{
        setTempVal(icon);
        dataTemplate.data.menu_icon = icon;
        updateFormData(dataTemplate)
    }
    const handleParentChange = (event,node) => {
        event.preventDefault();
        dataTemplate.data.parent_id = node.props.value;
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
                                minWidth: '100%',
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

                <Form.Group as={Row} controlId="icon">
                    <Form.Label  column sm={3}>
                        Link Icon
                    </Form.Label>
                    <Col sm={9}>
                        <Grid container spacing={0}  direction="row" justifyContent="flex-start" alignItems="center">
                            <Grid item xs={1}>
                                <IconPicker selectedIcon={handleIconChange}/>
                            </Grid>
                            <Grid item xs={10} sx={{border:'solid 2px #eee',marginLeft:'12px',height:'50px'}}>
                                <Typography variant="h5" component="div" gutterBottom sx={{color:'rgb(79, 79, 79)',paddingTop:'15px', fontSize:'14px'}}>
                                    {dataTemplate.data.menu_icon}
                                </Typography>
                            </Grid>
                        </Grid>

                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="menu_url">
                    <Form.Label  column sm={3}>
                        Menu Url
                        {formErrors.menu_url &&
                            <>
                                <FormHelperText sx={{color:'red'}}>{formErrors.menu_url}</FormHelperText>
                            </>
                        }
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder="URL" onChange={handleChange} value={dataTemplate.data.menu_url} />
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
                        <Form.Control type="text" placeholder="Title" onChange={handleChange} value={dataTemplate.data.name} />
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
                        <Form.Control as="textarea" rows="3" onChange={handleChange} value={dataTemplate.data.description} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label as="legend" column sm={3}>
                        Status
                    </Form.Label>
                    <Col sm={9}>
                        <div className="switch d-inline m-r-10">
                            <Form.Control type="checkbox"  id="checked-default" defaultChecked={defaultSwitch} onChange={toggleHandler} />
                            <Form.Label htmlFor="checked-default" className="cr" />
                        </div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="menu_icon">
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
                            <ImageUpload ref={imageUploadRef} imageBase64={handleImageChange} defaultImage={dataTemplate.data.menu_image}/>
                        </div>

                    </Col>
                </Form.Group>
            </Form>
        </Grid>
    );
}

export default NavLink;
