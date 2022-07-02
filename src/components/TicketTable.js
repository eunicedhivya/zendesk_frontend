import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function TicketTable({ ticketList }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: "6%" }}>#</th>
          <th style={{ width: "69%" }}>Ticket</th>
          <th style={{ width: "10%" }}>Status</th>
          <th style={{ width: "15%" }}>Opened Date</th>
        </tr>
      </thead>
      <tbody>
        {ticketList.length ? (
          ticketList.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>
                <Link to={`/tickets/${item._id}`}>{item.subject}</Link>
              </td>
              <td>{item.ticketStatus}</td>
              <td>{item.issueDate}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No ticket show{" "}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default TicketTable;
