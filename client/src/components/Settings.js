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
  Upload,
  message
} from 'antd';
import {
  Link,
} from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import _ from 'lodash';
import {
  UserOutlined,
  MailOutlined,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';
import LanguageSelector from 'components/LanguageSelector';

import {
  fetchUser,
  uploadAvatar,
  updateUser,
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

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nativeLanguage: null,
      languageIWantToLearn: null,
      imageUrl: null,
      loading: false
    }
  }

  componentWillMount() {
    const {
      fetchUser,
    } = this.props;

    fetchUser();
  }

  componentDidUpdate(prevProps) {
    const {
      uploadStatus,
      user
    } = this.props;

    const {
      imageUrl
    } = this.state;

    console.log(this.props);
    if (uploadStatus && uploadStatus.success) {
      if (imageUrl !== uploadStatus.imageUrl) {
        this.setState({
          imageUrl: uploadStatus.imageUrl
        });
      }
    }
  }

  handleSubmit(values) {
    console.log(values);
    const {
      updateUser,
    } = this.props;
    const {
      nativeLanguage,
      languageIWantToLearn,
      imageUrl
    } = this.state;
    let payload = values;
    if (nativeLanguage) {
      payload.nativeLanguage = nativeLanguage;
    }
    if (languageIWantToLearn) {
      payload.languageIWantToLearn = languageIWantToLearn;
    }
    if (imageUrl) {
      payload.imageUrl = imageUrl;
    }

    updateUser(payload);
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

  handleChange = info => {
    const {
      uploadAvatar,
    } = this.props;
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        uploadAvatar({ image: imageUrl });
      });
    }
  };

  render() {
    const {
      currentUser,
      loading,
      error,
    } = this.props;

    console.log(currentUser);

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    let {
      imageUrl,
      nativeLanguage,
      languageIWantToLearn
    } = this.state;

    console.log(this.props);

    let errorText = null;
    if (error) {
      errorText = <p style={{ textAlign: 'center', color: 'red' }}>{ error }</p>;
    }

    let submitButtons = (
      <Row style={{ textAlign: 'center', marginTop: 40 }} gutter={16}>
        <Col span={4} />
        <Col span={8} style={{ alignSelf: 'center', margin: 'auto' }}>
          <Link to="/library">
            <Button onClick={() => this.setState({ currentStep: 0 })}>
              Cancel
            </Button>
          </Link>
        </Col>
        <Col span={8} style={{ alignSelf: 'center', margin: 'auto' }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Col>
        <Col span={4} />
      </Row>
    );

    if (isMobile) {
      submitButtons = (
        <Row style={{ textAlign: 'center', marginTop: 20 }} gutter={16}>
          <Col span={11} style={{ alignSelf: 'center', margin: 'auto' }}>
            <Link to="/library">
              <Button onClick={() => this.setState({ currentStep: 0 })}>
                Cancel
              </Button>
            </Link>
          </Col>
          <Col span={2} />
          <Col span={11} style={{ alignSelf: 'center', margin: 'auto' }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Col>
        </Row>
      );
    }

    let content = null;
    if (loading) {
      content = <Spin />;
    } else if (!_.isEmpty(currentUser)) {
      imageUrl = imageUrl || currentUser.avatar_url;
      nativeLanguage = nativeLanguage || currentUser.native_language;
      languageIWantToLearn = languageIWantToLearn || currentUser.language_i_want_to_learn;
      content = (
        <div>
          <div>
            <div style={{ display: 'inline-block', margin: 'auto' }}>
              <Upload
                name="avatar"
                style={{ width: '50%' }}
                listType="picture-card"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <Avatar src={imageUrl} size={100} alt="avatar" /> : uploadButton}
              </Upload>
            </div>
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
                language={nativeLanguage}
                handleChangeLanguage={this.handleChangeNativeLanguage.bind(this)}
                menuTranslatedTexts={translatedISpeakText}
                fontSize={16}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <LanguageSelector
                siteLanguage={currentUser.native_language}
                language={languageIWantToLearn}
                handleChangeLanguage={this.handleChangeLanguageIWantToLearn.bind(this)}
                menuTranslatedTexts={translatedIWantToLearnText}
                fontSize={16}
              />
            </div>
            { submitButtons }
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
  uploadStatus: state.user.uploadStatus,
  currentUser: state.user.currentUser,
  loading: state.user.loading,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  fetchUser: (event, data) => dispatch(fetchUser(event)),
  uploadAvatar: (event, data) => dispatch(uploadAvatar(event)),
  updateUser: (event, data) => dispatch(updateUser(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
