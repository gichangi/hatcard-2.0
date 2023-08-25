import React, {useEffect, useRef, useState} from 'react';

import './assets/css/styles.scss';
import TableauViz from "./TableauViz";
import HeaderNav from "./layouts/HeaderNav";
import PageFooter from "./layouts/PageFooter";





const VspPage = (props) => {

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
                    <div className="col-md-12">
                      <div className="hero-image">
                        <TableauViz style={{zIndex:'100'}} urlFilter={null} vizUrl={'https://public.tableau.com/views/VSP-2023-routine/VSPs?:language=en-US&:display_count=n&:origin=viz_share_link'}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           <PageFooter/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VspPage;
