import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataPoints from "../components/DataPoints";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserTable from "../components/UserTable";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllusers();
  }, []);

  function getAllusers() {
    const url = "https://zendeskclone-ed.herokuapp.com/users/all";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        token: Cookies.get("token"),
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log("data", data.data);
        if (data.type === "success") {
          setUsers(data.data);
        }
      });
  }

  return (
    <div>
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <DataPoints icon={faUser} title="Total Users" number="12" />
          </Col>
          <Col>
            <DataPoints icon={faUser} title="Pending Tickets" number="8" />
          </Col>
          <Col>
            <DataPoints icon={faUser} title="Tickets Closed" number="4" />
          </Col>
        </Row>
        <Row>
          <h3>Recently added tickets</h3>
        </Row>

        <Row>
          <Col className="recent-ticket">
            {/* <TicketTable tickets={tickets} /> */}
            <UserTable users={users} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Users;
