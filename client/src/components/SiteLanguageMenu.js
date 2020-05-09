import React from 'react';
import {
  Row,
  Col,
  Layout,
  Button,
  Menu,
  Dropdown,
  Select
} from 'antd';
import { DownOutlined } from '@ant-design/icons'
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import Flag from 'react-world-flags'

const { Option } = Select;

class SiteLanguageMenu extends React.Component {

  render() {
    let language = this.props.language || 'GB';

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

    let languageOptions = [
      <Option value="GB">
        <Flag code="GB" height="12" style={{ marginRight: 7 }} />
        English
      </Option>,
      <Option value="FR">
        <Flag code="FR" height="12" style={{ marginRight: 7 }} />
        French
      </Option>,
      <Option value="ES">
        <Flag code="ES" height="12" style={{ marginRight: 7 }} />
        Spanish
      </Option>,
      <Option value="DEU">
        <Flag code="DEU" height="12" style={{ marginRight: 7 }} />
        German
      </Option>,
    ]

    // let selectedLanguage = (
    //   <span>
    //     <Flag code="GB" height="12" style={{ marginRight: 7, marginLeft: 7 }} />
    //     English
    //   </span>
    // );

    let translatedText = {
      'GB': 'Site Language',
      'FR': 'Langue du site',
      'ES': 'Idioma del sitio',
      'DEU': 'Site-Sprache'
    }

    return (
      <Row
        gutter={16}
        style={{
          textAlign: 'center',
          marginBottom: 20
        }}
        type="flex"
        align="middle"
      >
        <Col span={24} style={{ fontSize: 12 }}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {translatedText[language]}:
            <Select
              defaultValue='GB'
              value={language}
              onChange={this.props.handleChangeSiteLanguage}
              style={{
                marginLeft: 10
              }}
            >
              {languageOptions}
            </Select>
          </a>
        </Col>
      </Row>
    );
  }
}

export default SiteLanguageMenu;
