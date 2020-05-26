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
  Tag,
  Modal,
  Statistic,
  Dropdown
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
  DownOutlined
} from '@ant-design/icons';
import _ from 'lodash';
import ShortStory from 'components/ShortStory';

import {
  fetchLibrary
} from "store/thunks/libraryThunks";

import {
  newAttempt
} from "store/thunks/storyThunks";

import {
  fetchUser
} from "store/thunks/userThunks";

const { SubMenu } = Menu;

class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGrade: null,
      selectedStory: null,
      schoolLevels: [],
      showCompleteModal: false
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
      selectedGrade,
      selectedStory,
      schoolLevels
    } = this.state;

    const {
      library,
      userAttempts,
      loadingAnswer
    } = this.props;

    if (_.isEmpty(schoolLevels)) {
      if (library && !_.isEmpty(library.schoolLevels)) {
        this.setState({
          schoolLevels: library.schoolLevels,
        })
      }
    }

    if (!selectedGrade) {
      if (library && library.grade) {

        this.setState({
          selectedGrade: `${library.grade}`
        });
      }
    }

    if (!selectedStory) {
      if (library && library.story) {

        this.setState({
          selectedStory: `${library.story}`
        });
      }
    } else if (library && library.story && library.story !== parseInt(selectedStory)) {
      this.setState({
        selectedStory: `${library.story}`
      });
    }

    if (prevProps.loadingAnswer && !this.props.loadingAnswer) {
      let latestUserAttempt = null;
      if (userAttempts && userAttempts.length > 0) {
        latestUserAttempt = userAttempts[0];
        if (!this.state.showCompleteModal && latestUserAttempt.is_complete) {
          this.setState({
            showCompleteModal: true
          });
        }
      }
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

    newAttempt({
      shortStoryTranslationId: shortStory.id
    });
  }

  handleOk(e) {
    const {
      fetchUser,
    } = this.props;

    fetchUser();

    this.setState({
      showCompleteModal: false,
    });
  };

  handleGradeSelect(e) {
    const {
      fetchLibrary,
    } = this.props;

    this.setState({
      selectedGrade: e.key
    });

    fetchLibrary({ grade: e.key });
  }

  handleStorySelect(e) {
    const {
      fetchLibrary,
    } = this.props;

    const {
      selectedGrade,
    } = this.state;

    this.setState({
      selectedStory: e.key
    });

    fetchLibrary({ grade: selectedGrade, story: e.key });
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
      multipleChoiceQuestions,
      completedShortStoryTranslations
    } = library;

    const {
      selectedGrade,
      selectedStory,
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
        onClick={this.handleGradeSelect.bind(this)}
        selectedKeys={[selectedGrade]}
      >
        { gradeMenuOptions }
      </Menu>
    );

    let storyOptions = [];

    if (library && library.shortStories && library.shortStories.length > 0){
      library.shortStories.forEach((shortStory) => {
        let shortStoryTranslationId = null;
        if (shortStory.short_story_translation && shortStory.short_story_translation.length > 0) {
          shortStoryTranslationId = shortStory.short_story_translation[0].id;
        }
        let menuItem = (
          <div>
            {shortStory.title} <RightOutlined  style={{ marginLeft: 10 }} />
          </div>
        );
        if (completedShortStoryTranslations.includes(shortStoryTranslationId)) {
          menuItem = (
            <div>
              <CheckCircleOutlined style={{ marginRight: 10 }} />{shortStory.title} <RightOutlined  style={{ marginLeft: 10 }} />
            </div>
          );
        }
        storyOptions.push(
          <Menu.Item key={shortStory.id}>
            { menuItem }
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
        onClick={this.handleStorySelect.bind(this)}
        selectedKeys={[selectedStory]}
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

    let completeModalContent = <p>Complete!</p>;

    let completeTag = <div />;
    let latestUserAttempt = null;
    if (userAttempts && userAttempts.length > 0) {
      latestUserAttempt = userAttempts[0];
      let previousBestScore = 0;
      if (userAttempts.length > 1) {
        previousBestScore = Math.max(...userAttempts.map(a => a.score));
      }
      if (latestUserAttempt.is_complete) {
        let betterScore = null;
        if (previousBestScore > latestUserAttempt.score) {
          betterScore = (
            <div>
              <Divider />
              You previously had a better score ({previousBestScore}). We will not count this new score to your point total.
            </div>
          )
        }
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
        let congratsText = (
          <div style={{ marginTop: 10 }}>
            Keep trying! With a little reading a day you will pick up more of the language in no time. Try reading more content at a similar or lower level.
          </div>
        );

        if (latestUserAttempt.score > 70) {
          congratsText = (
            <div style={{ marginTop: 10 }}>
              Great work! This is getting easy for you. Keep reading content at the same level or consider moving up a grade!
            </div>
          );
        }
        completeModalContent = (
          <div style={{ textAlign: 'center' }}>
            <Statistic title="Score" value={latestUserAttempt.score} />
            { congratsText }
            { betterScore }
          </div>
        )
      } else {
        userAttemptsDropdown = (
          <div>
            <Tag color="blue">Attempt {userAttempts.length}</Tag>
          </div>
        );
      }
    }

    let completeModal = (
      <div>
        <Modal
          title="Complete"
          visible={this.state.showCompleteModal}
          onOk={this.handleOk.bind(this)}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          { completeModalContent }
        </Modal>
      </div>
    );

    // Come up with a better name. This renders the appropriate browser or mobile view
    let mainView = (
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
    );

    if (isMobile) {
      let schoolLevelName = '';
      if (library && library.schoolLevels) {
        const sl = library.schoolLevels.find(level => level.id == selectedGrade);
        if (sl) {
          schoolLevelName = sl.name;
        }
      }

      let shortStoryTitle = '';
      if (library && library.shortStories) {
        const ss = library.shortStories.find(story => story.id == selectedStory);
        if (ss) {
          shortStoryTitle = ss.title;
        }
      }

      mainView = (
        <Row>
          <Row style={{ width: '100%' }}>
            <Col span={12}>
              <Dropdown overlay={gradeMenu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Choose Level <DownOutlined />
                </a>
              </Dropdown>
            </Col>
            <Col span={12}>
              { schoolLevelName }
            </Col>
          </Row>
          <Divider />
          <Row style={{ width: '100%' }}>
            <Col span={12}>
              <Dropdown overlay={storyMenu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Choose Story <DownOutlined />
                </a>
              </Dropdown>
            </Col>
            <Col span={12}>
              { shortStoryTitle }
            </Col>
          </Row>
          <Divider />
          { content }
        </Row>
      )
    }

    // Come up with a better name. This is either a loading spinner or the main library
    let mainContent = (
      <div>
        { completeModal }
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'center', fontSize: 24 }}>
            Library
          </div>
          { completeTag }
          { userAttemptsDropdown }
        </div>
        <Divider style={{ margin: "12px 0" }}/>
        { mainView }
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

    let containerPadding = 24;
    if (isMobile) {
      containerPadding = 10;
    }

    return (
      <Row
        justify="center"
        style={{
          padding: `${containerPadding}px`,
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
  loadingAnswer: state.story.loadingAnswer,
});

const mapDispatchToProps = dispatch => ({
  fetchLibrary: (event, data) => dispatch(fetchLibrary(event)),
  fetchUser: (event, data) => dispatch(fetchUser(event)),
  newAttempt: (event, data) => dispatch(newAttempt(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
