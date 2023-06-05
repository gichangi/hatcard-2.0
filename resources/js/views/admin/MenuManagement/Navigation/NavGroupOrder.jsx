import Grid from "@mui/material/Grid";
import {Col, Form, Row} from "react-bootstrap";
import {useEffect, useState,useRef} from "react";
import {Button, FormHelperText, MenuItem, Select, Typography} from "@mui/material";
import {apiFetch} from "../../../../assets/api/utils";
import _ from 'lodash';
import {styled} from "@mui/material/styles";
import {DataGridPro as MuiDataGrid} from "@mui/x-data-grid-pro/DataGridPro/DataGridPro";
import MySwal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import ReplyIcon from "@mui/icons-material/Reply";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

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

function NavGroupOrder({pageSwitch}) {
    const [menuGroups, setMenuGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const MySwal = withReactContent(Swal);


    useEffect(()=>{
        let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
        let headers = {
            "Accept": "application/json",
            "Authorization": `Bearer ${autStore.token}`
        }
        //Fetch group type menu items
        apiFetch('GET',headers,'/api/menu-items',{}).then(res=>{
            setMenuGroups(_.orderBy(_.filter( res.data.menu_items, item => item.menu_type === 'group' ),['order_id'],['asc']));
            setLoading(false);
        })
    },[]);

    const handleRowOrderChange = async (params) => {
        setLoading(true);
        const newRows = await updateRowPosition(
            params.oldIndex,
            params.targetIndex,
            menuGroups,
        );
        //Push new order id
        newRows.map((i,v)=>{
            i.order_id = v+1
        })
        setMenuGroups(newRows);
        setLoading(false);
    };


    const handleSubmit = () =>{
        let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
        let headers = {
            "Accept": "application/json",
            "Authorization": `Bearer ${autStore.token}`
        }
        apiFetch('POST',headers,'/api/menu-groups/order',menuGroups).then(res=>{
            if(res.data.message.type === 'success'){
                MySwal.fire('', 'Successfully Saved!', 'success').then(()=>{
                    pageSwitch()
                });
            }else{
                MySwal.fire('', 'An error occurred while saving the data', 'error');
            }
        })

    }

    return (
        <Grid container item xs={12}
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{padding:'20px'}}
        >
            <Grid item xs={6}>
                <Form>
                    <Form.Group as={Row} >
                        <Form.Label as="legend" column sm={2}>

                        </Form.Label>
                        <Col sm={9}>
                            <div className="switch d-inline m-r-10">
                                <Typography variant="h6" component="h6" sx={{ fontWeight:'bold',fontSize:'18px',color:'rgb(15, 105, 125)', paddingBottom:'10px'}}>
                                    Menu Groups
                                </Typography>
                                <DataGrid
                                    loading={loading}
                                    columns={columns}
                                    rows={menuGroups}
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
                </Form>
            </Grid>
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
                                onClick={()=>pageSwitch()}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Box display="flex" justifyContent="flex-end" >
                                <Button
                                    variant="contained"
                                    sx={{
                                        fontSize:'14px',
                                        fontWeight:'bolder',
                                        backgroundColor:'#0E6073',
                                        "&:hover": {
                                            background: "red",
                                            color: "white"
                                        }
                                    }}
                                    startIcon={<ControlPointIcon />}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>

                            </Box>
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>

        </Grid>

    );
}

export default NavGroupOrder;
