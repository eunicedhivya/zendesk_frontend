import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ForgetPassword from "./pages/ForgetPassword";
import { Switch, Route } from "react-router";
// import MainNavBar from "./components/MainNavBar";
import SiteHeader from "./components/SiteHeader";

import LoginPg from "./pages/LoginPg";
import AddTicket from "./pages/AddTicket";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      {/* <LoginPg /> */}
      {/* <MainNavBar />*/}
      {/* <SiteHeader /> */}
      {/* <Layout>
        <Dashboard />
      </Layout> */}

      <Switch>
        <Route path="/" exact>
          <LoginPg />
        </Route>
        <Route path="/forget-password">
          <ForgetPassword />
        </Route>
        <Route path="/add-ticket">
          <Layout>
            <AddTicket />
          </Layout>
        </Route>
        <Route exact path="/dashboard">
          <Layout>
            <Dashboard />
          </Layout>
        </Route>
        <Route path="**">
          <h1>404 Page not found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
