import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useSocket } from '../contexts/SocketContext.jsx';
import { addMessage } from '../slices/messagesSlice.js'; // <-- КЛЮЧЕВОЙ ИМПОРТ

const MessageForm = () => {
  const { user } = useAuth();
  const { sendMessage } = useSocket();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch(); // <-- Получаем dispatch для добавления сообщения
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, { resetForm }) => {
      const message = {
        body: values.body,
        channelId: currentChannelId,
        username: user.username,
      };

      // 1. Отправляем на сервер (для других)
      sendMessage(message);
      
      // 2. Добавляем в свой стор (для себя, мгновенно)
      // Сервер не вернет нам наше же сообщение, поэтому добавляем его вручную
      // ID сообщения сгенерируется на сервере, но для отображения это не критично
      dispatch(addMessage(message));

      // 3. Очищаем форму
      resetForm();
      inputRef.current.focus();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup>
        <Form.Control
          ref={inputRef}
          name="body"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
          onChange={formik.handleChange}
          value={formik.values.body}
        />
        <Button type="submit" variant="group-vertical" disabled={!formik.values.body.trim()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
