import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function TicketTable({ ticketList }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: "6%" }}>#</th>
          <th style={{ width: "49%" }}>Ticket</th>
          <th style={{ width: "10%" }}>Status</th>
          <th style={{ width: "15%" }}>Opened Date</th>
          <th style={{ width: "20%" }}>Product</th>
        </tr>
      </thead>
      <tbody>
        {ticketList.length ? (
          ticketList.map((item, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>
                <Link to={`/ticket/${item._id}`}>{item.subject}</Link>
              </td>
              <td>{item.status}</td>
              <td>{item.date}</td>
              <td>{item.product}</td>
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
