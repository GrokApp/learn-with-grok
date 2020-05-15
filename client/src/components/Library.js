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
  constructor(props) {
    super(props);

    this.state = {
      selectedGrades: null,
      selectedStories: null,
    };
  }

  componentWillMount() {
    const {
      fetchLibrary,
    } = this.props;

    fetchLibrary();
  }

  componentDidUpdate(prevProps) {
    const {
      selectedGrades,
      selectedStories,
    } = this.state;

    const {
      library,
    } = this.props;

    if (!selectedGrades) {
      if (library && library.defaultSchoolLevel) {

        this.setState({
          selectedGrades: [`${library.defaultSchoolLevel}`]
        });
      }
    }

    if (!selectedStories) {
      if (library && library.defaultStory) {

        this.setState({
          selectedStories: [`${library.defaultStory}`]
        });
      }
    }
  }

  handleGradeSelect(e) {
    this.setState({
      selectedGrades: e.selectedKeys
    });
  }

  handleStorySelect(e) {
    this.setState({
      selectedStories: e.selectedKeys
    });
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    const {
      loading,
      library,
    } = this.props;

    const {
      selectedGrades,
      selectedStories,
    } = this.state;

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
      <Menu
        mode="vertical"
        style={{
          textAlign: 'center',
          height: '100%'
        }}
        onSelect={this.handleGradeSelect.bind(this)}
        selectedKeys={selectedGrades}
      >
        { gradeMenuOptions }
      </Menu>
    );

    let storyOptions = [];

    if (library && library.shortStories && library.shortStories.length > 0){
      library.shortStories.forEach((shortStory) => {
        storyOptions.push(
          <Menu.Item key={shortStory.id}>
            {shortStory.title} <RightOutlined  style={{ marginLeft: 10 }} />
          </Menu.Item>
        );
      })
    }

    let storyMenu = (
      <Menu
        mode="vertical"
        style={{
          textAlign: 'left',
          paddingLeft: 10,
          paddingRight: 10,
          height: '100%'
        }}
        onSelect={this.handleStorySelect.bind(this)}
        selectedKeys={selectedStories}
      >
        { storyOptions }
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
