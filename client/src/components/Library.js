import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Avatar,
  Form,
  Input,
  Menu,
  Divider
} from 'antd';
import {
  Link,
} from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  RightOutlined
} from '@ant-design/icons';
import PinkBicycle from 'components/stories/PinkBicycle';

import {
  fetchUser
} from "store/thunks/userThunks";

const { SubMenu } = Menu;

class Library extends React.Component {
  componentWillMount() {
    const {
      fetchUser,
    } = this.props;

    fetchUser();
  }

  render() {
    console.log(this.props);
    let gradeMenu = (
      <Menu mode="vertical" style={{ textAlign: 'center', height: '100%' }} selectedKeys={["grade1"]}>
        <Menu.Item key="grade1">
          Grade 1 Worksheets <RightOutlined  style={{ marginLeft: 10 }} />
        </Menu.Item>
        <Menu.Item key="grade2">
          Grade 2 Worksheets <RightOutlined  style={{ marginLeft: 10 }} />
        </Menu.Item>
        <Menu.Item key="grade3">
          Grade 3 Worksheets <RightOutlined  style={{ marginLeft: 10 }} />
        </Menu.Item>
        <Menu.Item key="grade4">
          Grade 4 Worksheets <RightOutlined  style={{ marginLeft: 10 }} />
        </Menu.Item>
        <Menu.Item key="grade5">
          Grade 5 Worksheets <RightOutlined  style={{ marginLeft: 10 }} />
        </Menu.Item>
      </Menu>
    );

    let storyMenu = (
      <Menu mode="vertical" style={{ textAlign: 'left', paddingLeft: 10, paddingRight: 10, height: '100%' }} selectedKeys={["grade1"]}>
        <Menu.Item key="grade1">
          Pink Bicycle
        </Menu.Item>
        <Menu.Item key="grade2">
          Grandpa's Cooking
        </Menu.Item>
        <Menu.Item key="grade3">
          The Bees
        </Menu.Item>
        <Menu.Item key="grade4">
          Apples
        </Menu.Item>
      </Menu>
    );

    return (
      <Row
        justify="center"
        style={{
          padding: 24,
          minHeight: "80vh"
        }}
      >
        <Col
          style={{
            width: '95%',
            padding: 24,
            height: "50%",
            background: "#fff",
            boxShadow: "0px 2px 5px 0px rgba(50, 50, 50, 0.52)"
          }}
        >
          <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
            <h1>Library</h1>
          </div>
          <Divider />
          <Row>
            <Col span={4}>
              { gradeMenu }
            </Col>
            <Col span={4}>
              { storyMenu }
            </Col>
            <Col span={16}>
              <PinkBicycle
                languageIWantToLearn={this.props.languageIWantToLearn}
                siteLanguage={this.props.siteLanguage}
                inLibrary={true}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  fetchUser: (event, data) => dispatch(fetchUser(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
