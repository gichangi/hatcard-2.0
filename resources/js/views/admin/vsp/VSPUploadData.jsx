import React from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {apiFetch} from "../../../assets/api/utils";
import MaterialReactTable from "material-react-table";
import {Button, Card, CardContent, Divider, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CSVReader from "./CSVUploadComponent";
import ReplyIcon from '@mui/icons-material/Reply';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    minHeight:'50px',
    color: theme.palette.text.secondary,
    boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px !important"
}));




function VspUploadData({pageSwitch, uploadId}) {
    const [data, setData] = useState([]);
    const tableInstanceRef = useRef(null);
    const [rowSelection, setRowSelection] = useState({});
    const [uploadInfo, setUploadInfo] = useState(
        {
            upload_id:null,
            data:[]
        }
    )
    useEffect(()=>{
        if(uploadId != null){
            apiFetch('GET',{},`/api/vsp-data/data/${uploadId}`,{}).then(res=>{
                setData(res.data.vsp_data);
                setUploadInfo(
                    {
                        upload_id:uploadId,
                        data:res.data.vsp_data
                    }
                )
            })

        }

    },[])

    const dataUpload=()=>{
        console.log("---------upload--------")
        console.log({
            upload_id:uploadId,
            data:data
        })
        console.log("---------upload--------")
        apiFetch('POST',{},'/api/vsp-data',{
            upload_id:uploadId,
            data:data
        }).then(res=>{
            console.log(res)
        })
    }


    const columns = useMemo(
        () => [
            {
                accessorKey: 'period', //simple recommended way to define a column
                header: 'Period'
            },
            {
                accessorKey: 'county', //simple recommended way to define a column
                header: 'County'
            },
            {
                accessorKey: 'category', //simple recommended way to define a column
                header: 'Category'
            },
            {
                accessorKey: 'data_group', //simple recommended way to define a column
                header: 'Data Group'
            },
            {
                accessorKey: 'data_sub_group', //simple recommended way to define a column
                header: 'Data subgroup'
            },
            {
                accessorKey: 'indicator', //simple recommended way to define a column
                header: 'Indicator'
            },
            {
                accessorKey: 'definition', //simple recommended way to define a column
                header: 'Definition'
            },
            {
                accessorKey: 'data_source', //simple recommended way to define a column
                header: 'Data Source'
            },
            {
                accessorKey: 'indicator_on_khis', //simple recommended way to define a column
                header: 'Indicator on KHIS'
            },
            {
                accessorKey: 'khis_uid', //simple recommended way to define a column
                header: 'KHIS UID'
            },
            {
                accessorKey: 'value', //simple recommended way to define a column
                header: 'Value'
            }

        ],
        [],
    );


    return (
        <div>
            <Box sx={{ flexGrow: 1,display: 'flex',backgroundColor:'#fff',width: '100%',padding:'10px'}}>
                <Grid container rowSpacing={2}>
                    <Grid item xs={12} >
                        <Item>
                            <Grid container  direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                                <Grid item xs={2}>
                                    <Card sx={{boxShadow:'none'}}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 18, color:'#E19133',fontWeight:'bold' }}>
                                                Upload File
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Divider orientation="vertical" variant="middle" flexItem>
                                    -
                                </Divider>
                                <Grid item xs={3}>
                                    <Card sx={{boxShadow:'none'}}>
                                        <CardContent>
                                            <CSVReader setData={setData}/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Divider orientation="vertical" variant="middle" flexItem>
                                    -
                                </Divider>
                                <Grid item xs={2}>
                                    <Card sx={{boxShadow:'none'}}>
                                        <CardContent>
                                            <Button variant="outlined"
                                                    onClick={()=>dataUpload()}
                                                    startIcon={<DeleteIcon />}
                                                    sx={{
                                                        color: '#fff',
                                                        borderColor:'#1976D2',
                                                        backgroundColor: '#1976D2',
                                                        '&:hover': {
                                                            backgroundColor: '#E19133',
                                                            color:'#fff',
                                                            borderColor:'#E19133',
                                                        },
                                                    }}
                                            >
                                                Upload
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


        </div>
    );
}

export default VspUploadData;
