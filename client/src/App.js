import React, { useContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import {
  Row,
  Col,
  Layout,
  Button,
  Menu,
  Dropdown
} from 'antd';
import { DownOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';
import logo from "./assets/images/GrokLogoSmall.png";
import bg from "./assets/images/flags-bg.png";
import Routes from "./Routes";
import Flag from 'react-world-flags';
import SiteLanguageMenu from "components/SiteLanguageMenu";
import ErrorNotification from "components/ErrorNotification";
import GrokHeader from "components/GrokHeader";

const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      siteLanguage: 'GB',
      languageIWantToLearn: null,
      hasChangedLanguageIWantToLearn: false,
    }
  }

  handleChangeSiteLanguage(languageCode) {
    let { languageIWantToLearn, hasChangedLanguageIWantToLearn } = this.state;
    if (!hasChangedLanguageIWantToLearn) {
      languageIWantToLearn = languageCode;
    }
    this.setState({
      siteLanguage: languageCode,
      languageIWantToLearn: languageIWantToLearn
    })
  }

  handleChangeLanguageIWantToLearn(languageCode) {
    this.setState({
      languageIWantToLearn: languageCode,
      hasChangedLanguageIWantToLearn: true
    })
  }

  render() {
    const defaultLanguageIWantToLearn = 'GB';

    let { siteLanguage, languageIWantToLearn } = this.state;

    languageIWantToLearn = languageIWantToLearn || defaultLanguageIWantToLearn;

    let footerHeight = 150;
    if (isMobile) {
      footerHeight = 300;
    }

    let translatedGetStarted = {
      'GB': 'Get Started',
      'FR': 'Commencer',
      'ES': 'Empezar',
      'DE': 'Loslegen'
    }

    let translatedLogin = {
      'GB': 'Log In',
      'FR': "S'identifier",
      'ES': 'Iniciar sesión',
      'DE': 'Anmeldung'
    }

    return (
      <Router>
        <Layout
          style={{
            position: 'relative',
            minHeight: '100%',
          }}
        >
          <GrokHeader
            siteLanguage={siteLanguage}
            languageIWantToLearn={languageIWantToLearn}
            handleChangeSiteLanguage={this.handleChangeSiteLanguage.bind(this)}
          />
          <Content
            style={{
              height: '100%',
              paddingBottom: footerHeight
            }}
          >
            <ErrorNotification />
            <Routes
              siteLanguage={siteLanguage}
              handleChangeLanguageIWantToLearn={this.handleChangeLanguageIWantToLearn.bind(this)}
              languageIWantToLearn={languageIWantToLearn}
            />
          </Content>
          <Footer style={{
            boxShadow: "0px -2px 8px #f0f1f2",
            padding: '20px 40px',
            textAlign: 'center',
            backgroundColor: "rgba(160, 4, 152, 0.77)",
            position: 'absolute',
            height: footerHeight,
            width: '100%',
            bottom: 0
          }}>
            <BrowserView>
              <Row gutter={16} style={{ color: 'white' }}>
                <Col span={6}>
                  <div>
                    <div><b style={{ fontSize: 16 }}>About Us</b></div>
                    <div><Link to="/mission" style={{ color: "white" }}>Mission</Link></div>
                    <div><Link to="/team" style={{ color: "white" }}>Team</Link></div>
                    <div><Link to="/careers" style={{ color: "white" }}>Careers</Link></div>
                  </div>
                </Col>
                <Col span={6}>
                  <div>
                    <b style={{ fontSize: 16 }}>Apps</b>
                  </div>
                </Col>
                <Col span={6}>
                  <div>
                    <b style={{ fontSize: 16 }}>Help</b>
                  </div>
                </Col>
                <Col span={6}>
                  <div>
                    <b style={{ fontSize: 16 }}>Social</b>
                    <div><a style={{ color: 'white' }} target="_blank" href="https://learnwithgrok.wordpress.com/">Blog</a></div>
                  </div>
                </Col>
              </Row>
            </BrowserView>
            <MobileView>
              <Row gutter={16} style={{ color: 'white' }}>
                <Col span={24}>
                  <div>
                    <div><b style={{ fontSize: 16 }}>About Us</b></div>
                    <div><Link to="/mission" style={{ color: "white" }}>Mission</Link></div>
                    <div><Link to="/team" style={{ color: "white" }}>Team</Link></div>
                    <div><Link to="/careers" style={{ color: "white" }}>Careers</Link></div>
                  </div>
                </Col>
              </Row>
              <Row gutter={16} style={{ color: 'white' }}>
                <Col span={24}>
                  <div>
                    <b style={{ fontSize: 16 }}>Apps</b>
                  </div>
                </Col>
              </Row>
              <Row gutter={16} style={{ color: 'white' }}>
                <Col span={24}>
                  <div>
                    <b style={{ fontSize: 16 }}>Help</b>
                  </div>
                </Col>
              </Row>
              <Row gutter={16} style={{ color: 'white' }}>
                <Col span={24}>
                  <div>
                    <b style={{ fontSize: 16 }}>Social</b>
                    <div><a style={{ color: 'white' }} target="_blank" href="https://learnwithgrok.wordpress.com/">Blog</a></div>
                  </div>
                </Col>
              </Row>
            </MobileView>
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
