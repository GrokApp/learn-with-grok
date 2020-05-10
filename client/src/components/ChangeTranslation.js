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

class ChangeTranslation extends React.Component {

  render() {
    let {
      translationLanguage,
      siteLanguage,
    } = this.props;

    translationLanguage = translationLanguage || siteLanguage;

    let languageOptions = [
      <Option value="GB" key="GB">
        <Flag code="GB" height="10" style={{ marginRight: 7 }} />
        English
      </Option>,
      <Option value="FR" key="FR">
        <Flag code="FR" height="10" style={{ marginRight: 7 }} />
        French
      </Option>,
      <Option value="ES" key="ES">
        <Flag code="ES" height="10" style={{ marginRight: 7 }} />
        Spanish
      </Option>,
      <Option value="DEU" key="DEU">
        <Flag code="DEU" height="10" style={{ marginRight: 7 }} />
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
      'GB': 'Change Translation',
      'FR': 'Changer la traduction',
      'ES': 'Cambiar traducción',
      'DEU': 'Übersetzung ändern'
    }

    return (
      <Row
        gutter={16}
        style={{
          textAlign: 'center',
        }}
        type="flex"
        align="middle"
      >
        <Col span={24} style={{ fontSize: 12 }}>
          { translatedText[siteLanguage] }
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Select
              defaultValue='GB'
              value={translationLanguage}
              onChange={this.props.handleChangeTranslationLanguage}
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

export default ChangeTranslation;
