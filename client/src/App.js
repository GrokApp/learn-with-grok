import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
import Flag from 'react-world-flags'
const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      languageCode: 'GB'
    }
  }

  render() {

    let languageMenu = (
      <Menu>
        <Menu.Item>
          <Flag code="GB" height="12" style={{ marginRight: 7 }} />
          English
        </Menu.Item>
        <Menu.Item>
          <Flag code="FR" height="12" style={{ marginRight: 7 }} />
          French
        </Menu.Item>
        <Menu.Item>
          <Flag code="ES" height="12" style={{ marginRight: 7 }} />
          Spanish
        </Menu.Item>
        <Menu.Item>
          <Flag code="DEU" height="12" style={{ marginRight: 7 }} />
          German
        </Menu.Item>
      </Menu>
    );

    let selectedLanguage = (
      <span>
        <Flag code="GB" height="12" style={{ marginRight: 7, marginLeft: 7 }} />
        English
      </span>
    );

    let languageDropdown = (
      <Dropdown overlay={languageMenu} style={{ marginRight: 30 }}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Language: {selectedLanguage} <DownOutlined />
        </a>
      </Dropdown>
    );

    return (
      <Router>
        <Layout
          style={{
            position: 'relative',
            minHeight: '100%',
          }}
        >
          <Header style={{
            boxShadow: "0 2px 8px #f0f1f2",
            padding: "0 40px",
            zIndex: 10,
            backgroundColor: "#FFFFFF"
          }}>
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
              <Col span={10} />
              <Col span={4}>
                { languageDropdown }
              </Col>
              <Col span={4}>
                <Button
                  style={{
                    backgroundColor: '#389e0d',
                    borderColor: '#389e0d',
                    marginLeft: 10
                  }}
                  type="primary"
                >
                  Get Started
                </Button>
                <Button
                  style={{
                    marginLeft: 10,
                  }}
                >
                  Login
                </Button>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              height: '100%',
              paddingBottom: 150
            }}
          >
            <Routes />
          </Content>
          <Footer style={{
            boxShadow: "0px -2px 8px #f0f1f2",
            padding: '20px 40px',
            textAlign: 'center',
            backgroundColor: "rgba(160, 4, 152, 0.77)",
            position: 'absolute',
            height: 150,
            width: '100%',
            bottom: 0
          }}>
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
                </div>
              </Col>
            </Row>
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
