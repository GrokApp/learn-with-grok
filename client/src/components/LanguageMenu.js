import React from 'react';
import {
  Row,
  Col,
  Layout,
  Button,
  Menu,
  Dropdown
} from 'antd';
import { DownOutlined } from '@ant-design/icons'
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import Flag from 'react-world-flags'

function LanguageMenu() {

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
        <Dropdown overlay={languageMenu} style={{ marginRight: 30 }}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            I want to learn: {selectedLanguage} <DownOutlined />
          </a>
        </Dropdown>
      </Col>
      <Col span={7} />
    </Row>
  );
}

export default LanguageMenu;
