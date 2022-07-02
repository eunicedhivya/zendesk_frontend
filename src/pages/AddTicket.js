import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { toast } from "react-toastify";

import { useContext } from "react";
import AuthContext from "../context/AuthContextProvider";

import Cookies from "js-cookie";

const formValidationSchema = Yup.object({
  subject: Yup.string().required("  Subject is required"),
  message: Yup.string().required("  Message is required"),
  issueDate: Yup.string().required("  Issue Date is required"),
});

function AddTicket() {
  const { loggedIn, userRole, firstName } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [agents, setAgents] = useState([]);

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        subject: "",
        conversation: [],
        assignee: "",
        client: "",
        message: "",
        issueDate: "",
        ticketStatus: "open",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        values.conversation.push({
          sender: firstName,
          role: userRole,
          message: values.message,
        });

        if (userRole === "client") {
          values.assignee = "unassigned";
          values.client = firstName;
        }

        console.log("onSubmit", values);
        const url = "https://zendeskclone-ed.herokuapp.com/tickets/add";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            token: Cookies.get("token"),
            ticketData: values,
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
          // console.log("client", filterUserType(data.data, "client"));
          setClients(filterUserType(data.data, "client"));
          setAgents(filterUserType(data.data, "agent"));
          // console.log("agent", filterUserType(data.data, "agent"));
        }
        // setFirstName(data.fname);
        // setLastName(data.lname);
        // setEmailId(data.email);
        // setlinklist(data);
      });
  }

  // console.log(clients);
  // console.log(agents);

  function filterUserType(inputdata, type) {
    return inputdata.filter(function (itm) {
      return itm.usertype === type;
    });
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col className="p-3" lg="10">
            <Form.Group className="">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.subject && errors.subject}
              />
              {errors.subject && touched.subject ? errors.subject : ""}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Issue Date</Form.Label>
              <Form.Control
                type="date"
                name="issueDate"
                value={values.issueDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.issueDate && errors.issueDate}
                required
              />
              {errors.issueDate && touched.issueDate ? errors.issueDate : ""}
            </Form.Group>
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
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.message && errors.message}
                  required
                />
              </FloatingLabel>
              {errors.message && touched.message ? errors.message : ""}
            </Form.Group>
            {userRole === "admin" || userRole === "agent" ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Assignee</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="assignee"
                    value={values.assignee}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.assignee && errors.assignee}
                  >
                    <option>Assign a agent</option>
                    {agents.map(function (agent) {
                      return (
                        <option key={agent._id} value={agent.fname}>
                          {agent.fname}
                        </option>
                      );
                    })}
                  </Form.Select>
                  {errors.assignee && touched.assignee ? errors.assignee : ""}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Client</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="client"
                    value={values.client}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.client && errors.client}
                  >
                    <option>Assign a client</option>
                    {clients.map(function (client) {
                      return (
                        <option key={client._id} value={client.fname}>
                          {client.fname}
                        </option>
                      );
                    })}
                  </Form.Select>
                  {errors.client && touched.client ? errors.client : ""}
                </Form.Group>
              </>
            ) : (
              ""
            )}
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddTicket;
