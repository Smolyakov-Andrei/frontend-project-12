import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocket } from '../contexts/SocketContext.jsx';
import { closeModal } from '../slices/modalSlice.js';
import { renameChannel } from '../slices/channelsSlice.js';
import filter from '../utils/filter.js';

const Rename = () => {
  const { t } = useTranslation();
  const { renameExistingChannel } = useSocket();
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.modal);
  const channels = useSelector((state) => state.channels.channels);
  const channelNames = channels.map((c) => c.name);
  const currentChannel = channels.find((c) => c.id === item.id);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string().trim()
      .required(t('modals.required'))
      .min(3, t('signup.min3'))
      .max(20, t('signup.max20'))
      .notOneOf(channelNames, t('modals.unique')),
  });

  const f = useFormik({
    initialValues: { name: currentChannel.name },
    validationSchema,
    onSubmit: async ({ name }, { setSubmitting }) => {
      const cleanName = filter.clean(name);
      try {
        await renameExistingChannel(item.id, cleanName);
        
        dispatch(renameChannel({ id: item.id, name: cleanName }));
        
        toast.success(t('toast.success.rename'));
        dispatch(closeModal());
      } catch (e) {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              isInvalid={f.touched.name && f.errors.name}
              name="name"
              id="name"
              className="mb-2"
            />
            <Form.Label htmlFor="name" className="visually-hidden">{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{f.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>
              {t('modals.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={f.isSubmitting}>
              {t('modals.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
