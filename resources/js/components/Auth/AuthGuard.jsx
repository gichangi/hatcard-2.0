
import { Redirect } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const AuthGuard = ({ children }) => {

  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    //alert("called");
    return <Redirect to="/" />;
  }
  if(isLoggedIn){

  }
  return <>{children}</>;
};

export default AuthGuard;
