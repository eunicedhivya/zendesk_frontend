import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

import * as Yup from "yup";
import { useFormik } from "formik";

import AuthContext from "../context/AuthContextProvider";

const formValidationSchema = Yup.object({
  email: Yup.string().email().required("  Email is required"),
  password: Yup.string().required("  Password is required"),
});

function LoginPg() {
  const history = useHistory();
  const { loggedIn, setLoggedIn, setUserInfo, setFirstName, setUserRole } =
    useContext(AuthContext);
  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        console.log("onSubmit", values);
        // Cookies.set("token", "XYXZZXX");
        const url = "https://zendeskclone-ed.herokuapp.com/users/login";
        fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
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
              console.log(data);
              if (data.message === "Login Successful") {
                toast.success(data.message);
                setLoggedIn(true);
                Cookies.set("token", data.token);
                history.push("/dashboard");
                setUserInfo(data.user);
                setLoggedIn(data.status);
                setFirstName(data.user.fname);
                setUserRole(data.user.role);
              }
            }
          });
      },
    });
  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });

  // const { email, password } = user;

  // const onInputChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   if (!email || !password) {
  //     return alert("Pls fill the email / password");
  //   }

  //   console.log("logindata", user);
  // };

  return (
    <div className="loginPg">
      <Card className="text-center justify-content-center col-md-4 loginBox">
        <Card.Header>
          <h2>LOGIN</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
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
            </Form.Group>
            <Button className="mb-3" type="submit">
              Login
            </Button>
          </Form>
          <div>
            <Link to="/forget-password">Forget Password</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPg;
