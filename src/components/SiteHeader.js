import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

function SiteHeader() {
  return (
    <header className="siteHeader p-2">
      <Container fluid>
        <Row>
          <Col>
            <h2 className="welcomeUser">Welcome, User</h2>
          </Col>
          <Col md="auto">
            <Dropdown>
              <Dropdown.Toggle variant="outline" id="dropdown-basic">
                <FontAwesomeIcon icon={faPlus} /> Add
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/add-ticket">Ticket</Dropdown.Item>
                <Dropdown.Item href="#/add-user">User</Dropdown.Item>
                <Dropdown.Item href="#/add-product">Product</Dropdown.Item>
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
                <Dropdown.Item href="#/add-user">Help</Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Logout");
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
