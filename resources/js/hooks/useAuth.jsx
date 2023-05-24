import { useContext } from 'react';

/*import FirebaseContext from '../contexts/FirebaseContext';*/
import AuthContext from "../contexts/AuthContext";
const useAuth = () => useContext(AuthContext);

export default useAuth;
