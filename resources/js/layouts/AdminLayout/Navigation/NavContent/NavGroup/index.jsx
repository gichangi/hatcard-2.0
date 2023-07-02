
import { ListGroup } from 'react-bootstrap';
import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';
import {  Link } from "react-router-dom";

const NavGroup = ({ layout, group }) => {
  let navItems = '';

  if (group.children) {
    const groups = group.children;
    navItems = Object.keys(groups).map((item) => {
      item = groups[item];
      switch (item.type) {
        case 'collapse':
          return <NavCollapse key={item.id} collapse={item} type="main"/>;
        case 'item':
          return <NavItem layout={layout} key={item.id} item={item} customClass={'base-menu-item'}/>;
        default:
          return false;
      }
    });
  }

  return (
    <>
      <ListGroup.Item as="li" bsPrefix=" " key={group.id} className="nav-item pcoded-menu-caption">
          <label style={{color:'#992E62', fontWeight:'bold',fontSize:'14px',fontFamily:'Trebuchet'}}>
            <Link to={{ pathname: '/explore', state: { id: group.id}}} style={{color:'#992E62', fontWeight:'bold',fontSize:'14px',fontFamily:'Trebuchet'}}>
              {group.title}
            </Link>
          </label>
      </ListGroup.Item>
      {navItems}
    </>
  );
};

export default NavGroup;
