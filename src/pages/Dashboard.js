import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataPoints from "../components/DataPoints";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import TicketTable from "../components/TicketTable";

function Dashboard() {
  const ticketList = [
    {
      _id: 600009040440,
      subject: "File not found error",
      status: "Pending",
      message: [],
      date: "June 11, 2020",
      product: "Product 1",
    },
    {
      _id: 600009040441,
      subject: "Unable to install product from provided CD",
      status: "open",
      message: [],
      date: "June 12, 2020",
      product: "Product 2",
    },
  ];
  return (
    <div>
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <DataPoints icon={faTicket} title="Total Tickets" number="12" />
          </Col>
          <Col>
            <DataPoints icon={faTicket} title="Pending Tickets" number="8" />
          </Col>
          <Col>
            <DataPoints icon={faTicket} title="Tickets Closed" number="4" />
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
