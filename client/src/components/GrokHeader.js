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
import AvatarDropdown from "components/AvatarDropdown";
import AuthContext from 'contexts/AuthContext';
import { isLoggedIn } from 'helpers/helpers';
import LanguageContext from 'contexts/LanguageContext';

const { Header, Footer, Sider, Content } = Layout;

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

const ActionButtons = (props) => {
  const auth = useContext(AuthContext);

  let siteLanguage = props.siteLanguage;

  if (auth.loggedIn) {
    return (
      <AvatarDropdown />
    );
  } else {
    if (isMobile) {
      return (
        <div style={{ float: 'right' }}>
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
}

const MobileHeader = (props) => {
  const auth = useContext(AuthContext);

  let siteLanguage = props.siteLanguage;

  if (auth.loggedIn) {
    return (
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
        <Col span={18}>
          <ActionButtons
            siteLanguage={props.siteLanguage}
          />
        </Col>
      </Row>
    );
  } else {
    return (
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
        <Col span={6}>
          <ActionButtons
            siteLanguage={siteLanguage}
          />
        </Col>
      </Row>
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

function GrokHeader(props) {
  const languageCtx = useContext(LanguageContext);

  let siteLanguage = languageCtx.siteLanguage;

  const {
    handleChangeSiteLanguage,
    languageIWantToLearn
  } = props;

  let headerPadding = 40;
  if (isMobile) {
    headerPadding = 10;
  }

  return (
    <Header style={{
      boxShadow: "0 2px 8px #f0f1f2",
      padding: `0 ${headerPadding}px`,
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
        <MobileHeader
          siteLanguage={siteLanguage}
        />
      </MobileView>
    </Header>
  );
}

export default GrokHeader;
