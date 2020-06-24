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
import { SUPPORTED_LANGUAGES } from 'grokConstants';

const { Option } = Select;

function LanguageSelector(props) {
  let {
    language,
    siteLanguage,
    menuTranslatedTexts,
    fontSize,
    exclusionList,
    disabled
  } = props;

  fontSize = fontSize || 12;
  exclusionList = exclusionList || [];
  // language = language || siteLanguage;

  let languageOptions = Object.keys(SUPPORTED_LANGUAGES).map((languageCode) => {
    return (
      <Option value={languageCode} key={languageCode}>
        <Flag code={languageCode} height="10" style={{ marginRight: 7 }} />
        { SUPPORTED_LANGUAGES[languageCode] }
      </Option>
    )
  });

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

  let selectLabel = menuTranslatedTexts[siteLanguage];
  if (!siteLanguage) {
    selectLabel = 'Translation';
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
        { selectLabel }
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <Select
            value={language}
            disabled={disabled}
            placeholder={'Select Language...'}
            onChange={props.handleChangeLanguage}
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

export default LanguageSelector;
