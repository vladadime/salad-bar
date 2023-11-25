import { Modal, Button } from 'react-bootstrap';

const ModalDialog = ({title, isOpen, onClose, modalContent, buttonActionLabel}) => {

  return (
    <>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark">
            {buttonActionLabel}
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