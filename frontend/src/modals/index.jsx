import React from 'react';
import { useSelector } from 'react-redux';
import Add from './Add.jsx';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';

const modals = {
  add: Add,
  rename: Rename,
  remove: Remove,
};

const Modal = () => {
  const { isOpen, type } = useSelector((state) => state.modal);

  if (!isOpen) {
    return null;
  }

  const Component = modals[type];
  return <Component />;
};

export default Modal;
