
import {Redirect, useLocation} from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import {useSelector} from "react-redux";
import routes from "../../routes";
import _ from 'lodash';
const AuthGuard = ({ children }) => {
  const location = useLocation();
  const userPermissions= useSelector(state => state.user.user.permissions);
  const appRoutes = routes;
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    //alert("called");
    return <Redirect to="/" />;
  }
  //This causes an error on server
  if(isLoggedIn){
    //
    //let routePermissions = _.find(appRoutes[4].routes,{path:location.pathname}).permission
/*    if(!userPermissions.some(p => routePermissions.includes(p))){
      return <Redirect to="/" />;
    }*/

  }
  return <>{children}</>;
};

export default AuthGuard;
