import React from 'react';
import './assets/css/styles.scss';
import hatcardLanding from './assets/images/hatcard_landing.png';
import HeaderNav from "./layouts/HeaderNav";
import PageFooter from "./layouts/PageFooter";

import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {IsDesktop} from '../utils/IsDesktop';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const LandingPage = () => {
  const isDesktop = IsDesktop(990);
  return (
    <React.Fragment>
      <div className="wrapper" style={{ backgroundColor: "#fff", position:"relative" }}>
        <div style={{width: '100%', position:"relative", height: '100vh'}}>
          <HeaderNav />
          <div className="main" id="main" style={{height: '80vh', backgroundColor: "#fff", paddingBottom:""}}>
            <div style={{ height: '80%', backgroundColor: "#fff" }} >
              <Grid direction={isDesktop ? 'row' : 'column'} container spacing={2}>
                <Grid item xs={isDesktop ? 7 : 12} md={isDesktop ? 7 : 12} style={{width: '100%'}}>
                    <div style={{height:isDesktop ? "full" : "50%", width:"100%", display: "flex", justifyContent: 'center'}}>
                    <img src={hatcardLanding} alt="Hatcard" style={{width:'60%', objectFit:"contain", height:'auto'}} />
                    </div>
                </Grid>
                <Grid item xs={12} md={isDesktop ? 5 : 12} style={{}}>
                <div style={{height: isDesktop ? "95%" : "50%", display: "flex", justifyContent: 'center', alignItems: 'center', padding: isDesktop ? '20px' : '50px',  marginBottom: isDesktop ? '' : '100px'}}>
                  <Typography marginRight={isDesktop && 6} style={{ fontSize: isDesktop ?'20px' : '15px', color: "#000", textAlign: 'justify'}}>
                    The HIV AIDS Team Comprehensive Access and Review Dashboard (HATCARD) dashboard was developed by Data.FI with support from the U.S. Agency for International Development (USAID). The HATCARD provides a platform for monitoring, evaluating, and communicating HIV and tuberculosis (TB) program performance to accelerate and sustain access to high-quality data for improving program management.
                  </Typography>
                </div>
                  
                </Grid>
              </Grid>
            </div>
            <Box margin={10}/>
          </div>
            <div style={{width: '100%', position:"fixed", bottom: 0, display: 'flex', justifyContent: 'center', marginTop:"20px"}}>
            <PageFooter />
            </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
