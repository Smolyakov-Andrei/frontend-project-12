import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useSocket } from '../contexts/SocketContext.jsx';
import filter from '../utils/filter.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { sendMessage } = useSocket();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, { resetForm }) => {
      const cleanBody = filter.clean(values.body);

      const message = {
        body: cleanBody,
        channelId: currentChannelId,
        username: user.username,
      };

      sendMessage(message);
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
          aria-label={t('chat.messagePlaceholder')}
          placeholder={t('chat.messagePlaceholder')}
          className="border-0 p-0 ps-2"
          onChange={formik.handleChange}
          value={formik.values.body}
          disabled={formik.isSubmitting}
        />
        <Button type="submit" variant="group-vertical" disabled={!formik.values.body.trim()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
