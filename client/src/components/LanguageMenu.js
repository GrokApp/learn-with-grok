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
import Flag from 'react-world-flags';
import { SUPPORTED_LANGUAGES } from 'grokConstants';

const { Option } = Select;

class LanguageMenu extends React.Component {

  render() {
    let language = this.props.language || 'GB';


    let languageOptions = Object.keys(SUPPORTED_LANGUAGES).map((languageCode) => {
      return (
        <Option value={languageCode} key={languageCode}>
          <Flag code={languageCode} height="10" style={{ marginRight: 7 }} />
          { SUPPORTED_LANGUAGES[languageCode] }
        </Option>
      )
    });


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
          { translatedText[language] }
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
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
