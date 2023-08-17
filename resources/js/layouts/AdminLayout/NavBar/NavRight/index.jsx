import  { useContext, useState } from 'react';
import { ListGroup, Dropdown, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import ChatList from './ChatList';
import { ConfigContext } from '../../../../contexts/ConfigContext';
import AuthContext from "../../../../contexts/AuthContext";
import useAuth from '../../../../hooks/useAuth';
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import avatar1 from '../../../../assets/images/user/avatar-1.jpg';
// import avatar2 from '../../../../assets/images/user/avatar-2.jpg';
// import avatar3 from '../../../../assets/images/user/avatar-3.jpg';
// import avatar4 from '../../../../assets/images/user/avatar-4.jpg';

const NavRight = () => {
  const configContext = useContext(ConfigContext);
  const authContext = useContext(AuthContext);
  const { logout} = useAuth();
  const { rtlLayout } = configContext.state;
  const currentUser = authContext.user;
  const [listOpen, setListOpen] = useState(false);
  const handleLogout = async () => {
    try {
      logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">

        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown alignRight={true} className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <FiSettings />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>{currentUser.first_name} {currentUser.last_name}</span>
                <Link to="#" className="dud-logout" title="Logout">
                  <FiLogOut />
                </Link>
              </div>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="/profile" className="dropdown-item">
                    <FiUser /> Profile
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item" onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </>
  );
};

export default NavRight;
