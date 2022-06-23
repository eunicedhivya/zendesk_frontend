import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function AddTicket() {
  const [ticketData, setTicketData] = useState({
    subject: "",
    conversation: [],
    assignee: "",
    endUser: "",
    message: "",
  });

  const { subject, conversation, assignee, endUser, message } = ticketData;

  const onInputChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!subject || !assignee || !endUser || !message) {
      return alert(
        "Pls fill the subject, conversation, assignee, endUser, message"
      );
    }

    console.log("logindata", ticketData);
  };

  return (
    <Container fluid>
      <Form>
        <Row className="">
          <Col className="frames__col p-3" lg="3">
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="endUser"
                onChange={(e) => onInputChange(e)}
              >
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assignee</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="assignee"
                onChange={(e) => onInputChange(e)}
              >
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="frames__col p-3" lg="9">
            <Form.Group className="">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                onChange={(e) => onInputChange(e)}
                placeholder="Enter your email id"
                value={subject}
              />
            </Form.Group>
            <div
              style={{
                height: "250px",
                overflowY: "scroll",
                backgroundColor: "#FFF",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            ></div>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  name="message"
                  value={message}
                  onChange={(e) => onInputChange(e)}
                />
              </FloatingLabel>
              <Button type="submit" onClick={(e) => onSubmit(e)}>
                Submit
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddTicket;
