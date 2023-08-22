import React from 'react';
import './assets/css/styles.scss';
import hatcardLanding from './assets/images/vsp-template.png';
import HeaderNav from "./layouts/HeaderNav";
import PageFooter from "./layouts/PageFooter";
import Breadcrumb from '../../layouts/AdminLayout/Breadcrumb';
import BalanceIcon from '@mui/icons-material/Balance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import capacityIcon from './assets/images/capacity-icon.png';
import performanceIcon from './assets/images/performance-icon.png';
import vspFaviconIcon from './assets/images/vsp-favicon.png';
import lowerPageIcon from './assets/images/lower_icons.png';
import vspTemplate from './assets/images/vsp-template.png';
import { Divider } from '@mui/material';




const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="wrapper">
        <div>
          <HeaderNav/>
          <div className="main" id="main">
            <div className="hero-section app-hero" >
              <div className="container">
                <div className="hero-content app-hero-content text-center">
                  <div className="row justify-content-md-center">
                    <div className="col-md-10">
                      <h1 className="wow fadeInUp" data-wow-delay="0s" style={{marginTop:'-10px',color:'rgb(15, 105, 125)', fontSize:'45px',fontWeight:'bolder !important',fontFamily:"Noto Sans"}}>
                        Kenya Vital Signs Profile
                      </h1>
                      <p className="wow fadeInUp" data-wow-delay="0.2s" style={{fontSize:'24px',color:'rgb(164, 34, 98)'}}>
                        The Vital Signs Profile is one of the flagship products that came out of the work of the Primary Health Care Performance Initiative. Before the Vital Signs Profile,
                      </p>
                    </div>
                    <div className="col-md-12">
                      <div className="hero-image" style={{height:'75vh'}}>
                        <img src={hatcardLanding} alt="Hatcard" height="98%" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="services-section text-center" id="services">
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
            <PageFooter/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
