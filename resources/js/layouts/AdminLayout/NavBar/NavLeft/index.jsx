import  { useContext } from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useWindowSize from '../../../../hooks/useWindowSize';
import { ConfigContext } from '../../../../contexts/ConfigContext';
import NavSearch from './NavSearch';

const NavLeft = () => {
  const windowSize = useWindowSize();

  const configContext = useContext(ConfigContext);
  const { rtlLayout } = configContext.state;
  let dropdownRightAlign = false;
  if (rtlLayout) {
    dropdownRightAlign = true;
  }

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  return (
    <>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto" style={{ width:'80%'}}>
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')} style={{textAlign:'right',width:'100%'}}>
          {/*<a style={{'color':'#0F697D', 'fontFamily':"Noto Sans",'fontSize': "3vh", 'textAlign': "center", fontWeight:'bolder',marginLeft:'auto', width:'100%'}}  className="noble-ui-logo d-block mb-2">
          */}<a style={{fontFamily:"Noto Sans",fontSize: "4vh", 'textAlign': "center", fontWeight:'bolder', width:'100%'}}  className="noble-ui-logo d-block mb-2">
            {/*Comprehensive Access and Review Dashboard*/}
            Comprehensive Access and Review Dashboard Portals
          </a>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default NavLeft;
