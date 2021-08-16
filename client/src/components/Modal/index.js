import { Nav, Modal, Tab } from "react-bootstrap";
// import { useState } from "react";
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";

const UserModal = (props) => {
  // const [showModal, setShowModal] = useState(false);
  const { showModal, setShowModal } = props;
  return (
    <>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
        dialogClassName={"primaryModal"}
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login" id="modalContainer">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane dialogueClassName={"logButton"} eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default UserModal;
