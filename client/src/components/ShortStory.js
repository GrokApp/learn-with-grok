import React from 'react';
import { connect } from 'react-redux';
import 'App.css';
import {
  Row,
  Col,
  Button,
  Divider,
  Popover,
  Spin,
} from 'antd';
import {
  SoundOutlined,
} from '@ant-design/icons';
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import _ from 'lodash';
import MultipleChoiceQuestions from 'components/MultipleChoiceQuestions';
import LanguageSelector from 'components/LanguageSelector';
import k5Learning from "assets/images/k5-learning.png";
import googleTranslate from "assets/images/google-translate.png";

import {
  sentenceTokenize,
  textToSpeech
} from "store/thunks/excerptThunks";

import {
  translateText,
} from "store/thunks/translateThunks";

class ShortStory extends React.Component {
  constructor(props) {
    super(props);

    this.handleHoverChange = this.handleHoverChange.bind(this);

    this.state = {
      activeSentence: null
    }
  }

  componentWillMount() {
    const {
      sentenceTokenize,
      shortStoryContent,
    } = this.props;

    if (!_.isEmpty(shortStoryContent)) {
      sentenceTokenize({'excerpt': shortStoryContent.content, 'language': shortStoryContent.language});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loadingSpeech && !this.props.loadingSpeech) {
      const {
        speech
      } = this.props;
      if (!speech) {
        return;
      }
      const url = window.URL.createObjectURL(speech)
      let audio = new Audio(url);
      audio.load();
      const audioPromise = audio.play()
      if (audioPromise !== undefined) {
        audioPromise
          .then(_ => {
            // autoplay started
          })
          .catch(err => {
            // catch dom exception
            console.info(err)
          })
      }
    }
  }

  hearSentence(sentence) {
    const {
      user,
      textToSpeech
    } = this.props;

    if (!user) {
      return;
    }

    textToSpeech({
      sentence: sentence,
      language: user.language_i_want_to_learn
    });
  }

  handleHoverChange(sentence, isVisible) {
    const {
      user,
      translateText,
    } = this.props;

    if (isVisible) {
      this.setState({
        activeSentence: sentence
      });
      translateText({
        'text': sentence,
        'source': user.language_i_want_to_learn,
        'target': user.native_language,
      });
    } else {
      this.setState({
        activeSentence: null,
      });
    }
  }

  render() {
    const {
      tokenizedExcerpt,
      translatedText,
      user,
      schoolLevel,
      shortStory,
      shortStoryIllustration,
      shortStoryContent,
      multipleChoiceQuestions,
      loading,
    } = this.props;

    if (_.isEmpty(shortStoryContent)) {
      return null;
    }

    // console.log(this.props);

    let translatedChangeTranslationText = {
      'GB': 'Change Translation',
      'FR': 'Changer la traduction',
      'ES': 'Cambiar traducción',
      'DE': 'Übersetzung ändern'
    }

    let worksheetSegments = [];

    if (_.isEmpty(tokenizedExcerpt)) {
      worksheetSegments = shortStoryContent.content.split('\n').map(e => e.trim()).filter(e => !!e)

      worksheetSegments = worksheetSegments.map((segment, idx) => {
        return (
          <a key={idx} className="App-sentenceLink">
            <p
              style={{
                lineHeight: 1.8
              }}
            >
              <span
                className="App-sentence"
                style={{
                  borderStyle: 'dashed',
                  borderWidth: 1,
                  padding: 5,
                  margin: 3,
                  borderColor: 'rgba(50, 50, 50, 0.1)',
                  boxDecorationBreak: 'clone',
                }}
              >
                {segment}
              </span>
            </p>
          </a>
        );
      });
    } else {
      worksheetSegments = tokenizedExcerpt.map((paragraph, pIdx) => {
        let sentences = paragraph.map((sentence, sIdx) => {
          let contentText = <p style={{ fontSize: 24 }}>{ sentence }</p>;
          if (loading) {
            contentText = (
              <Row
                style={{
                  textAlign: 'center',
                  height: '100%',
                }}
                type="flex"
                align="middle"
              >
                <Col span={8} />
                <Col
                  span={8}
                >
                  <Spin />
                </Col>
                <Col span={8} />
              </Row>
            )
          } else if (translatedText) {
            contentText = translatedText;
          }
          const content = (
            <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
              { contentText }
            </div>
          );
          return (
            <span>
              <a key={sIdx} className="App-sentenceLink">
                <span
                  className="App-sentence"
                  style={{
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    padding: 5,
                    margin: 3,
                    borderColor: 'rgba(50, 50, 50, 0.1)',
                    boxDecorationBreak: 'clone',
                  }}
                >
                  <Popover
                    content={content}
                    title={
                      <LanguageSelector
                        language={user.native_language}
                        menuTranslatedTexts={translatedChangeTranslationText}
                        disabled={true}
                      />
                    }
                    onVisibleChange={isVisible => this.handleHoverChange(sentence, isVisible)}
                  >
                    { sentence }
                  </Popover>
                </span>
              </a>
              <a className="App-sentenceLink" onClick={() => this.hearSentence(sentence)}>
                <SoundOutlined style={{ fontSize: '12px' }} size="small" />
              </a>
            </span>
          );
        });
        return (
          <p
            key={pIdx}
            style={{
              lineHeight: 2,
            }}
          >
            { sentences }
          </p>
        );
      });
    }

    let titleSection = (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <div><u style={{ fontSize: 18 }}>{schoolLevel.name}</u></div>
        <div><b style={{ fontSize: 24 }}>{shortStory.title}</b></div>
      </div>
    );

    let title = (
      <div>
        <BrowserView>
          <Row
            gutter={16}
            style={{
              textAlign: 'center',
              height: '100%',
            }}
            type="flex"
            align="middle"
          >
            <Col span={4} />
            <Col span={16}>
              { titleSection }
            </Col>
            <Col span={4} />
          </Row>
        </BrowserView>
        <MobileView>
          <Row
            gutter={16}
            style={{
              textAlign: 'center',
              height: '100%',
            }}
            type="flex"
            align="middle"
          >
            <Col
              span={24}
            >
              { titleSection }
            </Col>
          </Row>
        </MobileView>
      </div>
    )

    let worksheet = (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <div style={{ fontSize: 18, textAlign: 'left' }}>
          { worksheetSegments }
        </div>
      </div>
    );

    let illustrationWidth = 300;
    let content = (
      <Row
        gutter={16}
        style={{
          textAlign: 'center',
          height: '100%',
          marginTop: 20
        }}
        type="flex"
        align="middle"
      >
        <Col
          span={8}
        >
          <div>
            <img
              src={shortStoryIllustration.illustration_url}
              style={{ width: illustrationWidth, margin: 'auto' }}
              alt="Critical Reading Example"
            />
          </div>
        </Col>
        <Col
          span={16}
        >
          { worksheet }
        </Col>
      </Row>
    );

    let credits = (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ marginLeft: 24 }}>
          <div style={{ color: '#bfbfbf' }}>
            Story By:
            <a href="https://www.k5learning.com/" target="_blank">
              <img
                src={k5Learning}
                style={{ width: 75, marginLeft: 5 }}
                alt="K5 Learning Logo"
              />
            </a>
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <div style={{ color: '#bfbfbf' }}>
            Translation By:
            <a href="https://translate.google.com/" target="_blank">
              <img
                src={googleTranslate}
                style={{ width: 150, margin: 'auto' }}
                alt="Google Translate Logo"
              />
            </a>
          </div>
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    );

    // TODO When credits are more fully worked out they should be moved to the top
    return (
      <div>
        <div>
          <BrowserView>
            { title }
            { content }
            <MultipleChoiceQuestions
              user={user}
              questions={multipleChoiceQuestions}
              shortStory={shortStory}
            />
          </BrowserView>
          <MobileView>
            <Row
              gutter={16}
              style={{
                textAlign: 'center',
                height: '100%',
              }}
              type="flex"
              align="middle"
            >
              <Col
                span={24}
              >
                <div>
                  <img
                    src={shortStoryIllustration.illustration_url}
                    style={{ width: 400, margin: 'auto' }}
                    alt="Critical Reading Example"
                  />
                </div>
              </Col>
            </Row>
            { title }
            <Row
              gutter={16}
              style={{
                textAlign: 'center',
                height: '100%',
              }}
              type="flex"
              align="middle"
            >
              <Col
                span={24}
                style={{
                  padding: 10
                }}
              >
                { worksheet }
              </Col>
            </Row>
            <MultipleChoiceQuestions
              user={user}
              questions={multipleChoiceQuestions}
              shortStory={shortStory}
            />
          </MobileView>
        </div>
        { credits }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tokenizedExcerpt: state.excerpt.tokenizedExcerpt || {},
  loadingSpeech: state.excerpt.loading,
  speech: state.excerpt.speech,
  translatedText: state.translate.translatedText || '',
  loading: state.translate.loading
});

const mapDispatchToProps = dispatch => ({
  sentenceTokenize: (event, data) => dispatch(sentenceTokenize(event)),
  textToSpeech: (event, data) => dispatch(textToSpeech(event)),
  translateText: (event, data) => dispatch(translateText(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortStory);
