// ErrorNotification.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'antd';
import {
  HIDE_ERROR
} from "store/actions/errorActions";

const ErrorNotification = (props) => {
  const isOpen = useSelector(state => state.error.isOpen);
  const error = useSelector(state => state.error.error);

  const dispatch = useDispatch();

  function handleClose() {
    dispatch({ type: HIDE_ERROR });
  }

  return (
    <>
    {isOpen && error && (
      <Modal
          title="Error Notification"
          visible={isOpen}
          onOk={handleClose}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <p>There was an error processing the request</p>
        </Modal>
    )}
    </>
  )
}

export default ErrorNotification;
