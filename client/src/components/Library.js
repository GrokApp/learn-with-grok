import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Avatar,
  Form,
  Input
} from 'antd';
import {
  Link,
} from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";

class Library extends React.Component {
  render() {
    return (
      <Row
        justify="center"
        style={{
          padding: 48,
          minHeight: "80vh"
        }}
      >
        <Col
          style={{
            maxWidth: 420,
            padding: 48,
            height: "50%",
            background: "#fff",
            boxShadow: "0px 2px 5px 0px rgba(50, 50, 50, 0.52)"
          }}
        >
          <Row>
            <Col>
              Welcome
            </Col>
            <Col>
              Bienvenue
            </Col>
            <Col>
              Bienvenidos
            </Col>
            <Col>
              Willkommen
            </Col>
          </Row>
          <p>Welcome to Grok! A little reading a day goes a long way.</p>
        </Col>
      </Row>
    );
  }
}

export default Library;
