import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ForgetPassword from "./pages/ForgetPassword";
import { Switch, Route, Redirect } from "react-router";
// import MainNavBar from "./components/MainNavBar";
// import SiteHeader from "./components/SiteHeader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPg from "./pages/LoginPg";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";
import TicketDetailPage from "./pages/TicketDetailPage";
import AddTicket from "./pages/AddTicket";
import AssignAgent from "./pages/AssignAgent";
import AssignAgentEditPg from "./pages/AssignAgentEditPg";

import { useContext } from "react";
import AuthContext from "./context/AuthContextProvider";

function App() {
  const { loggedIn, userRole, firstName } = useContext(AuthContext);
  return (
    <div className="App">
      <ToastContainer autoClose={4000} />

      <Switch>
        <Route path="/" exact>
          <LoginPg />
        </Route>
        <Route exact path="/dashboard">
          <Layout>
            <Dashboard />
          </Layout>
        </Route>
        <Route exact path="/forget-password">
          <ForgetPassword />
        </Route>
        <Route exact path="/add-ticket">
          <Layout>
            <AddTicket />
          </Layout>
        </Route>
        <Route exact path="/add-user">
          <Layout>
            <AddUser />
          </Layout>
        </Route>
        <Route exact path="/assign-agent">
          <Layout>
            <AssignAgent />
          </Layout>
        </Route>
        <Route exact path="/assign-agent/:ticketid">
          <Layout>
            <AssignAgentEditPg />
          </Layout>
        </Route>
        <Route exact path="/tickets/:id">
          <Layout>
            <TicketDetailPage />
          </Layout>
        </Route>
        <Route exact path="/users">
          <Layout>
            <Users />
          </Layout>
        </Route>
        <Route path="**">
          <Layout>
            <NotFound />
          </Layout>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
