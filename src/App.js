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
import AddTicketByClient from "./pages/AddTicketByClient";
import AddTicketByAgent from "./pages/AddTicketByAgent";
import AddTicketByAdmin from "./pages/AddTicketByAdmin";

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
        <Route path="/forget-password">
          <ForgetPassword />
        </Route>
        {userRole === "client" ? (
          <Route path="/add-ticket">
            <Layout>
              <AddTicketByClient />
            </Layout>
          </Route>
        ) : (
          ""
        )}
        {userRole === "agent" ? (
          <Route path="/add-ticket">
            <Layout>
              <AddTicketByAgent />
            </Layout>
          </Route>
        ) : (
          ""
        )}
        {userRole === "admin" ? (
          <Route path="/add-ticket">
            <Layout>
              <AddTicketByAdmin />
            </Layout>
          </Route>
        ) : (
          ""
        )}

        <Route path="/add-user">
          <Layout>
            <AddUser />
          </Layout>
        </Route>
        <Route path="/add-product">
          <Layout>
            <>Products</>
          </Layout>
        </Route>
        <Route path="/tickets/:id">
          <Layout>
            <TicketDetailPage />
          </Layout>
        </Route>
        <Route path="/users">
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
