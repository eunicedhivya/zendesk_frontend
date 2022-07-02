import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { useFormik } from "formik";

import { toast } from "react-toastify";

const formValidationSchema = Yup.object({
  fname: Yup.string().required("  First name is required"),
  lname: Yup.string().required("  Last name is required"),
  usertype: Yup.string().required("  User type is required"),
  email: Yup.string().email().required("  Email is required"),
  password: Yup.string().min(6).required("  Password is required"),
});

function AddTicket() {
  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        fname: "",
        lname: [],
        email: "",
        usertype: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        // console.log("onSubmit", values);
        // const url = "https://urlshortener-clone.herokuapp.com/users/signup";
        const url = "http://localhost:4000/users/signup";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(values),
        })
          .then((data) => data.json())
          .then((data) => {
            console.log("Success:", data);
            if (data.type === "error") {
              toast.error(data.message);
            } else if (data.type === "success") {
              toast.success(data.message);
              // history.push("/");
            }
          });
      },
    });
  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col className="p-3" lg="8">
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={values.fname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fname && errors.fname}
              />
              {errors.fname && touched.fname ? errors.fname : ""}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={values.lname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lname && errors.lname}
              />
              {errors.lname && touched.lname ? errors.lname : ""}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              {errors.email && touched.email ? errors.email : ""}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="usertype"
                value={values.usertype}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.usertype && errors.usertype}
              >
                <option>Choose</option>
                <option value="client">Client</option>
                <option value="agent">Agent</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              {errors.password && touched.password ? errors.password : ""}
            </Form.Group>
            <Button type="submit">Add user</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddTicket;
