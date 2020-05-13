import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Avatar,
  Form,
  Input,
  Divider
} from 'antd';
import {
  Link,
} from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import jwtDecode from 'jwt-decode';

class SignupSuccessful extends React.Component {
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
            maxWidth: 500,
            padding: 48,
            height: "50%",
            background: "#fff",
            boxShadow: "0px 2px 5px 0px rgba(50, 50, 50, 0.52)"
          }}
        >
          <Row gutter={16} style={{ textAlign: 'center' }}>
            <Col style={{ textAlign: 'center', margin: 'auto' }}>
              <b>Welcome</b>
            </Col>
            <Col style={{ textAlign: 'center', margin: 'auto' }}>
              <b>Bienvenue</b>
            </Col>
            <Col style={{ textAlign: 'center', margin: 'auto' }}>
              <b>Bienvenidos</b>
            </Col>
            <Col style={{ textAlign: 'center', margin: 'auto' }}>
              <b>Willkommen</b>
            </Col>
          </Row>
          <Divider />
          <p style={{ textAlign: 'left', marginTop: 20, fontSize: 18 }}>Welcome to Grok! A little reading a day goes a long way. Challenge yourself to read a little everyday and you will be advancing in no time.</p>
          <div style={{ textAlign: 'center', margin: 'auto', marginTop: 20 }}>
            <Link to="/library">
              <Button type="primary">
                Continue
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    );
  }
}

export default SignupSuccessful;
