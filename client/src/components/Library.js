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
  Divider,
  Spin
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
  fetchLibrary
} from "store/thunks/libraryThunks";

const { SubMenu } = Menu;

class Library extends React.Component {
  componentWillMount() {
    const {
      fetchLibrary,
    } = this.props;

    fetchLibrary();
  }

  render() {
    console.log(this.props);
    const {
      loading,
      library,
    } = this.props;

    let gradeMenuOptions = [];

    if (library && library.schoolLevels && library.schoolLevels.length > 0){
      library.schoolLevels.forEach((schoolLevel) => {
        gradeMenuOptions.push(
          <Menu.Item key={schoolLevel.id}>
            {schoolLevel.name} <RightOutlined  style={{ marginLeft: 10 }} />
          </Menu.Item>
        );
      })
    }

    let gradeMenu = (
      <Menu mode="vertical" style={{ textAlign: 'center', height: '100%' }} selectedKeys={["grade1"]}>
        { gradeMenuOptions }
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

    let content = (
      <div>
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
      </div>
    );

    if (loading) {
      content = (
        <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
          <Spin />
        </div>
      );
    }

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
          { content }
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  library: state.library.library,
  error: state.library.error,
  loading: state.library.loading
});

const mapDispatchToProps = dispatch => ({
  fetchLibrary: (event, data) => dispatch(fetchLibrary(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
