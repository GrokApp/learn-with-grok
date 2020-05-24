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
  Spin,
  Tag
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
  RightOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import ShortStory from 'components/ShortStory';

import {
  fetchLibrary
} from "store/thunks/libraryThunks";

import {
  newAttempt
} from "store/thunks/storyThunks";

const { SubMenu } = Menu;

class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGrades: null,
      selectedStories: null,
      schoolLevels: [],
    };
  }

  componentWillMount() {
    const {
      fetchLibrary,
    } = this.props;

    fetchLibrary({});
  }

  componentDidUpdate(prevProps) {
    const {
      selectedGrades,
      selectedStories,
      schoolLevels
    } = this.state;

    const {
      library,
    } = this.props;

    console.log(this.props);

    if (_.isEmpty(schoolLevels)) {
      if (library && !_.isEmpty(library.schoolLevels)) {
        this.setState({
          schoolLevels: library.schoolLevels,
        })
      }
    }

    if (!selectedGrades) {
      if (library && library.grade) {

        this.setState({
          selectedGrades: [`${library.grade}`]
        });
      }
    }

    if (!selectedStories) {
      if (library && library.story) {

        this.setState({
          selectedStories: [`${library.story}`]
        });
      }
    } else if (library && library.story && library.story !== parseInt(selectedStories[0])) {
      this.setState({
        selectedStories: [`${library.story}`]
      });
    }
  }

  newAttempt() {
    const {
      library,
      newAttempt
    } = this.props;

    const {
      shortStory
    } = library;

    console.log(library);

    // newAttempt({
    //   shortStoryTranslationId: shortStory.id
    // })
  }

  handleGradeSelect(e) {
    const {
      fetchLibrary,
    } = this.props;

    this.setState({
      selectedGrades: e.selectedKeys
    });

    fetchLibrary({ grade: e.selectedKeys[0] });
  }

  handleStorySelect(e) {
    const {
      fetchLibrary,
    } = this.props;

    const {
      selectedGrades,
    } = this.state;

    this.setState({
      selectedStories: e.selectedKeys
    });

    fetchLibrary({ grade: selectedGrades[0], story: e.selectedKeys[0] });
  }

  render() {
    const {
      loading,
      library,
      userAttempts,
    } = this.props;

    const {
      currentUser,
      schoolLevel,
      shortStory,
      shortStoryIllustration,
      shortStoryContent,
      multipleChoiceQuestions
    } = library;

    const {
      selectedGrades,
      selectedStories,
      schoolLevels,
    } = this.state;

    let gradeMenuOptions = [];

    if (schoolLevels && !_.isEmpty(schoolLevels)){
      schoolLevels.forEach((schoolLevel) => {
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
            <CheckCircleOutlined style={{ marginRight: 10 }} />{shortStory.title} <RightOutlined  style={{ marginLeft: 10 }} />
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
      <ShortStory
        user={currentUser}
        schoolLevel={schoolLevel}
        shortStory={shortStory}
        shortStoryIllustration={shortStoryIllustration}
        shortStoryContent={shortStoryContent}
        multipleChoiceQuestions={multipleChoiceQuestions}
      />
    );

    if (loading) {
      content = (
        <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
          <Spin />
        </div>
      );
    }

    let userAttemptsDropdown = (
      <div>
        <Tag color="blue">Attempt 1</Tag>
      </div>
    );

    let completeTag = <div />;
    let latestUserAttempt = null;
    if (userAttempts && userAttempts.length > 0) {
      latestUserAttempt = userAttempts[0];
      if (latestUserAttempt.is_complete) {
        completeTag = (
          <div>
            <Tag color="blue" style={{ marginRight: 15 }}>Complete</Tag>
          </div>
        );
        userAttemptsDropdown = (
          <div>
            <Button onClick={this.newAttempt.bind(this)} type="primary">Try Again</Button>
          </div>
        );
      } else {
        userAttemptsDropdown = (
          <div>
            <Tag color="blue">Attempt {userAttempts.length}</Tag>
          </div>
        );
      }
    }

    let mainContent = (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'center', fontSize: 24 }}>
            Library
          </div>
          { completeTag }
          { userAttemptsDropdown }
        </div>
        <Divider style={{ margin: "12px 0" }}/>
        <Row>
          <Col span={4}>
            { gradeMenu }
          </Col>
          <Col span={4}>
            { storyMenu }
          </Col>
          <Col span={16}>
            { content }
          </Col>
        </Row>
      </div>
    );

    // schoolLevels should only be empty on the initial load
    if (_.isEmpty(schoolLevels) && loading) {
      mainContent = (
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
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 12,
            paddingBottom: 12,
            height: "50%",
            background: "#fff",
            boxShadow: "0px 2px 5px 0px rgba(50, 50, 50, 0.52)"
          }}
        >
          { mainContent }
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  library: state.library.library || {},
  error: state.library.error,
  loading: state.library.loading,
  userAttempts: state.story.userAttempts,
  attempt: state.story.attempt
});

const mapDispatchToProps = dispatch => ({
  fetchLibrary: (event, data) => dispatch(fetchLibrary(event)),
  newAttempt: (event, data) => dispatch(newAttempt(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
