import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice.js';

const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const socket = useMemo(() => {
    const newSocket = io();

    // Этот слушатель ловит сообщения от ДРУГИХ пользователей
    newSocket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });

    return newSocket;
  }, [dispatch]);

  // Финальная, простая функция-«отправлялка» без Promise и таймаутов
  const sendMessage = (message) => {
    socket.emit('newMessage', message);
  };

  const value = useMemo(() => ({
    sendMessage,
  }), [sendMessage]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
