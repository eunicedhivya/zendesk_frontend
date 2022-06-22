import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ForgetPassword from "./pages/ForgetPassword";
import { Switch, Route } from "react-router";
// import MainNavBar from "./components/MainNavBar";
// import SiteHeader from "./components/SiteHeader";

import LoginPg from "./pages/LoginPg";

function App() {
  return (
    <div className="App">
      {/* <LoginPg /> */}
      {/* <MainNavBar />
      <SiteHeader /> */}
      <Switch>
        <Route path="/" exact>
          <LoginPg />
        </Route>
        <Route path="/forget-password">
          <ForgetPassword />
        </Route>
        {/* <Route path="/dashboard">
          <div>dashboard</div>
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
