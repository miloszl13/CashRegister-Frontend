import { Route, Switch, Redirect } from "react-router-dom";
import BillsPage from "./pages/BillsPage";
import Layout from "../src/components/Layout/Layout";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import LoginPage from "./pages/Auth/LoginPage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        {!authCtx.isLoggedIn && (
          <Switch>
          <Route path="/auth">
            <LoginPage />
          </Route>
          <Route path="*">
          <Redirect to="/auth" />
          </Route>
          </Switch>
        )}
        <Route path="/homepage" exact>
          <HomePage />
        </Route>
        <Route path="/billslist" exact>
          <BillsPage />
        </Route>
        <Route path="*">
          <Redirect to="/homepage" />
          </Route>
      </Switch>
    </Layout>
  );
}

export default App;
