import React from 'react';
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
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import {
  UserOutlined,
  LockOutlined,
  RightOutlined,
  LeftOutlined,
  PlusOutlined,
  MailOutlined,
} from "@ant-design/icons";
import LanguageSelector from 'components/LanguageSelector';

const { Step } = Steps;

function login(user) {
  console.log(user);
}

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

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      hasStudiedForeignLanguage: null,
      languageHistory: [],
      nativeLanguage: null,
      currentIveStudiedLanguage: null,
      currentYearsOfStudy: null,
      currentProficiencyLevel: null,
    }
  }

  handleChangeNativeLanguage(language) {
    this.setState({
      nativeLanguage: language
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
    })

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
      currentIveStudiedLanguage,
      currentProficiencyLevel,
      currentYearsOfStudy,
      languageHistory,
    } = this.state;

    nativeLanguage = nativeLanguage || 'GB';

    const {
      siteLanguage,
    } = this.props;

    let exclusionList = [nativeLanguage];
    languageHistory.forEach((languageStudied) => {
      // TODO if there are no more available languages the Add Another button should be disabled
      exclusionList.push(languageStudied.language);
    });

    let addAnotherDisabled = !(currentIveStudiedLanguage && currentProficiencyLevel && (currentYearsOfStudy !== null));
    let nextDisabled = (languageHistory.length === 0) && addAnotherDisabled;

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
                  <Button type="primary" onClick={() => this.setState({ currentStep: 1 })}>
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
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={login}
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
      </Form>
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
        onFinish={login}
        style={{
          paddingTop: 20,
          maxWidth: 400,
          textAlign: 'center',
          margin: 'auto'
        }}
      >
        <p style={{ textAlign: 'left' }}>Enter a username to see how you rank on the leaderboard.</p>
        <Form.Item
          name="email"
          rules={[{ required: true, type: "email", message: "Please input your email!" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: false, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username (optional)" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="reenter_password"
          rules={[{ required: true, message: "Please re-enter your Password!" }]}
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

export default Signup;
