import React from 'react';
import vspFaviconIcon from "../assets/images/vsp-favicon.png";
import {Link} from "react-router-dom";

function PageFooter(props) {
    return (
        <div className="footer">
            <div className="container">
                <div className="col-md-12 text-center">
                    <a className="navbar-brand page-scroll bg-transparent" href="#" style={{fontWeight:'bolder', color:'#000'}}>
                        <img src={vspFaviconIcon} alt="Vital Signs Profile"/> CARD
                    </a>
                    <ul className="footer-menu">
                        <li>
                            <Link to="#">Site</Link>
                        </li>
                        <li>
                            <Link to="#">Support</Link>
                        </li>
                        <li>
                            <Link to="#">Terms</Link>
                        </li>
                        <li>
                            <Link to="#">Privacy</Link>
                        </li>
                    </ul>
                    <div className="footer-text">
                        <p>Copyright © 2023 CARD.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageFooter;
