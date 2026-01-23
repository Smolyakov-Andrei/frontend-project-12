import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocket } from '../contexts/SocketContext.jsx';
import { closeModal } from '../slices/modalSlice.js';

const Remove = () => {
  const { t } = useTranslation();
  const { deleteExistingChannel } = useSocket();
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.modal);

  const handleDelete = () => {
    deleteExistingChannel({ id: item.id });
    toast.success(t('toast.success.remove'));
    dispatch(closeModal());
  };

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t('modals.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
