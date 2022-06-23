import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserGroup,
  faLayerGroup,
  faStore,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";

function MainNavBar() {
  return (
    <nav className="mainNavBar">
      <Row className="text-center siteBranding">
        <h1>ZC</h1>
      </Row>
      <Row className="text-center">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon={faUserGroup} />
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon={faLayerGroup} />
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon={faStore} />
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon={faGear} />
        </Link>
      </Row>
      <Row>.</Row>
    </nav>
  );
}

export default MainNavBar;
