import React, { useContext } from 'react';
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
  Redirect,
} from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import {
  MailOutlined,
  LockOutlined
} from "@ant-design/icons";
import AuthContext from 'contexts/AuthContext';

import {
  login
} from "store/thunks/userThunks";

const Signin = (props) => {
  const auth = useContext(AuthContext);
  auth.setCurrentUser(props.currentUser);

  return <Redirect to="/library" />;
}

class Login extends React.Component {
  handleSubmit(values) {
    const {
      login,
    } = this.props;

    login(values);
  };

  render() {
    let {
      loginError,
      user
    } = this.props;

    if (user && user.success) {
      localStorage.setItem('accessToken', user.accessToken);
      return <Signin currentUser={user.currentUser} />;
    }

    let errorText = null;
    if (loginError) {
      errorText = <p style={{ textAlign: 'center', color: 'red' }}>{ loginError }</p>;
    }

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
          { errorText }
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={login}
            style={{ margin: "10px 0" }}
            onFinish={this.handleSubmit.bind(this)}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, type: "email", message: "Please input your Email!" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your Password!" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <a href="#">
                {' Forgot password'}
              </a>
            </Form.Item>
            <Form.Item>
              <Row style={{ textAlign: 'center' }}>
                <Col style={{ alignSelf: 'center', margin: 'auto' }}>
                  <Button type="primary" htmlType="submit">
                    Log in
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  loginError: state.user.loginError
});

const mapDispatchToProps = dispatch => ({
  login: (event, data) => dispatch(login(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
