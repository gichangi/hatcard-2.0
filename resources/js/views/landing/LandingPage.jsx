import React from 'react';
import './assets/css/styles.scss';
import hatcardLanding from './assets/images/hatcard_landing.png';
import HeaderNav from "./layouts/HeaderNav";
import PageFooter from "./layouts/PageFooter";
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="wrapper" style={{backgroundColor:"#fff"}}>
        <div>
          <HeaderNav/>
          <div className="main" id="main" style={{backgroundColor:"#fff"}}>
            <div className="hero-section app-hero" style={{height:'79vh',backgroundColor:"#fff"}} >
              <Grid container spacing={1} sx={{padding:'10px',height:"75vh"}}  direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={6} md={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                  <img src={hatcardLanding} alt="Hatcard" height="95%" width={"70%"} />
                </Grid>

                <Grid item xs={5} md={5} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="h1" gutterBottom style={{fontSize:'8.0vh',color:'#C21C66',fontWeight:'bolder'}}>
                        Comprehensive Access and Review Dashboard Portals
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" style={{fontSize:'3.0vh',color:"#000"}}>
                        The HIV AIDS Team Comprehensive Access and Review Dashboard (HATCARD) dashboard was developed by Data.FI with support from the U.S. Agency for International Development (USAID). The HATCARD provides a platform for monitoring, evaluating, and communicating HIV and tuberculosis (TB) program performance to accelerate and sustain access to high-quality data for improving program management.

                      </Typography>

                    </Grid>
                  </Grid>


                </Grid>
              </Grid>
            </div>
            {/*<div className="services-section text-center" id="services">
              <div className="container">
                <div className="row  justify-content-md-center">
                  <div className="col-md-8">
                    <div className="services-content">
                      <h1 className="wow fadeInUp" data-wow-delay="0s" style={{color:'rgb(15, 105, 125)', fontSize:'42px',fontWeight:'bolder !important',fontFamily:"Noto Sans"}}>
                        VSP Pillars
                      </h1>
                      <p className="wow fadeInUp" data-wow-delay="0.2s">
                        Each Vital Signs Profile Provides answers to some of the most critical questions about a country's primary health care system
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12 text-center">
                    <div className="services">
                      <div className="row">
                        <div className="col-sm-3 wow fadeInUp" data-wow-delay="0.2s">
                          <div className="services-icon">
                            <AttachMoneyIcon sx={{fontSize: '4.5rem',color:'#000'}}/>
                          </div>
                          <div className="services-description">
                            <h1>Finance</h1>
                            <p>
                              How much does your government spend on primary health care?
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-3 wow fadeInUp" data-wow-delay="0.3s">
                          <div className="services-icon">
                            <img className="icon-2" src={capacityIcon} height="45" width="60" alt="Service" />
                          </div>
                          <div className="services-description">
                            <h1>Capacity</h1>
                            <p>
                              Does your system have the policies, infrastructure and other physical and human resources required to deliver primary health care?
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-3 wow fadeInUp" data-wow-delay="0.4s">
                          <div className="services-icon">
                            <img className="icon-3" src={performanceIcon} height="45" width="55" alt="Service" />
                          </div>
                          <div className="services-description">
                            <h1>Performance</h1>
                            <p>
                              Does your primary health care system deliver quality care that meets people's health needs?
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-3 wow fadeInUp" data-wow-delay="0.4s">
                          <div className="services-icon">
                            <BalanceIcon sx={{fontSize: '4.5rem',color:'#000'}}/>
                          </div>
                          <div className="services-description">
                            <h1>Equity</h1>
                            <p>
                              Does your primary health care system effectively serve the most marginalized and disadvantaged groups in society?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Divider sx={{
                border: '1px solid #000',
                width: '100%',
                color:'#000'
              }}/>
              <img className="icon-3" src={lowerPageIcon} height="80" width="95%" alt="Service" />
              <Divider sx={{
                border: '1px solid #000',
                width: '100%',
                color:'#000'
              }}/>
            </div>
            */}<PageFooter/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
