import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function UserTable({ users }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: "6%" }}>#</th>
          <th style={{ width: "50%" }}>User</th>
          <th style={{ width: "19%" }}>Email</th>
          <th style={{ width: "10%" }}>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.length ? (
          users.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>
                <Link to={`/users/${item._id}`}>{item.fname}</Link>
              </td>
              <td>{item.email}</td>
              <td>{item.usertype}</td>
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

export default UserTable;
