import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginPg() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Pls fill the email / password");
    }

    console.log("logindata", user);
  };

  return (
    <div className="loginPg">
      <Card className="text-center justify-content-center col-md-4 loginBox">
        <Card.Header>
          <h2>LOGIN</h2>
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
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={(e) => onInputChange(e)}
                placeholder="Enter your password"
                value={password}
              />
            </Form.Group>
            <Button className="mb-3" type="submit" onClick={(e) => onSubmit(e)}>
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
