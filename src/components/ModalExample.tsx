import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import { withCallModal } from '../hocs/withCallModal';

type ModalExampleProps = {
  onClose?: () => void;
  animation?: boolean;
};

const ModalExample: React.FC<ModalExampleProps> = ({ onClose, animation }) => {
  return (
    <Modal show={true} animation={animation} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withCallModal(ModalExample);
