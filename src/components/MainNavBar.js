import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTicket,
  faUserGroup,
  faLayerGroup,
  faStore,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";

import { useContext } from "react";
import AuthContext from "../context/AuthContextProvider";

function MainNavBar() {
  const { loggedIn, userRole, firstName, setLoggedIn } =
    useContext(AuthContext);
  return (
    <nav className="mainNavBar">
      <Row className="text-center siteBranding">
        <h1>ZC</h1>
      </Row>
      <Row className="text-center mainNav">
        <Link to="/dashboard">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        {userRole === "agent" || userRole === "admin" ? (
          <>
            <Link to="/assign-agent">
              <FontAwesomeIcon icon={faTicket} />
            </Link>
            <Link to="/users">
              <FontAwesomeIcon icon={faUserGroup} />
            </Link>
          </>
        ) : (
          ""
        )}
      </Row>
      <Row>.</Row>
    </nav>
  );
}

export default MainNavBar;
