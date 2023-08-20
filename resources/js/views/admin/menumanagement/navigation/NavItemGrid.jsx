import { useMemo, useRef, useState, useEffect } from 'react';
import {apiFetch} from "../../../../assets/api/utils";
import {connect} from "react-redux";
import MaterialReactTable from 'material-react-table';
import {Col, Row} from "react-bootstrap";
import Card from "../../../../components/Card/MainCard";
import '../custom-css.css'
import Box from "@mui/material/Box";
import {Button, IconButton, MenuItem, Tooltip} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {updateMenuTree} from "../../../../actions/user";

function NavItemGrid(props) {
    const[menuItems, setMenuItems] = useState([]);
    //optionally, you can manage any/all of the table state yourself
    const [rowSelection, setRowSelection] = useState({});
    //Or, optionally, you can get a reference to the underlying table instance
    const tableInstanceRef = useRef(null);
    const MySwal = withReactContent(Swal);

    const sweetAlertHandler = (alert) => {
        MySwal.fire({
            title: alert.title,
            text: alert.text,
            type: alert.type
        });
    };

    const fetchMenuItems = () =>{
        let localStore = JSON.parse(localStorage.getItem('hatcard.auth'))||1;
        if(localStore !== 1){
            let headers =  {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStore.token}`
            };
            apiFetch('get',headers,'/api/menu-items',{}).then(res=>{
                let menus = res.data.menu_items;
                setMenuItems(menus);
                ///setMenuColumns(Object.keys(menus[0]))
            })
        }
    }

    useEffect(()=>{
        fetchMenuItems();
    },[]);





    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //simple recommended way to define a column
                header: 'Name'
            },
            {
                accessorKey: 'menu_type',
                header: 'Type',
                filterFn: 'equals',
                filterSelectOptions: [
                    { text: 'Group', value: 'Group' },
                    { text: 'Collapse', value: 'Collapse' },
                    { text: 'Item', value: 'Item' },
                ],
                filterVariant: 'select',
            },
            {
                accessorKey: 'menu_category',
                header: 'Category',
                filterFn: 'equals',
                filterSelectOptions: [
                    { text: 'System', value: 'System' },
                    { text: 'Custom', value: 'Custom' }
                ],
                filterVariant: 'select',
            },
            {
                accessorKey: 'status',
                header: 'Status',
            },
            {
                accessorFn: (row) => new Date(row.updated_at).toLocaleDateString('en-GB'), //alternate way
                id: 'updated_at', //id required if you use accessorFn instead of accessorKey
                header: 'Last Updated',
            }
        ],
        [],
    );



    useEffect(() => {
        //do something when the row selection changes
    }, [rowSelection]);



    const someEventHandler = () => {
        //read the table state during an event from the table instance ref
        console.log(tableInstanceRef.current.getState().sorting);
    }

    const menuDelete = (row) =>{
        let localStore = JSON.parse(localStorage.getItem('hatcard.auth'))||1;
        if(localStore !== 1){
            let headers =  {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStore.token}`
            };
            apiFetch('delete',headers,'/api/menu-items',{id:row.id}).then(res=>{
                if(res.data.message.type === 'success'){
                    MySwal.fire('', `You have successfully deleted: ${row.name} !`, 'success').then(()=>{
                        fetchMenuItems();
                        props.updatemenutree();
                    })
                }else{
                    MySwal.fire('', 'An error occurred while saving the data', 'error');
                }
            })
        }
    }



    return (
        <div>
            <Row>
                <Col>
                    <MaterialReactTable
                        columns={columns}
                        data={menuItems}
                        enableColumnActions={false}
                        onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
                        state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
                        tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
                        muiTableHeadCellProps={{
                            sx: {
                                '& .Mui-TableHeadCell-Content': {
                                    fontSize:'16px',
                                    color: '#992E62'
                                },
                            },
                        }}
                        muiTableHeadCellFilterTextFieldProps={{
                            sx: { m: '1rem 0', width: '100%',fontSize:'12px',
                                '& .MuiInputBase-root': {
                                    color: '#0E6073',
                                    fontSize:'12px',
                                    fontWeight:'bold',
                                    opacity:0.9
                                },
                                '& .MuiBox-root': {
                                    color: '#0E6073',
                                    fontSize:'12px',
                                    fontWeight:'bold',
                                    opacity:0.9
                                },
                                input: {
                                    color: '#992E62',
                                    "&::placeholder": {    // <----- Add this.
                                        opacity: 0.9,
                                        color: '#0E6073',
                                    }
                                }
                            },
                            variant: 'outlined'
                        }}
                        enableRowActions
                        positionActionsColumn="last"
                        renderRowActionMenuItems={({row, closeMenu}) => {
                            let dropDownItems = [
                                <MenuItem key={1}
                                          onClick={() => {
                                              props.pageSwitch('crud',row.original);
                                              closeMenu();
                                          }}
                                          sx={{
                                              width:'140px'
                                          }}
                                >
                                    <VisibilityIcon/>&nbsp; View
                                </MenuItem>,
                                <MenuItem key={2} onClick={() => {
                                    console.info('Remove', row);
                                    menuDelete(row.original);
                                    closeMenu();
                                }}>
                                    <DeleteIcon/> &nbsp; Delete
                                </MenuItem>,
                                <MenuItem key={3} onClick={() => {
                                    closeMenu();
                                }}>
                                    {row.original.status === 'active' &&
                                        <>
                                            <DoDisturbIcon/>&nbsp; Disable
                                        </>
                                    }
                                    {row.original.status !== 'active' &&
                                        <>
                                            <DoDisturbIcon/>&nbsp; Enable
                                        </>
                                    }
                                </MenuItem>
                            ];
                            if(row.original.menu_category === 'system'){
                                //Remove delete and disable from dropdown options
                                dropDownItems.pop();
                                dropDownItems.pop();
                            }
                            return dropDownItems;
                        }}
                        initialState={{
                            pagination: {
                                pageSize: 5,
                                pageIndex: 0
                            }
                        }} muiTablePaginationProps={{
                        rowsPerPageOptions: [5, 10, 20],
                        showFirstButton: false,
                        showLastButton: false,
                        SelectProps: {
                            native: true
                        },
                        labelRowsPerPage: 'Number of rows visible'
                    }}


                        //add custom action buttons to top-left of top toolbar
                        renderTopToolbarCustomActions={({ table }) => (
                            <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddCircleIcon />}
                                    onClick={() => {
                                        props.pageSwitch('crud');
                                    }}
                                    sx={{
                                        fontWeight:'bolder',
                                        "&:hover": {
                                            background: "rgb(153, 46, 98)",
                                            color: "white"
                                        }
                                    }}
                                >
                                    Menu
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<AddCircleIcon />}
                                    onClick={() => {
                                        props.pageSwitch('order');
                                    }}
                                    sx={{
                                        fontWeight:'bolder',
                                        backgroundColor:'rgb(15, 105, 125)',
                                        "&:hover": {
                                            background: "rgb(153, 46, 98)",
                                            color: "white"
                                        }
                                    }}
                                >
                                    Order Groups
                                </Button>
                            </Box>
                        )}


                    />
                </Col>
            </Row>

        </div>
    );
}

const mapActionToProps = {
    updatemenutree:updateMenuTree,
};

const mapStateToProps = state => {
    return {
        reduxStore: state
    };
};
export default connect(mapStateToProps,mapActionToProps)(NavItemGrid);
