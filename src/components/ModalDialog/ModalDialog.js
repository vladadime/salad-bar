import { Modal, Button } from 'react-bootstrap';

const ModalDialog = ({isOpen, onClose, modalContent}) => {

  return (
    <>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>{modalContent && modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent && modalContent.content}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark">
            {modalContent && modalContent.buttonActionLabel}
          </Button>
          <Button variant="danger" onClick={() => onClose(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default ModalDialog;