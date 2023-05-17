import  { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import NavIcon from '../NavIcon';
import NavBadge from '../NavBadge';

import { ConfigContext } from '../../../../../contexts/ConfigContext';
import * as actionType from '../../../../../store/actions';
import useWindowSize from '../../../../../hooks/useWindowSize';
import {styled} from "@mui/material/styles";


const CustomNavLink = styled(NavLink)`
/*  color:red;
  font-size:13px;
  font-weight:bold;
  text-decoration: none;
  &:focus {
    color:#014d88;
    font-size:13px;
    font-weight:bold;
  }
  &:hover .nav-link{
    background-color: blue;
    color:red;
  }*/
`

const NavItem = ({ layout, item,showIcon=true,customClass=null}) => {
  const windowSize = useWindowSize();
  const configContext = useContext(ConfigContext);
  const { dispatch } = configContext;

  let itemTitle = item.title;
  if (item.icon) {
    itemTitle = <span className="pcoded-mtext">{item.title}</span>;
  }

  let itemTarget = '';
  if (item.target) {
    itemTarget = '_blank';
  }

  let subContent;
  if (item.external) {
    subContent = (
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        <NavIcon items={item} />
        {itemTitle}
        <NavBadge items={item} />
      </a>
    );
  } else {
    subContent = (
        //Gichangi customization
        //Customize here for change in colorclassName={'dashboardClass'}

      <CustomNavLink to={item.url} className={`${customClass} custom-menu-item nav-link ${item.category === 'dashboard'?'dashboard-link':''}`} exact={true} target={itemTarget}>
        {showIcon &&
            <NavIcon  items={item} />
        }
        {itemTitle}
        <NavBadge items={item} />
      </CustomNavLink>
    );
  }
  let mainContent = '';
  if (layout === 'horizontal') {
    mainContent = (
      <ListGroup.Item as="li" bsPrefix=" " onClick={() => dispatch({ type: actionType.NAV_CONTENT_LEAVE })}>
        {subContent}
      </ListGroup.Item>
    );
  } else {
    if (windowSize.width < 992) {
      mainContent = (
        <ListGroup.Item as="li" bsPrefix=" " className={item.classes} onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}>
          {subContent}
        </ListGroup.Item>
      );
    } else {
      mainContent = (
        <ListGroup.Item as="li" bsPrefix=" " className={item.classes}>
          {subContent}
        </ListGroup.Item>
      );
    }
  }

  return <>{mainContent}</>;
};

export default NavItem;
