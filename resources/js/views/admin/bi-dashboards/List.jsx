import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {apiFetch} from "../../../assets/api/utils";
import {Col, Row} from "react-bootstrap";
import MaterialReactTable from "material-react-table";
import {Button, MenuItem} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Dropdown, DropdownMenuItem, DropdownNestedMenuItem} from "../../../components/Dropdown";
import {ArrowRight} from "@mui/icons-material";
import MySwal from "sweetalert2";
import _ from 'lodash';
import CheckIcon from '@mui/icons-material/Check';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';


function List(props) {
    const[dashboards,setDashboards] = useState([]);
    const tableInstanceRef = useRef(null);
    const [rowSelection, setRowSelection] = useState({});

    useEffect(()=>{
        apiFetch('get',{},'/api/bi-dashboards',{}).then(res=>{
            setDashboards(res.data.dashboards);
        })
    },[]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id', //simple recommended way to define a column
                enableHiding: false,
                header: 'id'
            },
            {
                accessorKey: 'name', //simple recommended way to define a column
                header: 'Name'
            },
            {
                accessorKey: 'description',
                header: 'Description'
            },
            {
                accessorKey: 'menu.name',
                header: 'Parent Menu'
            },
            {
                accessorKey: 'dashboard_type',
                header: 'Type'
            },
            {
                accessorKey: 'status',
                header: 'Status',
            },
            {
                accessorFn: (row) => row.public_access?"True":"False", //al
                id: 'public_access',
                header: 'Public Access',
            },
            {
                accessorFn: (row) => new Date(row.updated_at).toLocaleDateString('en-GB'), //alternate way
                id: 'updated_at', //id required if you use accessorFn instead of accessorKey
                header: 'Last Updated',
            }
        ],
        [],
    );


    const handleDeleteRow = useCallback(
        (row) => {
            apiFetch('delete',{},'/api/bi-dashboards/',{id:row.getValue('id')}).then(res=>{
                console.log(res.data.message.type)
                if(res.data.message.type === 'success'){
                    MySwal.fire('', 'Successfully Deleted!', 'success').then(()=>{
                        dashboards.splice(row.index, 1);
                        setDashboards([...dashboards]);
                    })
                }else{
                    MySwal.fire('', res.data.message.message, 'error');
                }
            })
        },
        [dashboards],
    );
    const handleDisableRow = useCallback(
        (row) => {
            apiFetch('post',{},'/api/bi-dashboards/archive',{id:row.getValue('id'),status:row.getValue('status') === 'Active'?'Archived':'Active'}).then(res=>{
                console.log(res.data.message.type)
                if(res.data.message.type === 'success'){
                    MySwal.fire('', `Successfully ${row.getValue('status') === 'Active'?'Archived!':'Activated!'} `, 'success').then(()=>{
                        _.map(dashboards, function(dashboard) {
                            if(dashboard.id === row.getValue('id')){
                                dashboard.status = row.getValue('status') === 'Active'?'Archive':'Active'
                            }
                            return dashboard;
                        });
                        setDashboards([...dashboards]);
                    })
                }else{
                    MySwal.fire('', res.data.message.message, 'error');
                }
            })
        },
        [dashboards]
    );

    const setDefault = (row)=>{
        apiFetch('post',{},'/api/bi-dashboards/default',{id:row.getValue('id')}).then(res=>{
            console.log(res.data.message.type)
            if(res.data.message.type === 'success'){
                MySwal.fire('', `Successfully set as homepage`, 'success');
            }else{
                MySwal.fire('', res.data.message.message, 'error');
            }
        })
    }
    const setPublic = (row)=>{
        apiFetch('post',{},'/api/bi-dashboards/public',{id:row.getValue('id')}).then(res=>{
            console.log(res.data.message.type)
            if(res.data.message.type === 'success'){
                MySwal.fire('', `Successfully updated`, 'success');
            }else{
                MySwal.fire('', res.data.message.message, 'error');
            }
        })
    }


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
                            let actionArray =[
                                <MenuItem key={1}
                                          onClick={() => {
                                              console.info('Set default', row.original.name);
                                              setDefault(row)
                                          }}
                                          sx={{
                                              width: '140px'
                                          }}
                                >
                                    <CheckIcon />&nbsp; Defaults
                                </MenuItem>,
                                <MenuItem key={2}
                                          onClick={() => {
                                              console.info('row.original.public_access',row.original.public_access);
                                             // setDefault(row)
                                              setPublic(row)
                                          }}
                                          sx={{
                                              width: '140px'
                                          }}
                                >
                                    {row.original.public_access &&
                                        <>
                                            <PublicOffIcon />&nbsp; Public

                                        </>
                                    }
                                    {!row.original.public_access &&
                                        <>
                                            <PublicIcon  />&nbsp; Public
                                        </>
                                    }



                                </MenuItem>,

                                <MenuItem key={3}
                                          onClick={() => {
                                              console.info('View Profile', row.original.name);
                                              props.pageSwitch(row.original.dashboard_type, row.original);
                                          }}
                                          sx={{
                                              width: '140px'
                                          }}
                                >
                                    <VisibilityIcon/>&nbsp; Edit
                                </MenuItem>,
                                <MenuItem key={4} onClick={() => {
                                    console.info('Remove', row);
                                    handleDeleteRow(row)
                                    //handleDeleteAction(row.original.id);
                                    closeMenu();
                                }}>
                                    <DeleteIcon/> &nbsp; Delete
                                </MenuItem>,
                                <MenuItem key={5} onClick={() => {
                                    handleDisableRow(row)
                                    closeMenu();
                                }}>
                                    {row.original.status.toLowerCase() === 'active' &&
                                        <>
                                            <DoDisturbIcon/>&nbsp; Disable
                                        </>
                                    }
                                    {row.original.status.toLowerCase() !== 'active' &&
                                        <>
                                            <DoDisturbIcon/>&nbsp; Enable
                                        </>
                                    }
                                </MenuItem>
                            ]

                            if(row.original.set_home_page){
                                actionArray.shift()
                            }
                            return actionArray;
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
