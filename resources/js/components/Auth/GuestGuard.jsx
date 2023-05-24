
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../config/constant';

import useAuth from '../../hooks/useAuth';
import {useEffect} from "react";

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  useEffect(()=>{
    console.log('childrens')
  },[])

  if (isLoggedIn) {
    //alert('guest')
    return <Redirect to={BASE_URL} />;
  }

  return <>{children}</>;
};

export default GuestGuard;
