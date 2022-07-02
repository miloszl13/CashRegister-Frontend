import { Route, Switch, Redirect } from "react-router-dom";
import BillsPage from "./pages/BillsPage";
import Layout from '../src/components/Layout/Layout';
import HomePage from "./pages/HomePage";
import {useContext} from 'react';
import AuthContext from './store/auth-context';
import AuthPage from "./pages/Auth/AuthPage";

function App() {
  const authCtx=useContext(AuthContext);
 
  return (
    <Layout>
<Switch>
        
        {/*<Route path="/" exact>
          <Redirect to="/homepage" />
        </Route>*/}
       {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        {/*
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route> */}
        
        
        
        {/* <Route path="/homepage" exact>
          <HomePage />
        </Route>
        <Route path="/billslist" exact>
          <BillsPage />
        </Route>
        <Route path='*'>
          <Redirect to='/'/>
        </Route> */}
      </Switch>
    </Layout>
      
    
  );
}

export default App;
