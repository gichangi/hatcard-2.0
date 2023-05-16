
import { BrowserRouter as Router } from 'react-router-dom';

import { FirebaseProvider } from './contexts/FirebaseContext';
import {AuthProvider} from "./contexts/AuthContext";
//import { JWTProvider } from "./contexts/JWTContext";
//import { Auth0Provider } from "./contexts/Auth0Context";

import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';

const App = () => {
  return (
    <>
      <Router basename={BASENAME}>
        <AuthProvider>{renderRoutes(routes)}</AuthProvider>
      </Router>
    </>
  );
};

export default App;
