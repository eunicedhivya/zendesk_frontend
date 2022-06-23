import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className="d-flex align-items-center justify-content-center mb-5">
          <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3">
              {" "}
              <span className="text-danger">Opps!</span> Page not found.
            </p>
            <p className="lead">The page you’re looking for doesn’t exist.</p>
            <Link to="/dashboard" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
