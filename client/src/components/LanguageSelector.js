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

class LanguageSelector extends React.Component {

  render() {
    let {
      language,
      siteLanguage,
      menuTranslatedTexts,
      fontSize,
      exclusionList,
    } = this.props;

    fontSize = fontSize || 12;
    exclusionList = exclusionList || [];
    // language = language || siteLanguage;

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

    languageOptions = languageOptions.filter((option) => {
      if (exclusionList.includes(option.props.value)) {
        return false;
      }
      return true;
    });

    if (language === null) {
      // Fixes render of placeholder issue
      language = undefined;
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
        <Col span={24} style={{ fontSize: fontSize }}>
          { menuTranslatedTexts[siteLanguage] }
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Select
              value={language}
              placeholder={'Select Language...'}
              onChange={this.props.handleChangeLanguage}
              style={{
                marginLeft: 10,
                minWidth: 100
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

export default LanguageSelector;
