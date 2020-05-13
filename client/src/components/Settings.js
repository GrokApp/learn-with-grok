import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Avatar,
  Spin,
  Form,
  Input,
  InputNumber,
} from 'antd';
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import _ from 'lodash';
import {
  UserOutlined,
  MailOutlined
} from '@ant-design/icons';

import {
  fetchUser
} from "store/thunks/userThunks";

class Settings extends React.Component {
  componentWillMount() {
    const {
      fetchUser,
    } = this.props;

    fetchUser();
  }

  handleSubmit(values) {
    console.log(values);
  }

  render() {
    const {
      currentUser,
      loading,
      error
    } = this.props;

    let errorText = null;
    if (error) {
      errorText = <p style={{ textAlign: 'center', color: 'red' }}>{ error }</p>;
    }

    let content = null;
    if (loading) {
      content = <Spin />;
    } else if (!_.isEmpty(currentUser)) {
      console.log(currentUser.username);
      content = (
        <div>
          <div>
            <Avatar size={100} icon={<UserOutlined />} />
          </div>
          <Form
            name="normal_login"
            initialValues={{
              email: currentUser.email,
              username: currentUser.username
            }}
            style={{
              paddingTop: 20,
              maxWidth: 400,
              textAlign: 'left',
              margin: 'auto'
            }}
            onFinish={this.handleSubmit.bind(this)}
          >
            <p style={{ textAlign: 'left' }}>Enter a username to see how you rank on the leaderboard.</p>
            { errorText }
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email", message: "Please input your email!" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                disabled
              />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ max: 30, message: 'Username must be maximum 30 characters.' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username (optional)"
              />
            </Form.Item>
          </Form>
        </div>
      )
    }
    return (
      <Row
        justify="center"
        style={{
          padding: 24,
          minHeight: "80vh"
        }}
      >
        <Col
          style={{
            width: '95%',
            padding: 24,
            height: "50%",
            background: "#fff",
            boxShadow: "0px 2px 5px 0px rgba(50, 50, 50, 0.52)",
            textAlign: "center"
          }}
        >
        { content }
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  loading: state.user.loading,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  fetchUser: (event, data) => dispatch(fetchUser(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
