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
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import {
  checkResetPasswordToken,
  resetPassword
} from "store/thunks/userThunks";

class ResetPassword extends React.Component {
  componentDidMount() {
    const {
      checkResetPasswordToken,
    } = this.props;

    let params = queryString.parse(this.props.location.search);
    if (!params.token) {
      return;
    }

    // TODO Get token from url param
    checkResetPasswordToken({ token: params.token });
  };

  handleSubmit(values) {
    const {
      resetPassword,
    } = this.props;

    resetPassword(values);
  };

  render() {
    let {
      tokenValid,
      resetPasswordResults
    } = this.props;

    let errorText = null;

    let params = queryString.parse(this.props.location.search);
    if (!params.token) {
      errorText = <p style={{ textAlign: 'center', color: 'red' }}>Token must be supplied</p>;
    }

    if (tokenValid && !tokenValid.success) {
      errorText = <p style={{ textAlign: 'center', color: 'red' }}>{ tokenValid.message }</p>;
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
            style={{ margin: "10px 0" }}
            onFinish={this.handleSubmit.bind(this)}
          >
            <div style={{ marginBottom: 10, textAlign: 'center' }}>Reset Password</div>
            <Form.Item
              name="password"
              style={{ width: 250, marginTop: 20 }}
              rules={[
                { required: true, message: "Please input your Password!" },
                { min: 5, message: 'Password must be minimum 5 characters.' },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
            </Form.Item>
            <Form.Item
              name="reenter_password"
              style={{ width: 250, marginTop: 20 }}
              rules={[
                { required: true, message: "Please re-enter your Password!" },
                ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Re-enter Password" />
            </Form.Item>
            <Form.Item style={{ marginTop: 20 }}>
              <Row style={{ textAlign: 'center' }}>
                <Col style={{ alignSelf: 'center', margin: 'auto' }}>
                  <Button type="primary" htmlType="submit">
                    Submit
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
  tokenValid: state.user.tokenValid,
  resetPasswordResults: state.user.resetPasswordResults
});

const mapDispatchToProps = dispatch => ({
  checkResetPasswordToken: (event, data) => dispatch(checkResetPasswordToken(event)),
  resetPassword: (event, data) => dispatch(resetPassword(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPassword));
