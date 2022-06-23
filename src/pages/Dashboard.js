import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataPoints from "../components/DataPoints";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import TicketTable from "../components/TicketTable";

function Dashboard() {
  return (
    <div>
      <Container>
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
            <TicketTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
