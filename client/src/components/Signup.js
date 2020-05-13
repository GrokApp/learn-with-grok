import React, { useContext } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Avatar,
  Form,
  Input,
  InputNumber,
  Steps,
  Radio,
  Divider
} from 'antd';
import {
  Link,
  Redirect,
} from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import _ from 'lodash';
import {
  UserOutlined,
  LockOutlined,
  RightOutlined,
  LeftOutlined,
  PlusOutlined,
  MailOutlined,
} from "@ant-design/icons";
import LanguageSelector from 'components/LanguageSelector';
import AuthContext from 'contexts/AuthContext';
import { SUPPORTED_LANGUAGES } from 'grokConstants';

import {
  userSignup
} from "store/thunks/userThunks";

const { Step } = Steps;

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

const Signin = () => {
  const auth = useContext(AuthContext);
  auth.setLoggedIn(true);

  return <Redirect to="/success" />;
}

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      hasStudiedForeignLanguage: null,
      languageHistory: [],
      nativeLanguage: null,
      languageIWantToLearn: null,
      currentIveStudiedLanguage: null,
      currentYearsOfStudy: null,
      currentProficiencyLevel: null,
    }
  }

  handleSubmit(values) {
    const {
      currentIveStudiedLanguage,
      currentYearsOfStudy,
      currentProficiencyLevel,
      languageHistory,
      nativeLanguage,
      languageIWantToLearn,
      hasStudiedForeignLanguage,
    } = this.state;

    const {
      userSignup,
    } = this.props;

    if (hasStudiedForeignLanguage) {
      // Add the last language entered to languageHistory
      languageHistory.push({
        language: currentIveStudiedLanguage,
        yearsOfStudy: currentYearsOfStudy,
        proficiencyLevel: currentProficiencyLevel,
      });
    }

    let payload = values;
    payload.languageHistory = languageHistory;
    payload.nativeLanguage = nativeLanguage || 'GB';
    payload.languageIWantToLearn = languageIWantToLearn;
    payload.hasStudiedForeignLanguage = hasStudiedForeignLanguage;

    userSignup(payload);
  };

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

  handleChangeHasStudiedForeignLanguage(e) {
    let hasStudied = e.target.value;
    this.setState({
      hasStudiedForeignLanguage: hasStudied,
    });
  }

  handleChangeIveStudiedLanguage(language) {
    this.setState({
      currentIveStudiedLanguage: language
    });
  }

  handleChangeYearsOfStudy(value) {
    this.setState({
      currentYearsOfStudy: value
    });
  }

  handleChangeProficiencyLevel(e) {
    let proficiencyLevel = e.target.value;
    this.setState({
      currentProficiencyLevel: proficiencyLevel,
    });
  }

  addAnotherLanguage() {
    const {
      currentIveStudiedLanguage,
      currentYearsOfStudy,
      currentProficiencyLevel,
      languageHistory
    } = this.state;

    languageHistory.push({
      language: currentIveStudiedLanguage,
      yearsOfStudy: currentYearsOfStudy,
      proficiencyLevel: currentProficiencyLevel,
    });

    this.setState({
      currentIveStudiedLanguage: null,
      currentYearsOfStudy: null,
      currentProficiencyLevel: null,
      languageHistory: languageHistory,
    })
  }

  renderLanguageHistory() {
    const {
      languageHistory,
    } = this.state;

    const {
      siteLanguage,
    } = this.props;

    if (languageHistory.length === 0) {
      return null;
    }

    let languageHistoryFragments = [];
    languageHistory.forEach((languageStudied) => {
      languageHistoryFragments.push(
        <div style={{ textAlign: 'center' }}>
          <Divider />
          <LanguageSelector
            siteLanguage={siteLanguage}
            language={languageStudied.language}
            disabled
            menuTranslatedTexts={translatedIveStudiedText}
            fontSize={16}
          />
          <div style={{ marginTop: 20, fontSize: 16 }}>
            Years of Study
            <InputNumber style={{ marginLeft: 10 }} disabled value={languageStudied.yearsOfStudy} />
          </div>
          <div style={{ marginTop: 20, fontSize: 16 }}>
            <Radio.Group
              disabled
              value={languageStudied.proficiencyLevel}
            >
              <Radio.Button value="beginner">Beginner</Radio.Button>
              <Radio.Button value="novice">Novice</Radio.Button>
              <Radio.Button value="intermediate">Intermediate</Radio.Button>
              <Radio.Button value="fluent">Fluent</Radio.Button>
              <Radio.Button value="native">Native</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      );
    });

    return languageHistoryFragments;
  }

  render() {
    let {
      currentStep,
      hasStudiedForeignLanguage,
      nativeLanguage,
      languageIWantToLearn,
      currentIveStudiedLanguage,
      currentProficiencyLevel,
      currentYearsOfStudy,
      languageHistory,
    } = this.state;

    nativeLanguage = nativeLanguage || 'GB';

    const {
      siteLanguage,
      signupError,
      user,
    } = this.props;


    if (user && user.success) {
      localStorage.setItem('accessToken', user.accessToken);
      return <Signin />;
    }

    let errorText = null;
    if (signupError) {
      let linkToLogin = null;
      if (signupError === "User already exists") {
        linkToLogin = (
          <span>
            {'. To login'}
            <Link to={{
              pathname: '/login',
            }}>
              {' click here'}
            </Link>
          </span>
        );
      }
      errorText = <p style={{ textAlign: 'center', color: 'red' }}>{ signupError }{ linkToLogin }</p>;
    }

    let exclusionList = [nativeLanguage];
    languageHistory.forEach((languageStudied) => {
      // TODO if there are no more available languages the Add Another button should be disabled
      exclusionList.push(languageStudied.language);
    });

    let addAnotherDisabled = false;
    if (hasStudiedForeignLanguage) {
      addAnotherDisabled = !(currentIveStudiedLanguage && currentProficiencyLevel && (currentYearsOfStudy !== null));
    }
    if (_.differenceWith(Object.keys(SUPPORTED_LANGUAGES), exclusionList, _.isEqual).length === 1) {
      addAnotherDisabled = true;
    }
    let nextDisabled = false;
    if (hasStudiedForeignLanguage) {
      nextDisabled = (languageHistory.length === 0) && addAnotherDisabled;
    }
    if (!languageIWantToLearn) {
      nextDisabled = true;
    }

    let nextButtons = (
      <div>
        <Divider />
        <Row style={{ textAlign: 'center', marginTop: 20 }} gutter={16}>
          <Col span={4} />
          <Col span={8} style={{ alignSelf: 'center', margin: 'auto' }}>
            <Button onClick={this.addAnotherLanguage.bind(this)} disabled={addAnotherDisabled}>
              <PlusOutlined />
              Add another language
            </Button>
          </Col>
          <Col span={8} style={{ alignSelf: 'center', margin: 'auto' }}>
            <Button type="primary" onClick={() => this.setState({ currentStep: 1 })} disabled={nextDisabled}>
              Next
              <RightOutlined />
            </Button>
          </Col>
          <Col span={4} />
        </Row>
      </div>
    );

    if (isMobile) {
      nextButtons = (
        <div>
          <Divider />
          <Row style={{ textAlign: 'center' }} gutter={16}>
            <Col span={11} style={{ alignSelf: 'center', margin: 'auto' }}>
              <Button onClick={this.addAnotherLanguage.bind(this)} disabled={addAnotherDisabled}>
                <PlusOutlined />
                Add another language
              </Button>
            </Col>
            <Col span={2} />
            <Col span={11} style={{ alignSelf: 'center', margin: 'auto' }}>
              <Button type="primary" onClick={() => this.setState({ currentStep: 1 })} disabled={nextDisabled}>
                Next
                <RightOutlined />
              </Button>
            </Col>
          </Row>
        </div>
      );
    }

    let languageHistoryContent = null;
    if (hasStudiedForeignLanguage !== null) {
      if (!hasStudiedForeignLanguage) {
        languageHistoryContent = (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <div>That's ok! We'll start you off as a beginner. Read a little bit everyday and you will pick up more vocabulary in no time!</div>
            <Form.Item style={{ marginTop: 20 }}>
              <Row style={{ textAlign: 'center' }}>
                <Col style={{ alignSelf: 'center', margin: 'auto' }}>
                  <Button type="primary" onClick={() => this.setState({ currentStep: 1 })} disabled={nextDisabled}>
                    Next
                    <RightOutlined />
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </div>
        );
      } else {
        let languagesStudied = this.renderLanguageHistory();

        let yearsOfStudy = null;
        let proficiencyLevel = null;
        let addAnother = nextButtons;
        if (currentIveStudiedLanguage) {
          yearsOfStudy = (
            <div style={{ marginTop: 20, fontSize: 16 }}>
              Years of Study
              <InputNumber style={{ marginLeft: 10 }} min={0} onChange={this.handleChangeYearsOfStudy.bind(this)} />
            </div>
          );

          proficiencyLevel = (
            <div style={{ marginTop: 20, fontSize: 16 }}>
              <Radio.Group
                onChange={this.handleChangeProficiencyLevel.bind(this)}
                value={currentProficiencyLevel}
              >
                <Radio.Button value="beginner">Beginner</Radio.Button>
                <Radio.Button value="novice">Novice</Radio.Button>
                <Radio.Button value="intermediate">Intermediate</Radio.Button>
                <Radio.Button value="fluent">Fluent</Radio.Button>
                <Radio.Button value="native">Native</Radio.Button>
              </Radio.Group>
            </div>
          );
        }
        languageHistoryContent = (
          <div style={{ textAlign: 'center' }}>
            { languagesStudied }
            <Divider />
            <LanguageSelector
              siteLanguage={siteLanguage}
              language={currentIveStudiedLanguage}
              handleChangeLanguage={this.handleChangeIveStudiedLanguage.bind(this)}
              menuTranslatedTexts={translatedIveStudiedText}
              exclusionList={exclusionList}
              fontSize={16}
            />
            { yearsOfStudy }
            { proficiencyLevel }
            { addAnother }
          </div>
        );
      }
    }

    let languageHistoryForm = (
      <div
        style={{ margin: "10px 0" }}
      >
        <div style={{ textAlign: 'center' }}>
          <div>
            <LanguageSelector
              siteLanguage={siteLanguage}
              language={nativeLanguage}
              handleChangeLanguage={this.handleChangeNativeLanguage.bind(this)}
              menuTranslatedTexts={translatedISpeakText}
              fontSize={16}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <LanguageSelector
              siteLanguage={siteLanguage}
              language={languageIWantToLearn}
              handleChangeLanguage={this.handleChangeLanguageIWantToLearn.bind(this)}
              menuTranslatedTexts={translatedIWantToLearnText}
              fontSize={16}
            />
          </div>
          <Divider />
          <div>Have you studied a Foreign Language?</div>
          <Radio.Group
            onChange={this.handleChangeHasStudiedForeignLanguage.bind(this)}
            style={{ marginTop: 10 }}
            value={hasStudiedForeignLanguage}
          >
            <Radio.Button value={true}>Yes</Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </div>
        { languageHistoryContent }
      </div>
    );

    let submitButtons = (
      <Row style={{ textAlign: 'center' }} gutter={16}>
        <Col span={4} />
        <Col span={8} style={{ alignSelf: 'center', margin: 'auto' }}>
          <Button onClick={() => this.setState({ currentStep: 0 })}>
            <LeftOutlined />
            Previous
          </Button>
        </Col>
        <Col span={8} style={{ alignSelf: 'center', margin: 'auto' }}>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
        </Col>
        <Col span={4} />
      </Row>
    );

    if (isMobile) {
      submitButtons = (
        <Row style={{ textAlign: 'center' }} gutter={16}>
          <Col span={11} style={{ alignSelf: 'center', margin: 'auto' }}>
            <Button onClick={() => this.setState({ currentStep: 0 })}>
              <LeftOutlined />
              Previous
            </Button>
          </Col>
          <Col span={2} />
          <Col span={11} style={{ alignSelf: 'center', margin: 'auto' }}>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Col>
        </Row>
      );
    }

    let signupForm = (
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        style={{
          paddingTop: 20,
          maxWidth: 400,
          textAlign: 'center',
          margin: 'auto'
        }}
        onFinish={this.handleSubmit.bind(this)}
      >
        <p style={{ textAlign: 'left' }}>Enter a username to see how you rank on the leaderboard.</p>
        { errorText }
        <Form.Item
          name="email"
          rules={[{ required: true, type: "email", message: "Please input your email!" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ max: 30, message: 'Username must be maximum 30 characters.' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username (optional)" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            { min: 5, message: 'Password must be minimum 5 characters.' },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="reenter_password"
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
        <Form.Item>
          { submitButtons }
        </Form.Item>
      </Form>
    );

    let form = null;
    if (currentStep === 0) {
      form = languageHistoryForm;
    } else if (currentStep === 1) {
      form = signupForm;
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
            maxWidth: 600,
            width: 600,
            padding: 48,
            height: "50%",
            background: "#fff",
            boxShadow: "0px 2px 5px 0px rgba(50, 50, 50, 0.52)"
          }}
        >
          <Steps direction="horizontal" current={currentStep} size="small">
            <Step title="Language History" description="Let us know what languages you have studied." />
            <Step title="Signup" description="Create an account to view more content and compete with friends." />
          </Steps>
          { form }
        </Col>
      </Row>
    );
  }

}

const mapStateToProps = state => ({
  user: state.user.user,
  signupError: state.user.signupError
});

const mapDispatchToProps = dispatch => ({
  userSignup: (event, data) => dispatch(userSignup(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
