import { Card, Button, Alert } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';


import { CopyToClipboard } from 'react-copy-to-clipboard';

import Login from './Login';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useWindowDimensions from "../../../services/useWindowDimensions";
import {Typography} from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const SignIn = () => {
  const { height, width } = useWindowDimensions();
  return (
      <>
        <Grid container spacing={1} direction="row" alignItems="center" style={{backgroundColor:'white'}}>
          <Grid item xs={7} style={{height:'100vh'}}>
              <Grid container spacing={10} direction="row" justifyContent="center" alignItems="center" style={{height:'100vh'}}>
                  <Grid item xs={12} sx={{display:'flex',alignItems:'center',ml:'3rem',mt:'1.2rem'}}>
                      <img src="images/favicon-large.jpg" alt="image" style={{height:'3rem',zIndex:'100'}}  />
                      <Typography variant="h1"  style={{fontSize:'3.5rem',marginLeft:'0.5rem',color:'#C21C66',fontWeight:'bolder'}}>
                          CARD
                      </Typography>
                  </Grid>

                  <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                      <Card className="borderless text-center" style={{boxShadow:'none',width:'35rem'}}>
                                  <Card.Body>
                                      <div className="mb-4">
                                          <Typography variant="h1" component="h2" style={{color:'#OOO !important', fontFamily:"Noto Sans",fontSize: "2.5rem", textAlign: "left"}}>
                                              Login
                                          </Typography>
                                      </div>
                                      <Login />
                                      <Grid container spacing={1} direction="row" alignItems="center" justifyContent="space-evenly">
                                          <Grid item xs={3}>
                                              <img src="images/pepfar2.png" alt="image" style={{height:'4rem', width:'8rem'}} />
                                          </Grid>
                                          <Grid item xs={3}>
                                              <img src="images/usaid.jpg" alt="image" style={{height:'4rem', width:'8rem'}} />
                                          </Grid>
                                          <Grid item xs={3}>
                                              <img src="images/DataFI.png" alt="image" style={{height:'4rem', width:'8rem'}} />
                                          </Grid>
                                      </Grid>
                                  </Card.Body>
                              </Card>
                  </Grid>




              </Grid>
          </Grid>
          <Grid item xs={5} sx={{backgroundColor:'#fff',height:'100vh'}}>
              <Grid container direction="column" justifyContent="center" alignItems="center" style={{backgroundColor:'#286A7D', width:'100%',height:'100vh'}}>
                  <Grid item xs={12} sx={{width:'100%',display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                      <div style={{width:'25%',height:'100%',backgroundColor:'white',zIndex:'1'}}>
                          <img src="images/login-right-side-center.png" alt="image" style={{height:'40rem', marginTop:'15rem',zIndex:'100'}}  />
                      </div>
                  </Grid>
              </Grid>

          </Grid>
        </Grid>

      </>
  );
};

export default SignIn;
