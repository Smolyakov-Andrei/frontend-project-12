import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { fetchData, setCurrentChannel } from '../slices/channelsSlice.js';
// В будущем тут будет импорт формы нового сообщения

const ChatPage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.messages);
  
  const currentMessages = messages.filter((msg) => msg.channelId === currentChannelId);
  const currentChannel = channels.find((ch) => ch.id === currentChannelId);

  return (
    <Container fluid className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        {/* Каналы */}
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <Button variant="outline-primary" className="p-0" size="sm">+</Button>
          </div>
          <Nav as="ul" fill variant="pills" className="flex-column px-2">
            {channels.map((channel) => (
              <Nav.Item as="li" key={channel.id} className="w-100">
                <Button
                  variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start"
                  onClick={() => dispatch(setCurrentChannel(channel.id))}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        
        {/* Сообщения */}
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># {currentChannel?.name}</b></p>
              <span className="text-muted">{currentMessages.length} сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {currentMessages.map((message) => (
                <div key={message.id} className="text-break mb-2">
                  <b>{message.username}</b>: {message.body}
                </div>
              ))}
            </div>
            <div className="mt-auto px-5 py-3">
              {/* Тут будет форма для нового сообщения */}
              <p>Форма для нового сообщения</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
