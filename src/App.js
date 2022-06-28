import { Route, Switch, Redirect } from "react-router-dom";
import BillsPage from "./pages/BillsPage";
import Layout from '../src/components/Layout/Layout';
import HomePage from "./pages/HomePage";

function App() {
 
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/homepage" />
        </Route>
        <Route path="/homepage" exact>
          <HomePage />
        </Route>
        <Route path="/billslist" exact>
          <BillsPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
