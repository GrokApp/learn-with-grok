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
import Flag from 'react-world-flags';
import { SUPPORTED_LANGUAGES } from 'grokConstants';

const { Option } = Select;

class SiteLanguageMenu extends React.Component {

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
