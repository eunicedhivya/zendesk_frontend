import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";

function ForgetPassword() {
  const [user, setUser] = useState({
    email: "",
  });

  const { email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      return alert("Pls fill the email");
    }

    console.log("logindata", user);
  };

  return (
    <div className="loginPg">
      <Card className="text-center justify-content-center col-md-4 loginBox">
        <Card.Header>
          <h2>RESET PASSWORD</h2>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) => onInputChange(e)}
                placeholder="Enter your email id"
                value={email}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={(e) => onInputChange(e)}
                placeholder="Enter your password"
                value={password}
              />
            </Form.Group> */}
            <Button className="mb-3" type="submit" onClick={(e) => onSubmit(e)}>
              Send Reset Link
            </Button>
          </Form>
          <div>
            <Link to="/">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ForgetPassword;
