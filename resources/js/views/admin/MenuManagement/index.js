import { useMemo, useRef, useState, useEffect } from 'react';
import {apiFetch} from "../../../assets/api/utils";
import {connect} from "react-redux";
import MaterialReactTable from 'material-react-table';
import {Col, Row} from "react-bootstrap";
import Card from "../../../components/Card/MainCard";
import './custom-css.css'
import Box from "@mui/material/Box";
import {Button, IconButton, MenuItem, Tooltip} from "@mui/material";

function index(props) {
    const[menuItems, setMenuItems] = useState([]);
    //optionally, you can manage any/all of the table state yourself
    const [rowSelection, setRowSelection] = useState({});
    //Or, optionally, you can get a reference to the underlying table instance
    const tableInstanceRef = useRef(null);


    useEffect(()=>{
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
        }else{

        }

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
                    { text: 'Male', value: 'Male' },
                    { text: 'Female', value: 'Female' },
                    { text: 'Other', value: 'Other' },
                ],
                filterVariant: 'select',
            },
            {
                accessorKey: 'menu_category',
                header: 'Category'
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




    return (
        <div>
            <Row>
                <Col>
                    <MaterialReactTable
                        columns={columns}
                        data={menuItems}
                        enableColumnActions={false}
                        enablePagination={false} //disable a default feature
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
                        renderRowActionMenuItems={({row, closeMenu}) => [
                            <MenuItem key={1} onClick={() => {
                                console.info('View Profile', row);
                                console.info('View Profile', row.original.name);
                                closeMenu();
                            }}>
                                View Profile {row.original.name}
                            </MenuItem>,
                            <MenuItem key={2} onClick={() => {
                                console.info('Remove', row);
                                closeMenu();
                            }}>
                                 Remove
                            </MenuItem>,
                            <MenuItem key={3} onClick={() => {
                                console.info('Share', row);
                                closeMenu();
                            }}>
                                 Share
                            </MenuItem>
                        ]}



                    />
                </Col>
            </Row>

        </div>
    );
}

const mapStateToProps = state => {
    return {
        reduxStore: state
    };
};
export default connect(mapStateToProps)(index);
