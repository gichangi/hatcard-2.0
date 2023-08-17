import {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {Card, Col, Form, Row} from "react-bootstrap";
import {Button, FormHelperText, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {apiFetch} from "../../assets/api/utils";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Paper from "@mui/material/Paper";
import PasswordField from "../../assets/FormField/PasswordField";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height:'100%'
}));

function Index() {
    const MySwal = withReactContent(Swal);
    const [enableSubmit, setEnableSubmit] = useState(false);
    const[password,setPassword] = useState(null);
    const [user,setUser]=useState({
        first_name: null,
        middle_name: null,
        last_name: null,
        email: null,
        phone: null,
        menus: null
    });

    useEffect(()=>{
        apiFetch('Get',{},'/api/account',{}).then(res=>{
            setUser(res.data.account)
        })
    },[])

    const loadT = () =>{
        apiFetch('Get',{},'/api/account',{}).then(res=>{
            setUser(res.data.account)
        })
    }

    const passwordChange = (e) =>{
        //null id for new user
        setPassword(e);
        setEnableSubmit(e.errors.length === 0);
    }

    const handleSubmit = () =>{
        if(password.errors.length === 0 ){
            apiFetch('POST',{},'/api/account',{password:password.value}).then(res=>{
                if(res.data.message.type === 'success'){
                    MySwal.fire('', 'Successfully Updated!', 'success');
                }else{
                    MySwal.fire('', 'An error occurred while saving the data', 'error');
                }
            })
        }else{
            MySwal.fire('', password.errors[0], 'error');
        }
    }

    return (
        <Card
            style={{
                minWidth: 275,
                paddingTop:'0px !important'
            }}
        >
            <Card.Header style={{
                padding:`25px`
            }}>
                <Grid container item xs={6}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                >
                    <Grid item xs={3}                    >
                        <Card.Title as="h5"><Typography sx={{fontSize:'18px',color:'#992E62', fontWeight:'bolder'}}>My Profile</Typography></Card.Title>
                    </Grid>
                </Grid>
            </Card.Header>
            <Card.Body>
                <Grid container spacing={2}>
                    {/*Left side*/}
                    <Grid item xs={8} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <Item sx={{width:'100%'}}>
                                    <Grid container spacing={1} sx={{padding:'0px 10px 0px 10px'}}>
                                        <Grid item xs={12} >

                                            <Form.Group as={Row} controlId="first_name">
                                                <Form.Label column sm={4}>
                                                    First Names
                                                </Form.Label>
                                                <Col sm={6}>
                                                    <Form.Control style={{marginBottom:'0px'}} type="text" placeholder="First Name" value={user.first_name}  disabled />
                                                </Col>
                                            </Form.Group>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Form.Group as={Row} controlId="first_name">
                                                <Form.Label column sm={4}>
                                                    Middle Name
                                                </Form.Label>
                                                <Col sm={6}>

                                                    <Form.Control style={{marginBottom:'0px'}} type="text" placeholder="First Name" value={user.middle_name} disabled />
                                                </Col>
                                            </Form.Group>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Form.Group as={Row} controlId="first_name">
                                                <Form.Label column sm={4}>
                                                    Last Name
                                                </Form.Label>
                                                <Col sm={6}>
                                                    <Form.Control style={{marginBottom:'0px'}} type="text" placeholder="First Name" value={user.last_name} disabled/>
                                                </Col>
                                            </Form.Group>
                                        </Grid>
                                    </Grid>
                                </Item>

                            </Grid>
                            <Grid item xs={12} >
                                <Item sx={{width:'100%'}}>
                                    <Grid container spacing={1} sx={{padding:'0px 10px 0px 10px'}}>
                                        <Grid item xs={12} >
                                            <Form.Group as={Row} controlId="first_name">
                                                <Form.Label column sm={4}>
                                                    Email Address
                                                </Form.Label>
                                                <Col sm={6}>
                                                    <Form.Control style={{marginBottom:'0px'}} type="text" placeholder="Email" value={user.email}  disabled />
                                                </Col>
                                            </Form.Group>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Form.Group as={Row} controlId="first_name">
                                                <Form.Label column sm={4}>
                                                    Phone Number
                                                </Form.Label>
                                                <Col sm={6}>

                                                    <Form.Control style={{marginBottom:'0px'}} type="text" placeholder="Phone Number" value={user.phone} disabled />
                                                </Col>
                                            </Form.Group>
                                        </Grid>
                                    </Grid>
                                </Item>

                            </Grid>

                        </Grid>

                    </Grid>

                    {/*Right side*/}
                    <Grid item xs={4} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <Item sx={{width:'100%',paddingLeft:'10%'}}>
                                    <img
                                        src={"data:image/png;base64,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"}
                                        alt={"user"}
                                        loading="lazy"
                                        width={'80%'}
                                    />
                                </Item>
                            </Grid>
                            <Grid item xs={12} >
                                <Item sx={{width:'100%'}}>
                                    <PasswordField fieldId="password" label="Update Password" placeholder="Enter Password" onStateChanged={passwordChange} thresholdLength={7} minStrength={3} required />
                                </Item>
                            </Grid>
                            {enableSubmit &&
                                <Grid item xs={12} >
                                    <Box display="flex" justifyContent="flex-end" >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                fontSize:'14px',
                                                fontWeight:'bolder',
                                                backgroundColor:'#0E6073'
                                            }}
                                            startIcon={<ControlPointIcon />}
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>

                                    </Box>
                                </Grid>
                            }




                        </Grid>

                    </Grid>
                </Grid>
            </Card.Body>
        </Card>

    );
}

export default Index;


