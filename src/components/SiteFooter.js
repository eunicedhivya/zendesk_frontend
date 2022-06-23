import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function SiteFooter() {
  return (
    <footer className="siteFooter p-2 mb-4 justify-content-center">
      <Container fluid>
        <Row className="text-center">Copyright Text goes here</Row>
      </Container>
    </footer>
  );
}

export default SiteFooter;
