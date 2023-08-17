
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../config/constant';

import useAuth from '../../hooks/useAuth';
import {useEffect} from "react";
import { useLocation } from 'react-router-dom'

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  useEffect(()=>{
    console.log('childrens')
  },[])

  if (isLoggedIn) {
    return <Redirect to={BASE_URL} />;
  }

  return <>{children}</>;
};

export default GuestGuard;
