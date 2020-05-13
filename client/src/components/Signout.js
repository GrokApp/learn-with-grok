import React from 'react';
import {
  Redirect,
} from "react-router-dom";

function Signout() {
  localStorage.removeItem('accessToken');
  return (
    <Redirect to="/" />
  );
}

export default Signout;
