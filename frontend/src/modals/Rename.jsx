import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSocket } from '../contexts/SocketContext.jsx';
import { closeModal } from '../slices/modalSlice.js';

const Rename = () => {
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
    name: yup.string().trim().required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });

  const f = useFormik({
    initialValues: { name: currentChannel.name },
    validationSchema,
    onSubmit: ({ name }) => {
      renameExistingChannel({ id: item.id, name });
      dispatch(closeModal());
    },
  });

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
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
            <Form.Label htmlFor="name" className="visually-hidden">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">{f.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>Отменить</Button>
            <Button type="submit" variant="primary" disabled={f.isSubmitting}>Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
