import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container, Row, Col, Button, Nav, Dropdown,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { fetchData, setCurrentChannel } from '../slices/channelsSlice.js'
import { openModal } from '../slices/modalSlice.js'
import MessageForm from '../components/MessageForm.jsx'

const ChatPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loadingError = useSelector(state => state.channels.error)
  const messagesBoxRef = useRef(null)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  useEffect(() => {
    if (loadingError) {
      toast.error(t('toast.error.dataLoading'))
    }
  }, [loadingError, t])

  const channels = useSelector(state => state.channels.channels)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const messages = useSelector(state => state.messages.messages)

  const currentMessages = messages.filter(msg => msg.channelId === currentChannelId)
  const currentChannel = channels.find(ch => ch.id === currentChannelId)

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight
    }
  }, [currentMessages])

  const handleAddChannel = () => dispatch(openModal({ type: 'add' }))
  const handleRemoveChannel = id => dispatch(openModal({ type: 'remove', item: { id } }))
  const handleRenameChannel = id => dispatch(openModal({ type: 'rename', item: { id } }))

  return (
    <Container fluid style={{ height: '100vh', overflow: 'hidden' }} className="my-4 rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light d-flex flex-column h-100">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2 flex-shrink-0">
            <span>{t('chat.channels')}</span>
            <Button variant="outline-primary" className="p-0" size="sm" onClick={handleAddChannel}>+</Button>
          </div>
          <Nav as="ul" fill variant="pills" className="flex-column px-2 overflow-auto">
            {channels.map(channel => (
              <Nav.Item as="li" key={channel.id} className="w-100">
                {!channel.removable
                  ? (
                      <Button
                        variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                        className="w-100 rounded-0 text-start"
                        onClick={() => dispatch(setCurrentChannel(channel.id))}
                      >
                        <span className="me-1">#</span>
                        {channel.name}
                      </Button>
                    )
                  : (
                      <Dropdown as="div" className="d-flex btn-group">
                        <Button
                          variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                          className="w-100 rounded-0 text-start text-truncate"
                          onClick={() => dispatch(setCurrentChannel(channel.id))}
                        >
                          <span className="me-1">#</span>
                          {channel.name}
                        </Button>
                        <Dropdown.Toggle
                          split
                          variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                          id={`dropdown-split-basic-${channel.id}`}
                          className="flex-grow-0"
                        >
                          <span className="visually-hidden">{t('channels.menu')}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>{t('channels.remove')}</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>{t('channels.rename')}</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        <Col className="p-0 h-100 d-flex flex-column">
          <div className="bg-light mb-4 p-3 shadow-sm small flex-shrink-0">
            <p className="m-0">
              <b>
                #
                {currentChannel?.name}
              </b>
            </p>
            <span className="text-muted">{`${currentMessages.length} ${t('chat.messages')}`}</span>
          </div>

          <div
            id="messages-box"
            className="chat-messages px-5 "
            style={{ flex: 1, overflowY: 'auto' }}
            ref={messagesBoxRef}
          >
            {currentMessages.map(message => (
              <div key={message.id} className="text-break mb-2">
                <b>{message.username}</b>
                :
                {message.body}
              </div>
            ))}
          </div>
          <div className="mt-auto px-5 py-3 flex-shrink-0">
            <MessageForm />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ChatPage
