import React from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {apiFetch} from "../../../../assets/api/utils";
import MySwal from "sweetalert2";
import {Col, Row} from "react-bootstrap";
import MaterialReactTable from "material-react-table";
import Box from "@mui/material/Box";
import {Button, MenuItem} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

function RMNCAHLowHighUploadsList(props) {
    const [uploads, setUploads] = useState([]);
    const tableInstanceRef = useRef(null);
    const [rowSelection, setRowSelection] = useState({});
    const [enableUpload,setEnableUpload] = useState(false);
    useEffect(()=>{
        apiFetch('GET',{},'/api/rmncah-low-high-data',{}).then(res=>{
            setUploads(res.data.rmncah_low_high_uploads);
        })
    },[])

    const handleDeleteRow = useCallback(
        (uploadId,row) => {
            apiFetch('DELETE',{},'/api/rmncah-low-high-data',{id:uploadId}).then(res=>{
                if(res.data.message.type === 'success'){
                    MySwal.fire('', 'Successfully Deleted!', 'success').then(()=>{
                        uploads.splice(row.index, 1);
                        setUploads([...uploads]);
                    })
                }else{
                    MySwal.fire('', res.data.message.message, 'error');
                }
            })
        },
        [uploads],
    );


    const columns = useMemo(
        () => [
            {
                accessorKey: 'email', //simple recommended way to define a column
                header: 'Created By'
            },
            {
                accessorFn: (row) => new Date(row.created_at).toLocaleDateString('en-GB'), //alternate way
                id: 'created_at', //id required if you use accessorFn instead of accessorKey
                header: 'Created',
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
                        data={uploads}
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
                                              props.pageSwitch('add',row.original.id);
                                              closeMenu();
                                          }}
                                          sx={{
                                              width:'140px'
                                          }}
                                >
                                    <VisibilityIcon/>&nbsp; View
                                </MenuItem>,
                                <MenuItem key={2} onClick={() => {
                                    handleDeleteRow(row.original.id,row)
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
                                pageSize: 10,
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
                                    Upload
                                </Button>
                            </Box>
                        )}

                    />
                </Col>
            </Row>

        </div>
    );
}

export default RMNCAHLowHighUploadsList;
