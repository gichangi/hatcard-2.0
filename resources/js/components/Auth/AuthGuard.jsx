
import { Redirect } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  if(isLoggedIn){
    //alert('no');
 /*   console.log("childrensauthe")
    console.log(children)
    console.log("childrensauthe")*/
  }
  return <>{children}</>;
};

export default AuthGuard;
