import React, {useEffect} from 'react';
import {apiFetch} from "../../../assets/api/utils";
import {useMemo, useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import MaterialReactTable from "material-react-table";
import {Button, MenuItem} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useCallback} from "react";
import MySwal from "sweetalert2";

function ListUsers(props) {
    const [users, setUsers] = useState([]);
    const tableInstanceRef = useRef(null);
    const [rowSelection, setRowSelection] = useState({});
    useEffect(()=>{
        apiFetch('GET',{},'/api/user',{}).then(res=>{
            setUsers(res.data.users);
        })
    },[])

    const handleDeleteRow = useCallback(
        (row) => {
            apiFetch('POST',{},'/api/user/archive',{id:row.getValue('id')}).then(res=>{
                if(res.data.message.type === 'success'){
                    MySwal.fire('', 'Successfully Deleted!', 'success').then(()=>{
                        users.splice(row.index, 1);
                        setUsers([...users]);
                    })
                }else{
                    MySwal.fire('', res.data.message.message, 'error');
                }
            })
        },
        [users],
    );


    const columns = useMemo(
        () => [
            {
                accessorKey: 'id', //simple recommended way to define a column
                enableHiding: false,
                header: 'id'
            },
            {
                accessorKey: 'first_name', //simple recommended way to define a column
                header: 'First Name'
            },
            {
                accessorKey: 'middle_name', //simple recommended way to define a column
                header: 'Middle Name'
            },
            {
                accessorKey: 'last_name', //simple recommended way to define a column
                header: 'Last Name'
            },
            {
                accessorKey: 'email', //simple recommended way to define a column
                header: 'Email'
            },
            {
                accessorFn: (row) => row.status === '1'?'Archived':'Active', //alternate way
                id: 'status', //simple recommended way to define a column
                header: 'Status'
            },
            {
                accessorFn: (row) => new Date(row.updated_at).toLocaleDateString('en-GB'), //alternate way
                id: 'updated_at', //id required if you use accessorFn instead of accessorKey
                header: 'Last Updated',
            }
        ],
        [],
    );


    return (
        <div>
            <Row>
                <Col>
                    <MaterialReactTable
                        columns={columns}
                        data={users}
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
                                              props.pageSwitch('add',row.original);
                                              closeMenu();
                                          }}
                                          sx={{
                                              width:'140px'
                                          }}
                                >
                                    <VisibilityIcon/>&nbsp; View
                                </MenuItem>,
                                <MenuItem key={2} onClick={() => {
                                    handleDeleteRow(row)
                                    closeMenu();
                                }}>
                                    <DeleteIcon/> &nbsp; Delete
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
                            },
                            columnVisibility: { id: false }
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
                                        props.pageSwitch('add');
                                    }}
                                    sx={{
                                        fontWeight:'bolder',
                                        "&:hover": {
                                            background: "rgb(153, 46, 98)",
                                            color: "white"
                                        }
                                    }}
                                >
                                    Users
                                </Button>
                            </Box>
                        )}


                    />
                </Col>
            </Row>

        </div>
    );
}

export default ListUsers;
