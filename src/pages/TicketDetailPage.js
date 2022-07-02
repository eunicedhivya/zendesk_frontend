import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import * as Yup from "yup";
import { useFormik } from "formik";

import { toast } from "react-toastify";

import { useContext } from "react";
import AuthContext from "../context/AuthContextProvider";

const formValidationSchema = Yup.object({
  message: Yup.string().required("  Message is required"),
});

function TicketDetailPage() {
  const { id } = useParams();

  const [ticketDetails, setTicketDetails] = useState({});
  const [conversations, setConversations] = useState([]);

  const { loggedIn, userRole, firstName } = useContext(AuthContext);

  useEffect(() => {
    getAllTickets();
  }, [ticketDetails]);

  function getAllTickets() {
    const url = "http://localhost:4000/tickets/" + id;

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
          setTicketDetails(data.data);
          setConversations(data.data.conversation);
        }
      });
  }

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        message: "",
        sender: "",
        role: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        values.sender = firstName;
        values.role = userRole;

        const url = "http://localhost:4000/tickets/" + id;
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
                <Col lg="10">
                  <h2 className="subject">
                    <b>Subject:</b> {ticketDetails.subject}
                  </h2>
                  <p>
                    <b>Date: </b>
                    {ticketDetails.issueDate} . <b>Assignee: </b>
                    {ticketDetails.assignee} . <b>Client: </b>
                    {ticketDetails.client}
                  </p>
                </Col>
                <Col lg="2" className="text-right">
                  <Button
                    onClick={() => {
                      const closeurl =
                        "http://localhost:4000/tickets/close/" + id;

                      fetch(closeurl, {
                        method: "PUT",
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
                          // console.log("Success:", data);
                          if (data.type === "error") {
                            toast.error(data.message);
                          } else if (data.type === "success") {
                            toast.success(data.message);
                          }
                        });
                    }}
                  >
                    Close ticket
                  </Button>
                </Col>
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
            {ticketDetails.ticketStatus === "closed" ? (
              ""
            ) : (
              <Card.Footer className="scrollBox">
                <Form onSubmit={handleSubmit}>
                  <Row className="justify-content-center">
                    <Col className="p-3" lg="12">
                      <Form.Group className="">
                        <FloatingLabel
                          controlId="floatingTextarea"
                          label="Comments"
                          className="mb-3"
                        >
                          <Form.Control
                            as="textarea"
                            style={{ height: "100px" }}
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.message && errors.message}
                            required
                          />
                        </FloatingLabel>
                        {errors.message && touched.message
                          ? errors.message
                          : ""}
                      </Form.Group>
                      <Button type="submit">Submit</Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TicketDetailPage;
