import React from 'react';
import vspFaviconIcon from "../assets/images/vsp-favicon.png";
import {Link} from "react-router-dom";
import '../assets/css/custom-css.css';
function HeaderNav(props) {
    return (
        <>
            <nav className="navbar landing-nav navbar-expand-lg navbar-light navbar-default navbar-fixed-top past-main" role="navigation">
                <div className="container">
                    <a className="navbar-brand page-scroll bg-transparent" href="#" style={{fontWeight:'bolder'}}>
                        <img src={vspFaviconIcon} alt="Vital Signs Profile" /> Vital Signs Profile
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto" />
                        <ul className="navbar-nav my-2 my-lg-0">
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="/landing">
                                    Home
                                </a>
                            </li>
{/*                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="#services">
                                    Important
                                </a>
                            </li>*/}
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Dashboards
                                </Link>
                                <div className="dropdown-menu custom-dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to="/vsp" className="dropdown-item">
                                        County VSP
                                    </Link>
                                    <Link to="/pms" className="dropdown-item">
                                        Progress Module Scores
                                    </Link>
      {/*                              <Link to="#" className="dropdown-item">
                                        Level 3
                                    </Link>*/}
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="https://www.improvingphc.org/about-phcpi" target="_blank">
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default HeaderNav;
