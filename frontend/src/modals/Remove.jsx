import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useSocket } from '../contexts/SocketContext.jsx';
import { closeModal } from '../slices/modalSlice.js';

const Remove = () => {
  const { deleteExistingChannel } = useSocket();
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.modal);

  const handleDelete = () => {
    deleteExistingChannel({ id: item.id });
    dispatch(closeModal());
  };

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>Отменить</Button>
          <Button variant="danger" onClick={handleDelete}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
