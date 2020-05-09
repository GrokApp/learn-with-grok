import React from 'react';
import {
  Row,
  Col,
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

class LanguageMenu extends React.Component {

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
      <Option value="GB" key="GB">
        <Flag code="GB" height="12" style={{ marginRight: 7 }} />
        English
      </Option>,
      <Option value="FR" key="FR">
        <Flag code="FR" height="12" style={{ marginRight: 7 }} />
        French
      </Option>,
      <Option value="ES" key="ES">
        <Flag code="ES" height="12" style={{ marginRight: 7 }} />
        Spanish
      </Option>,
      <Option value="DEU" key="DEU">
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
      'GB': 'I want to learn',
      'FR': 'Je veux apprendre',
      'ES': 'Quiero aprender',
      'DEU': 'Ich will lernen'
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
        <Col span={7} />
        <Col span={10} style={{ fontSize: 20 }}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {translatedText[language]}:
            <Select
              defaultValue='GB'
              value={language}
              onChange={this.props.handleChangeLanguageIWantToLearn}
              style={{
                marginLeft: 10
              }}
            >
              {languageOptions}
            </Select>
          </a>
        </Col>
        <Col span={7} />
      </Row>
    );
  }
}

export default LanguageMenu;
