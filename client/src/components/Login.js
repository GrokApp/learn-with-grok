import React from 'react';
import {
  Row,
  Col,
  Button,
  Avatar,
  Form,
  Input
} from 'antd';
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import {
  UserOutlined,
  LockOutlined
} from "@ant-design/icons";

function login(user) {
  console.log(user);
}

function Login() {
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
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={login}
          style={{ margin: "10px 0" }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input prefix={<LockOutlined />} placeholder="Password" />
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

export default Login;
