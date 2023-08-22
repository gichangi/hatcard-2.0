import { Card, Button, Alert } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';


import { CopyToClipboard } from 'react-copy-to-clipboard';

import Login from './Login';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useWindowDimensions from "../../../services/useWindowDimensions";


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
          <Grid item xs={8}>


            <div className="auth-wrapper" style={{width:'75%',backgroundColor:'white'}}>
              <div className="auth-content" style={{width:'75%'}}>
                <Card className="borderless text-center" style={{border:'1px solid rgba(0, 0, 0, 0.1)'}}>
                  <Card.Body>
                    <div className="mb-4">
                      <a style={{'color':'#0F697D', 'fontFamily':"Noto Sans",'fontSize': "3vw", 'textAlign': "center"}}  className="noble-ui-logo d-block mb-2">
                        Kenya VSP Portal
                      </a>
                    </div>
                    <Login />
                    <Grid container spacing={1} direction="row" alignItems="center">
                      <Grid item xs={3}>
                        <img src="images/Kenya-MOH.jpeg" alt="image" style={{height:80, width:100}} />
                      </Grid>
                      <Grid item xs={3}>
                        <img src="images/phcpi.jpeg" alt="image" style={{height:80, width:140}} />
                      </Grid>
                      <Grid item xs={3}>
                        <img src="images/unicef.png" alt="image" style={{height:80, width:140}} />
                      </Grid>
                      <Grid item xs={3}>
                        <img src="images/billandmelinda.png" alt="image" style={{height:80, width:140}} />
                      </Grid>
                    </Grid>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <img src="images/white-bg.png" alt="image" style={{height:height-10, width:(width*0.33)}} />
          </Grid>
        </Grid>

      </>
  );
};

export default SignIn;
