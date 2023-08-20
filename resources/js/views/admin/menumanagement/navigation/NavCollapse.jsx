import Grid from "@mui/material/Grid";
import {Col, Form, Row} from "react-bootstrap";
import {useEffect, useState,useRef} from "react";
import ImageUpload from "../../../../components/Image/ImageUpload";
import {FormHelperText, MenuItem, Select, Typography} from "@mui/material";
import {apiFetch} from "../../../../assets/api/utils";
import IconPicker from "../../../../components/IconPicker";
import {styled} from "@mui/material/styles";
import {DataGridPro as MuiDataGrid} from "@mui/x-data-grid-pro";
import _ from 'lodash';
import CustomMenuTree from "../../../../components/MenuTree/CustomMenuTree";
import Paper from "@mui/material/Paper";

const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
    "& .MuiDataGrid-columnHeaders": { display: "none" },
    "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },
    "& .root":{height:'100px'}
}));



const columns = [
    { field: 'id', headerName: 'ID', width: 90, hideable: true },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: false,
    },
    {
        field: 'order_id',
        headerName: 'Order',
        width: 150,
        editable: false,
    }
]

function updateRowPosition(initialIndex, newIndex, rows) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const rowsClone = [...rows];
            const row = rowsClone.splice(initialIndex, 1)[0];
            rowsClone.splice(newIndex, 0, row);
            resolve(rowsClone);
        }, Math.random() * 500 + 100); // simulate network latency
    });
}

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height:'100%'
}));


function NavCollapse({updateFormData,setFormValidate,formData}) {
    const imageUploadRef = useRef(null);
    const [defaultSwitch, setDefaultSwitch] = useState(true);
    const [menuTreeItems, setMenuTreeItems] = useState([]);
    const [parentMenu, setParentMenu] = useState();
    const [menuGroups,setMenuGroups] = useState([]);
    const [tempVal,setTempVal] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [childItems,setChildItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataTemplate,setDataTemplate]=useState({
        data:{
            parent_id:null,
            name:null,
            description:null,
            menu_icon:'fa fa-wrench',
            menu_image:null,
            menu_url:"#",
            menu_type:'collapse',
            menu_category:'custom',
            order_id:10,
            status:'active'
        },
        childItems: childItems
    });

    const updateFormHelperText = () =>{
        setFormErrors(validate(dataTemplate));
    }
    const handleRowOrderChange = async (params) => {
        setLoading(true);
        const newRows = await updateRowPosition(
            params.oldIndex,
            params.targetIndex,
            childItems,
        );
        //Push new order id
        newRows.map((i,v)=>{
            i.order_id = v+1
        })
        setChildItems(newRows);
        setLoading(false);
        dataTemplate.childItems = newRows;
        updateFormData(dataTemplate);
    };

    const toggleHandler = () => {
        setDefaultSwitch((prevState) => !prevState);
        dataTemplate.data.status =  !defaultSwitch?"active":"inactive";
        updateFormData(dataTemplate);
    };
    const handleChange = (e)=>{
        /*   dataTemplate = tempTT;*/
        e.preventDefault();
        dataTemplate.data[e.target.id] = e.target.value === ''?null:e.target.value;
        setDataTemplate(dataTemplate);
        setTempVal(e.target.value);

        updateFormData(dataTemplate)
    }




    useEffect(()=>{
        setFormValidate({"validate":validate,'updateFormHelperText':updateFormHelperText});
        let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
        let headers = {
            "Accept": "application/json",
            "Authorization": `Bearer ${autStore.token}`
        }
        //Get Groups for parent of current collapse item
        apiFetch('GET',headers,'/api/menu-items',{}).then(res=>{
            setMenuGroups(_.orderBy(_.filter( res.data.menu_items, item => item.menu_type === 'group'|| item.menu_type === 'collapse'  ),['name'],['asc']));
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
        //Set data after fetching parent
        let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
        let headers = {
            "Accept": "application/json",
            "Authorization": `Bearer ${autStore.token}`
        }
        if(formData!=null && menuGroups.length > 0) {
            setDataTemplate({
                data: {
                    id: formData.id,
                    name: formData.name,
                    description: formData.description,
                    menu_url: "#",
                    menu_image: formData.menu_image,
                    menu_icon:formData.menu_icon,
                    parent_id:formData.parent_id,
                    menu_type: 'collapse',
                    menu_category: formData.menu_category,
                    order_id: formData.order_id,
                    status: formData.status
                },
                childItems: childItems
            });
            setDefaultSwitch(formData.status==='active'?true:false);
            setParentMenu(formData.parent_id)
            apiFetch('Get',headers,`/api/menu-child-items/${formData.id}`,{}).then(res =>{
                setChildItems(res.data.childItems);
                setLoading(false);
            })
        }else{
            setParentMenu([])
        }

    },[menuGroups])

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

    const setSelectedItems = (items) => {
        dataTemplate.data.parent_id = items[0] == undefined?null:items[0] ;
        console.log(dataTemplate)
        updateFormData(dataTemplate)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Form>
                    <Form.Group as={Row} controlId="parent">
                        <Form.Label  column sm={3}>
                            Menu Icon
                        </Form.Label>
                        <Col sm={9}>
                            <Grid container spacing={0}  direction="row" justifyContent="flex-start" alignItems="center">
                                <Grid item xs={1}>
                                    <IconPicker selectedIcon={handleIconChange}/>
                                </Grid>
                                <Grid item xs={11} sx={{border:'solid 2px #eee',marginLeft:'0px',height:'50px'}}>
                                    <Typography variant="h5" component="div" gutterBottom sx={{paddingLeft:'12px',color:'rgb(79, 79, 79)',paddingTop:'15px', fontSize:'14px'}}>
                                        {dataTemplate.data.menu_icon}
                                    </Typography>
                                </Grid>
                            </Grid>

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
                            <Form.Control type="text" placeholder="Title" onChange={handleChange} value={dataTemplate.data.name}/>
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
                            <Form.Control as="textarea" rows="3" onChange={handleChange} value={dataTemplate.data.description}/>
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
                                <ImageUpload ref={imageUploadRef} imageBase64={handleImageChange} defaultImage={dataTemplate.data.menu_image}/>
                            </div>

                        </Col>
                    </Form.Group>
                    {childItems.length > 0 &&
                        <Form.Group as={Row} >
                            <Form.Label as="legend" column sm={3}>

                            </Form.Label>
                            <Col sm={9}>
                                <div className="switch d-inline m-r-10">
                                    <Typography variant="h6" component="h6" sx={{ fontWeight:'bold',fontSize:'18px',color:'rgb(15, 105, 125)', paddingBottom:'10px'}}>
                                        Sub Menu Items
                                    </Typography>
                                    <DataGrid
                                        loading={loading}
                                        columns={columns}
                                        rows={childItems}
                                        rowReordering
                                        onRowOrderChange={handleRowOrderChange}
                                        columnVisibilityModel={{
                                            // Hide columns id
                                            id: false
                                        }}
                                        hideFooterSelectedRowCount
                                        hideFooterRowCount
                                        hideFooter
                                        autoHeight
                                        sx={{
                                            color:'rgba(83, 83, 83)'
                                        }}
                                    />
                                </div>
                            </Col>
                        </Form.Group>
                    }

                </Form>
            </Grid>
            <Grid item xs={6}>
                <Item>
                    <Form.Group as={Row} controlId="parent_menu_uid">
                        <Col sm={12}>
                            {formErrors.parent_id &&
                                <>
                                    <FormHelperText sx={{color:'red'}}>{formErrors.parent_id}</FormHelperText>
                                </>
                            }

                            {parentMenu &&
                                <CustomMenuTree title={"Parent Menu"} menuTreeItems={menuTreeItems} orderField={'created_at'} numberOfItems={'single'} selectedItem={setSelectedItems} selectLevels={['group','collapse']} defaultSelected={[parentMenu]}  />

                            }
                        </Col>
                    </Form.Group>
                </Item>
            </Grid>

        </Grid>

    );
}

export default NavCollapse;
