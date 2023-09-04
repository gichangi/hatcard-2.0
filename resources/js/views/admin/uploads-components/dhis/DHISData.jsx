import React from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {apiFetch} from "../../../../assets/api/utils";
import MaterialReactTable from "material-react-table";
import {
    Button,
    Card,
    CardContent,
    Dialog, DialogContent,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CSVReader from "../../../../components/CSVUpload/CSVUploadComponent";
import ReplyIcon from '@mui/icons-material/Reply';
import MySwal from "sweetalert2";
import UploadIcon from "@mui/icons-material/Upload";
import SyncIcon from '@mui/icons-material/Sync';
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    minHeight:'50px',
    color: theme.palette.text.secondary,
    boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px !important"
}));




function DHISData({pageSwitch, periodId}) {
    const [data, setData] = useState([]);
    const tableInstanceRef = useRef(null);
    const [rowSelection, setRowSelection] = useState({});
    const [enableUpload,setEnableUpload] = useState(false);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(()=>{
        if(periodId != null){
            apiFetch('GET',{},`/api/dhis-data/data/${periodId}`,{}).then(res=>{
                setData(res.data.dhis_data);
            })

        }

    },[])

    const dataRefresh=()=>{
        setOpen(true)
        apiFetch('POST',{},'/api/dhis-data/refresh',{
            period_id:periodId
        }).then(res=>{
            setOpen(false)
            if(res.data.message.type === 'success'){
                MySwal.fire('', 'Successfully Pulled', 'success').then(()=>{
                    setData(res.data.message.dhis_data);
                })
            }else{
                setOpen(false)
                MySwal.fire('', 'An error occurred while saving the data', 'error');
            }
        })
    }


    const columns = useMemo(
        () => [
            {
                accessorKey: 'periodid', //simple recommended way to define a column
                header: 'Period'
            },
            {
                accessorKey: 'organisationunitname', //simple recommended way to define a column
                header: 'Org Unit'
            },
            {
                accessorKey: 'dataname', //simple recommended way to define a column
                header: 'Indicator'
            },
            {
                accessorKey: 'total', //simple recommended way to define a column
                header: 'Value'
            }

        ],
        [],
    );


    return (
        <div>
            {periodId}
            <Box sx={{ flexGrow: 1,display: 'flex',backgroundColor:'#fff',width: '100%',padding:'10px'}}>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12} >
                        <Item>
                            <Grid container  direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Card sx={{boxShadow:'none'}}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 18, color:'#E19133',fontWeight:'bold' }}>

                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Card sx={{boxShadow:'none'}}>
                                        <CardContent>
                                            <Button variant="outlined"
                                                    onClick={()=>dataRefresh()}
                                                    startIcon={<SyncIcon />}
                                                    sx={{
                                                        color: '#fff',
                                                        fontWeight:'bold',
                                                        borderColor:'#1976D2',
                                                        backgroundColor: '#1976D2',
                                                        '&:hover': {
                                                            backgroundColor: '#E19133',
                                                            color:'#fff',
                                                            borderColor:'#E19133',
                                                        },
                                                    }}
                                            >
                                                Refresh Data
                                            </Button>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Divider orientation="vertical" variant="middle" flexItem>
                                    -
                                </Divider>
                                <Grid item xs={3}>
                                    <Card sx={{boxShadow:'none'}}>
                                        <CardContent>
                                            <Button variant="outlined" onClick={()=>pageSwitch()}
                                                    startIcon={<ReplyIcon />}
                                                    sx={{
                                                        color: '#fff',
                                                        borderColor:'#992E62',
                                                        backgroundColor: '#992E62',
                                                        '&:hover': {
                                                            backgroundColor: '#E19133',
                                                            color:'#fff',
                                                            borderColor:'#E19133',
                                                        },
                                                    }}
                                            >
                                                Back
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <MaterialReactTable
                                columns={columns}
                                data={data}
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


                            />
                        </Item>
                    </Grid>
                </Grid>


            </Box>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                aria-labelledby="responsive-dialog-title"
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width:'35rem',
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                    }
                }}
            >
                <DialogContent sx={{width:'35rem',height:'40rem'}}>
                    <CircularProgress size={'30rem'} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DHISData;
