import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router";

import { toast } from "react-toastify";

import { useContext } from "react";
import AuthContext from "../context/AuthContextProvider";

import Cookies from "js-cookie";

function SiteHeader() {
  const history = useHistory();
  const { loggedIn, userRole, firstName, setLoggedIn } =
    useContext(AuthContext);
  console.log("userinfo", firstName, userRole);
  return (
    <header className="siteHeader p-2">
      <Container fluid>
        <Row>
          <Col>
            <h2 className="welcomeUser">
              Welcome, {firstName} <small>({userRole})</small>
            </h2>
          </Col>
          <Col md="auto">
            <Dropdown>
              <Dropdown.Toggle variant="outline" id="dropdown-basic">
                <FontAwesomeIcon icon={faPlus} /> Add
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/add-ticket">Ticket</Dropdown.Item>
                {userRole === "agent" || userRole === "admin" ? (
                  <Dropdown.Item href="/add-user">User</Dropdown.Item>
                ) : (
                  ""
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs lg="1" className="text-right">
            <Dropdown>
              <Dropdown.Toggle variant="outline" id="dropdown-basic">
                <FontAwesomeIcon icon={faUser} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    Cookies.remove("token");
                    setLoggedIn(false);
                    toast.success("Logged out!");
                    history.push("/");

                    // const url = "http://localhost:4000/users/logout";
                    // fetch(url, {
                    //   method: "GET",
                    //   credentials: "include",
                    //   headers: {
                    //     "Content-Type": "application/json",
                    //     "Access-Control-Allow-Origin": "*",
                    //     "Access-Control-Allow-Credentials": true,
                    //   },
                    // })
                    //   .then((data) => data.json())
                    //   .then((data) => {
                    //     console.log("Success:", data);

                    //   });
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default SiteHeader;
