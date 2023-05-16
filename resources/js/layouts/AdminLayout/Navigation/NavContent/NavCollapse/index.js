import  { useContext, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
/*import { Link } from 'react-router-dom';*/
import Link from '@mui/material/Link';
import NavItem from '../NavItem';
import LoopNavCollapse from './index';
import NavIcon from '../NavIcon';
import NavBadge from '../NavBadge';

import { ConfigContext } from '../../../../../contexts/ConfigContext';
import * as actionType from '../../../../../store/actions';
import {styled} from "@mui/material/styles";
import { ThemeProvider, createTheme } from '@mui/material/styles';
//Gichangi modified
//Provide custom style for links
import './navbar-custom.css'

const theme = createTheme({
  root: {
    'navListIcon': 'style1'
  },
  components: {
    // Name of the component
    MuiLink: {
      styleOverrides: {
        root: {
          // Some CSS
          background:'#fff',
          color:'white',
          fontSize: '1rem',
          '&:hover':{
            //background:'#f7f7f7'
            background:'rgb(78, 212, 232)'
          },

        },
      },
    },
  },
});



const CustomLink = styled(Link)`

  &:focus {
    background: #f7f7f7;
  };
  &:hover {
    background: #f7f7f7;
  };
  &:active {
    background: #f7f7f7;
  };
`

const NavCollapse = ({ collapse, type }) => {
  const configContext = useContext(ConfigContext);
  const { dispatch } = configContext;

  const { layout, isOpen, isTrigger } = configContext.state;

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === collapse.id);
    if (currentIndex > -1) {
      dispatch({ type: actionType.COLLAPSE_TOGGLE, menu: { id: collapse.id, type: type } });
    }
  }, [collapse, dispatch, type]);

  let navItems = '';
  if (collapse.children) {
    const collapses = collapse.children;
    navItems = Object.keys(collapses).map((item) => {
      item = collapses[item];
      switch (item.type) {
        case 'collapse':
          return <LoopNavCollapse key={item.id} collapse={item} type="sub" />;
        case 'item':
          return <NavItem layout={layout} key={item.id} item={item} />;
        default:
          return false;
      }
    });
  }

  let itemTitle = collapse.title;
  if (collapse.icon) {
    itemTitle = <span className="pcoded-mtext">{collapse.title}</span>;
  }

  let navLinkClass = ['nav-link'];

  let navItemClass = ['nav-item', 'pcoded-hasmenu'];
  const openIndex = isOpen.findIndex((id) => id === collapse.id);
  if (openIndex > -1) {
    navItemClass = [...navItemClass, 'active'];
    if (layout !== 'horizontal') {
      navLinkClass = [...navLinkClass, 'active'];
    }
  }

  const triggerIndex = isTrigger.findIndex((id) => id === collapse.id);
  if (triggerIndex > -1) {
    navItemClass = [...navItemClass, 'pcoded-trigger'];
  }

  const currentIndex = document.location.pathname
    .toString()
    .split('/')
    .findIndex((id) => id === collapse.id);
  if (currentIndex > -1) {
    navItemClass = [...navItemClass, 'active'];
    if (layout !== 'horizontal') {
      navLinkClass = [...navLinkClass, 'active'];
    }
  }

  const subContent = (
    <>

        <Link
            to="#"
            className={navLinkClass.join(' ')}
            onClick={() => dispatch({ type: actionType.COLLAPSE_TOGGLE, menu: { id: collapse.id, type: type } })}
            style={{
              color:'#0E6073', fontWeight:'bold',
            }}
        >
          <NavIcon items={collapse} />
          {itemTitle}
          <NavBadge items={collapse} />
        </Link>

{/*      <CustomLink
        to="#"
        className={navLinkClass.join(' ')}
        onClick={() => dispatch({ type: actionType.COLLAPSE_TOGGLE, menu: { id: collapse.id, type: type } })}
        style={{ color:'#0E6073', fontWeight:'bold'}}
      >
        <NavIcon items={collapse} />
        {itemTitle}
        <NavBadge items={collapse} />
      </CustomLink>*/}
      <ListGroup variant="flush" bsPrefix=" " as="ul" className="pcoded-submenu" style={{backgroundColor:'#fff',color:'#014d88'}}>
        {navItems}
      </ListGroup>
    </>
  );

  let mainContent = '';
  if (layout === 'horizontal') {
    mainContent = (
      <ListGroup.Item
        as="li"
        bsPrefix=" "
        onMouseLeave={() => dispatch({ type: actionType.NAV_COLLAPSE_LEAVE, menu: { id: collapse.id, type: type } })}
        onMouseEnter={() => dispatch({ type: actionType.COLLAPSE_TOGGLE, menu: { id: collapse.id, type: type } })}
        style={{color:'#014d88'}}
      >
        {subContent}
      </ListGroup.Item>
    );
  } else {
    mainContent = (
      <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')} style={{color:'#014d88'}}>
        {subContent}
      </ListGroup.Item>
    );
  }

  return <>
    <ThemeProvider theme={theme}>
      {mainContent}
    </ThemeProvider>
    </>;
};

export default NavCollapse;
