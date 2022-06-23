import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DataPoints({ icon, title, number }) {
  return (
    <Card className="card card-raised bg-info text-white">
      <Card.Body className="card-body px-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="me-2">
            <div className="display-5 text-white">{number}</div>
            <div className="card-text">{title}</div>
          </div>
          <div className="icon-circle bg-white-50 text-white">
            <FontAwesomeIcon icon={icon} />
          </div>
        </div>
        {/* <div className="card-text">
          <div className="d-inline-flex align-items-center">
            <i className="material-icons icon-xs">arrow_upward</i>
            <div className="caption fw-500 me-2">3%</div>
            <div className="caption">from last month</div>
          </div>
        </div> */}
      </Card.Body>
    </Card>
  );
}

export default DataPoints;
