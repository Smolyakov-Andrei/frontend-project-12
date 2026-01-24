import { createContext, useContext, useMemo } from 'react'
import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { addMessage } from '../slices/messagesSlice.js'
import { addChannel, removeChannel, renameChannel } from '../slices/channelsSlice.js'

const SocketContext = createContext({})

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch()

  const socket = useMemo(() => {
    const newSocket = io()

    newSocket.on('newMessage', payload => dispatch(addMessage(payload)))
    newSocket.on('newChannel', (payload) => {
      dispatch(addChannel(payload))
    })
    newSocket.on('removeChannel', payload => dispatch(removeChannel(payload.id)))
    newSocket.on('renameChannel', payload => dispatch(renameChannel(payload)))

    return newSocket
  }, [dispatch])

  const sendMessage = data => socket.emit('newMessage', data)

  const createNewChannel = name => new Promise((resolve, reject) => {
    socket.emit('newChannel', { name }, (response) => {
      if (response.status === 'ok') {
        resolve(response.data)
      } 
      else {
        reject()
      }
    })
  })

  const deleteExistingChannel = id => new Promise((resolve, reject) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.status === 'ok') {
        resolve()
      } 
      else {
        reject()
      }
    })
  })

  const renameExistingChannel = (id, name) => new Promise((resolve, reject) => {
    socket.emit('renameChannel', { id, name }, (response) => {
      if (response.status === 'ok') {
        resolve()
      } 
      else {
        reject()
      }
    })
  })

  const value = useMemo(() => ({
    sendMessage,
    createNewChannel,
    deleteExistingChannel,
    renameExistingChannel,
  }), [])

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
