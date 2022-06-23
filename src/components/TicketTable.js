import Table from "react-bootstrap/Table";

function TicketTable() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: "10%" }}>#</th>
          <th style={{ width: "50%" }}>Ticket</th>
          <th style={{ width: "20%" }}>Status</th>
          <th style={{ width: "20%" }}>Opened Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="4" className="text-center">
            No ticket show{" "}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default TicketTable;
