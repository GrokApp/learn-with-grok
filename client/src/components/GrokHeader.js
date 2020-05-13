import React, { useContext } from 'react';
import 'App.css';
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
  Dropdown,
  Avatar
} from 'antd';
import {
  DownOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import 'antd/dist/antd.css';
import logo from "assets/images/GrokLogoSmall.png";
import SiteLanguageMenu from "components/SiteLanguageMenu";
import AuthContext from 'contexts/AuthContext';
import { isLoggedIn } from 'helpers/helpers';

const { Header, Footer, Sider, Content } = Layout;

let translatedGetStarted = {
  'GB': 'Get Started',
  'FR': 'Commencer',
  'ES': 'Empezar',
  'DEU': 'Loslegen'
}

let translatedLogin = {
  'GB': 'Log In',
  'FR': "S'identifier",
  'ES': 'Iniciar sesión',
  'DEU': 'Anmeldung'
}

const ActionButtons = (props) => {
  const auth = useContext(AuthContext);

  let siteLanguage = props.siteLanguage;

  const userMenu = (
    <Menu>
      <Menu.Item style={{ fontSize: 20, margin: 10 }}>
        <Link to="/settings">
          <SettingOutlined /> Settings
        </Link>
      </Menu.Item>
      <Menu.Item style={{ fontSize: 20, margin: 10 }}>
        <Link to="signout">
          <LogoutOutlined /> Signout
        </Link>
      </Menu.Item>
    </Menu>
  );

  if (auth.loggedIn) {
    return (
      <div style={{ float: 'right' }}>
        <Link to="/settings">
          <Dropdown overlay={userMenu}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </Link>
      </div>
    );
  } else {
    return (
      <div style={{ float: 'right' }}>
        <Link to="/signup">
          <Button
            style={{
              backgroundColor: '#389e0d',
              borderColor: '#389e0d',
              marginLeft: 10
            }}
            type="primary"
          >
            {translatedGetStarted[siteLanguage]}
          </Button>
        </Link>
        <Link to="/login">
          <Button
            style={{
              marginLeft: 10,
            }}
          >
            {translatedLogin[siteLanguage]}
          </Button>
        </Link>
      </div>
    );
  }
}

const SiteLanguageDropDown = (props) => {
  const auth = useContext(AuthContext);

  let siteLanguage = props.siteLanguage;
  let handleChangeSiteLanguage = props.handleChangeSiteLanguage;

  if (!auth.loggedIn) {
    return (
      <div style={{ float: 'right' }}>
        <SiteLanguageMenu
          language={siteLanguage}
          handleChangeSiteLanguage={handleChangeSiteLanguage}
        />
      </div>
    );
  }
  return null;
}

class GrokHeader extends React.Component {
  render() {
    const {
      handleChangeSiteLanguage,
      siteLanguage,
      languageIWantToLearn
    } = this.props;

    return (
      <Header style={{
        boxShadow: "0 2px 8px #f0f1f2",
        padding: "0 40px",
        zIndex: 10,
        backgroundColor: "#FFFFFF"
      }}>
        <BrowserView>
          <Row gutter={16}>
            <Col span={6}>
              <Link to="/">
                <img
                  src={logo}
                  style={{ width: 170 }}
                  alt="Learn with Grok"
                />
              </Link>
            </Col>
            <Col span={7} />
            <Col span={6}>
              <SiteLanguageDropDown
                siteLanguage={siteLanguage}
                handleChangeSiteLanguage={handleChangeSiteLanguage}
              />
            </Col>
            <Col span={5}>
              <ActionButtons
                siteLanguage={siteLanguage}
              />
            </Col>
          </Row>
        </BrowserView>
        <MobileView>
          <Row gutter={16}>
            <Col span={6} />
            <Col span={12}>
              <Link to="/">
                <img
                  src={logo}
                  style={{ width: 170 }}
                  alt="Learn with Grok"
                />
              </Link>
            </Col>
            <Col span={6} />
          </Row>
        </MobileView>
      </Header>
    );
  }
}

export default GrokHeader;
