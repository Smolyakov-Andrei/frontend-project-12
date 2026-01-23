import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel, setCurrentChannel } from '../slices/channelsSlice.js';

const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io();

    newSocket.on('newMessage', (payload) => dispatch(addMessage(payload)));
    newSocket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
      dispatch(setCurrentChannel(payload.id));
    });
    newSocket.on('removeChannel', (payload) => dispatch(removeChannel(payload.id)));
    newSocket.on('renameChannel', (payload) => dispatch(renameChannel(payload)));

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch]);

  const value = useMemo(() => ({
    sendMessage: (data) => socket?.emit('newMessage', data),
    createNewChannel: (data) => socket?.emit('newChannel', data),
    deleteExistingChannel: (data) => socket?.emit('removeChannel', data),
    renameExistingChannel: (data) => socket?.emit('renameChannel', data),
  }), [socket]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
