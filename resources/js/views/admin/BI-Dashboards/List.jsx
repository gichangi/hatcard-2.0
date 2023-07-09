import {useEffect, useMemo, useRef, useState} from "react";
import {apiFetch} from "../../../assets/api/utils";
import _ from "lodash";
import {Col, Row} from "react-bootstrap";
import MaterialReactTable from "material-react-table";
import {Button, MenuItem, Typography} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Link from "@mui/material/Link";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Dropdown, DropdownMenuItem, DropdownNestedMenuItem } from "../../../components/Dropdown";
import {ArrowRight} from "@mui/icons-material";

function List(props) {
    const[dashboards,setDashboards] = useState([]);
    const tableInstanceRef = useRef(null);
    const [rowSelection, setRowSelection] = useState({});

    useEffect(()=>{
        let localStore = JSON.parse(localStorage.getItem('hatcard.auth'))||1;
        if(localStore !== 1){
            let headers =  {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStore.token}`
            };
            apiFetch('get',headers,'/api/bi-dashboards',{}).then(res=>{
                console.log(res.data.dashboards)
                setDashboards(res.data.dashboards);
            })
        }
    },[]);
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //simple recommended way to define a column
                header: 'Name'
            },
            {
                accessorKey: 'description',
                header: 'Description'
            },
            {
                accessorKey: 'parent_menu_uid',
                header: 'Parent'
            },
            {
                accessorKey: 'server_uid',
                header: 'Server'
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

    return (
        <div>
            <Row>

                <Col>
                    <MaterialReactTable
                        columns={columns}
                        data={dashboards}
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
                                              console.info('View Profile', row.original.name);
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
                                    console.info('Remove', row);
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
                                </MenuItem>,
                                <MenuItem key={4} onClick={() => {
                                    props.pageSwitch('config',row.original);
                                    closeMenu();
                                }}>
                                    <DeleteIcon/> &nbsp; Configuration
                                </MenuItem>,

                            ];
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
                                <Dropdown
                                    sx={{
                                        fontWeight:'bolder',
                                        "&:hover": {
                                            background: "rgb(153, 46, 98)",
                                            color: "white"
                                        }
                                    }}
                                    trigger={
                                        <Button
                                            variant="contained"
                                            startIcon={<AddCircleIcon />}
                                            sx={{
                                                fontWeight:'bolder',
                                                "&:hover": {
                                                    background: "rgb(153, 46, 98)",
                                                    color: "white"
                                                }
                                            }}
                                        >
                                            Dashboards
                                        </Button>

                                }
                                    menu={[
                                        <DropdownNestedMenuItem
                                            label="Tableau"
                                            rightIcon={<ArrowRight />}
                                            menu={[
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        props.pageSwitch('tableau_server');
                                                    }}
                                                >
                                                    Server
                                                </DropdownMenuItem>,
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        props.pageSwitch('tableau_public');
                                                    }}
                                                >
                                                    Public
                                                </DropdownMenuItem>,
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        alert('coming soon')
                                                    }}
                                                >
                                                    Online
                                                </DropdownMenuItem>
                                            ]}
                                        />,
                                        <DropdownNestedMenuItem
                                            label="Power BI"
                                            rightIcon={<ArrowRight />}
                                            menu={[
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        console.log("clicked");
                                                    }}
                                                >
                                                    Server Api
                                                </DropdownMenuItem>,
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        console.log("clicked");
                                                    }}
                                                >
                                                    Public Link
                                                </DropdownMenuItem>
                                            ]}
                                        />,
                                        <DropdownNestedMenuItem
                                            label="Arc-Gis"
                                            rightIcon={<ArrowRight />}
                                            menu={[
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        console.log("clicked");
                                                    }}
                                                >
                                                    Embedding
                                                </DropdownMenuItem>
                                            ]}
                                        />,
                                        <DropdownNestedMenuItem
                                            label="HTML"
                                            rightIcon={<AssignmentIcon />}
                                            onClick={() => {
                                                props.pageSwitch('html_dashboard');
                                            }}
                                        />
                                    ]}
                                />
                            </Box>
                        )}


                    />
                </Col>
            </Row>

        </div>
    );
}

export default List;
