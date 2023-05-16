
import { Redirect } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    alert('state')
    return <Redirect to="/" />;
  }
  if(isLoggedIn){
    //alert('no')
  }
  return <>{children}</>;
};

export default AuthGuard;