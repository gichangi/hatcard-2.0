import React from 'react';
import Breadcrumb from "../../layouts/AdminLayout/Breadcrumb";
import HeaderNav from "./layouts/HeaderNav";
import TableauViz from "./TableauViz";
import PageFooter from "./layouts/PageFooter";

function ProgressiveModelPage(props) {
    return (
        <React.Fragment>
            <Breadcrumb />
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
                                                <TableauViz style={{zIndex:'100'}} urlFilter={null} vizUrl={'https://public.tableau.com/views/progresive_model_scores_tableau/score_card?:language=en-US&:display_count=n&:origin=viz_share_link'}/>
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
}

export default ProgressiveModelPage;
