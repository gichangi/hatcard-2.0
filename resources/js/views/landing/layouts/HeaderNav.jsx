import React from 'react';
import vspFaviconIcon from "../assets/images/vsp-favicon.png";
import {Link} from "react-router-dom";
import '../assets/css/custom-css.css';
function HeaderNav(props) {
    return (
        <>
            <nav className="navbar landing-nav navbar-expand-lg navbar-light navbar-default navbar-fixed-top past-main" role="navigation">
                <div className="container">
                    <a className="navbar-brand page-scroll bg-transparent" href="#" style={{fontWeight:'bolder', fontSize:'28px',color:'rgb(164, 34, 98)'}}>
                        <img src={vspFaviconIcon} alt="CARD" />CARD
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
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="https://www.usaid.gov/nigeria" target="_blank">
                                    About
                                </a>
                            </li>
                            <li className="nav-item" style={{backgroundColor:'#00697F',width:'100px',textAlign:'center'}}>
                                <a className="nav-link page-scroll" href="/login" style={{color:'#fff'}}>
                                    Login
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
