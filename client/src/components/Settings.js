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
import LanguageSelector from 'components/LanguageSelector';

import {
  fetchUser
} from "store/thunks/userThunks";

let translatedISpeakText = {
  'GB': 'I speak',
  'FR': 'Je parle',
  'ES': 'Yo hablo',
  'DEU': 'Ich spreche'
}

let translatedIveStudiedText = {
  'GB': "I've studied",
  'FR': "J'ai étudié",
  'ES': 'He estudiado',
  'DEU': 'Ich habe studiert'
}

let translatedIWantToLearnText = {
  'GB': 'I want to learn',
  'FR': 'Je veux apprendre',
  'ES': 'Quiero aprender',
  'DEU': 'Ich will lernen'
}

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nativeLanguage: null,
      languageIWantToLearn: null,
    }
  }

  componentWillMount() {
    const {
      fetchUser,
    } = this.props;

    fetchUser();
  }

  handleSubmit(values) {
    console.log(values);
  }

  handleChangeNativeLanguage(language) {
    this.setState({
      nativeLanguage: language
    });
  }

  handleChangeLanguageIWantToLearn(language) {
    this.setState({
      languageIWantToLearn: language
    });
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
            <div>
              <LanguageSelector
                siteLanguage={currentUser.native_language}
                language={currentUser.native_language}
                handleChangeLanguage={this.handleChangeNativeLanguage.bind(this)}
                menuTranslatedTexts={translatedISpeakText}
                fontSize={16}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <LanguageSelector
                siteLanguage={currentUser.native_language}
                language={currentUser.language_i_want_to_learn}
                handleChangeLanguage={this.handleChangeLanguageIWantToLearn.bind(this)}
                menuTranslatedTexts={translatedIWantToLearnText}
                fontSize={16}
              />
            </div>
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
