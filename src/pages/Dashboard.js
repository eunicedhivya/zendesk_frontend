import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataPoints from "../components/DataPoints";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import TicketTable from "../components/TicketTable";
import { useState, useEffect } from "react";

function Dashboard() {
  const [ticketList, setTicketList] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalOpen, setTotalOpen] = useState(0);
  const [totalClosed, setTotalClosed] = useState(0);

  useEffect(() => {
    getAllTickets();
  }, []);

  function getAllTickets() {
    const url = "http://localhost:4000/tickets/all";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        token: "tokenStringGoesHere",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log("data", data.data);
        if (data.type === "success") {
          // console.log("client", filterUserType(data.data, "client"));
          setTicketList(data.data);

          // console.log(getByTicketStatus(data.data, "open").length);
          // console.log(getByTicketStatus(data.data, "close").length);

          setTotalTickets(data.data.length);
          setTotalOpen(getByTicketStatus(data.data, "open").length);
          setTotalClosed(getByTicketStatus(data.data, "closed").length);
          // console.log("agent", filterUserType(data.data, "agent"));
        }
      });
  }

  function getByTicketStatus(inputdata, status) {
    return inputdata.filter(function (itm) {
      return itm.ticketStatus === status;
    });
  }

  return (
    <div>
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <DataPoints
              icon={faTicket}
              title="Total Tickets"
              number={totalTickets}
            />
          </Col>
          <Col>
            <DataPoints
              icon={faTicket}
              title="Pending Tickets"
              number={totalOpen}
            />
          </Col>
          <Col>
            <DataPoints
              icon={faTicket}
              title="Tickets Closed"
              number={totalClosed}
            />
          </Col>
        </Row>
        <Row>
          <h3>Recently added tickets</h3>
        </Row>

        <Row>
          <Col className="recent-ticket">
            {/* <TicketTable tickets={tickets} /> */}
            <TicketTable ticketList={ticketList} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
