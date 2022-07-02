import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import AuthContext from "../context/AuthContextProvider";

import * as Yup from "yup";
import { useFormik } from "formik";

import { toast } from "react-toastify";

import { useContext } from "react";
const formValidationSchema = Yup.object({
  assignee: Yup.string().required("  Assignee is required"),
});

function AssignAgentEditPg() {
  const { ticketid } = useParams();
  const [agents, setAgents] = useState([]);
  // console.log(ticketid);

  const [ticketDetails, setTicketDetails] = useState({});
  const [conversations, setConversations] = useState([]);

  const { loggedIn, userRole, firstName } = useContext(AuthContext);

  useEffect(() => {
    getTicket();
  }, [ticketDetails]);

  function getTicket() {
    const url = "https://zendeskclone-ed.herokuapp.com/tickets/" + ticketid;

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
          setTicketDetails(data.data);
          setConversations(data.data.conversation);
        }
      });
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
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
          setAgents(filterUserType(data.data, "agent"));
        }
      });
  }

  function filterUserType(inputdata, type) {
    return inputdata.filter(function (itm) {
      return itm.usertype === type;
    });
  }

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        assignee: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        console.log("onSubmit", values);
        // values.sender = firstName;
        // values.role = userRole;
        const url =
          "https://zendeskclone-ed.herokuapp.com/tickets/assignee/" + ticketid;
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            token: Cookies.get("token"),
            ticketUpdate: values,
          }),
        })
          .then((data) => data.json())
          .then((data) => {
            // console.log("Success:", data);
            if (data.type === "error") {
              toast.error(data.message);
            } else if (data.type === "success") {
              toast.success(data.message);
            }
          });
      },
    });

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col className="p-3" lg="10">
          <Card>
            <Card.Header>
              <Row>
                <Form onSubmit={handleSubmit}>
                  <Col lg="10">
                    <h2 className="subject">
                      <b>Subject:</b> {ticketDetails.subject}
                    </h2>
                    <p>
                      <b>Date: </b>
                      {ticketDetails.issueDate}
                    </p>
                    <Form.Group className="mb-3">
                      <b>Assignee: </b>
                      <Form.Select
                        aria-label="Default select example"
                        name="assignee"
                        defaultValue={values.assignee}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.assignee && errors.assignee}
                      >
                        <option>unassigned</option>
                        {agents.map(function (agent) {
                          return (
                            <option key={agent._id} value={agent.fname}>
                              {agent.fname}
                            </option>
                          );
                        })}
                      </Form.Select>
                      {errors.assignee && touched.assignee
                        ? errors.assignee
                        : ""}
                    </Form.Group>
                    <p>
                      <b>Client: </b>
                      {ticketDetails.client}
                    </p>
                    <Button type="submit" className="btn-sm">
                      Update
                    </Button>
                  </Col>
                </Form>
              </Row>
            </Card.Header>
            <Card.Body className="scrollBox">
              {conversations.map(function (convo, index) {
                // console.log(convo);
                return (
                  <div key={index} className="speechBubble left">
                    <p className="message">{convo.message}</p>
                    <p className="sender">
                      {convo.sender}{" "}
                      {convo.role ? <span>{convo.role}</span> : ""}
                    </p>
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AssignAgentEditPg;
