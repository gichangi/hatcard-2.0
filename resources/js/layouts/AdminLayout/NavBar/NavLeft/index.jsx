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
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
          <a style={{'color':'#0F697D', 'fontFamily':"Noto Sans",'fontSize': "4vh", 'textAlign': "center", fontWeight:'bolder',marginLeft:'30%', width:'100%'}}  className="noble-ui-logo d-block mb-2">
            {/*Comprehensive Access and Review Dashboard*/}
            Primary Health Care - Vital Signs Profile
          </a>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default NavLeft;
