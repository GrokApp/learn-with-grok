import React from 'react';
import { connect } from 'react-redux';
import 'App.css';
import {
  Row,
  Col,
  Button,
  Divider,
  Popover,
  Spin
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
import MultipleChoiceQuestionsLanding from 'components/MultipleChoiceQuestionsLanding';
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

class ShortStoryLanding extends React.Component {
  constructor(props) {
    super(props);

    this.handleHoverChange = this.handleHoverChange.bind(this);
    this.handleChangeTranslationLanguage = this.handleChangeTranslationLanguage.bind(this);

    this.state = {
      translationLanguage: null,
      activeSentence: null
    }
  }

  componentWillMount() {
    const {
      sentenceTokenize,
      languageIWantToLearn,
      translatedWorksheets,
    } = this.props;

    let excerpt = translatedWorksheets[languageIWantToLearn];

    sentenceTokenize({'excerpt': excerpt, 'language': languageIWantToLearn});
  }

  componentDidUpdate(prevProps) {
    const {
      sentenceTokenize,
      languageIWantToLearn,
      translatedWorksheets,
    } = this.props;

    if (languageIWantToLearn !== prevProps.languageIWantToLearn) {
      let excerpt = translatedWorksheets[languageIWantToLearn];
      sentenceTokenize({'excerpt': excerpt, 'language': languageIWantToLearn});
    }

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
      languageIWantToLearn,
      textToSpeech
    } = this.props;

    if (!languageIWantToLearn) {
      return;
    }

    textToSpeech({
      sentence: sentence,
      language: languageIWantToLearn
    });
  }

  handleHoverChange(sentence, isVisible) {
    const {
      languageIWantToLearn,
      siteLanguage,
      translateText,
    } = this.props;

    if (isVisible) {
      this.setState({
        activeSentence: sentence
      });
      if (languageIWantToLearn !== siteLanguage) {
        translateText({
          'text': sentence,
          'source': languageIWantToLearn,
          'target': siteLanguage,
        });
      }
    } else {
      this.setState({
        activeSentence: null,
        translationLanguage: null,
      });
    }
  }

  handleChangeTranslationLanguage(targetLanguage) {
    const {
      activeSentence,
      translationLanguage,
    } = this.state;

    if (!activeSentence) {
      return;
    }

    const {
      siteLanguage,
      translateText,
      languageIWantToLearn
    } = this.props;

    const prevLanguage = translationLanguage || languageIWantToLearn;

    this.setState({
      translationLanguage: targetLanguage
    });

    if (languageIWantToLearn === targetLanguage) {
      return;
    } else {
      translateText({
        'text': activeSentence,
        'source': prevLanguage,
        'target': targetLanguage,
      });
    }
  }

  render() {
    const {
      siteLanguage,
      translatedText,
      tokenizedExcerpt,
      languageIWantToLearn,
      loading,
    } = this.props;

    const {
      translatedGrades,
      translatedWorksheets,
      translatedTitles,
      questions,
      illustration
    } = this.props;

    let {
      translationLanguage,
    } = this.state;

    translationLanguage = translationLanguage || siteLanguage;

    let translatedChangeTranslationText = {
      'GB': 'Change Translation',
      'FR': 'Changer la traduction',
      'ES': 'Cambiar traducción',
      'DE': 'Übersetzung ändern'
    }

    let worksheetSegments = [];

    if (_.isEmpty(tokenizedExcerpt)) {
      worksheetSegments = translatedWorksheets[languageIWantToLearn].split('\n').map(e => e.trim()).filter(e => !!e)

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
          let contentText = sentence;
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
          } else if (languageIWantToLearn === translationLanguage) {
            contentText = sentence;
          } else if (translatedText) {
            contentText = translatedText;
          }
          const content = (
            <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
              <p style={{ fontSize: 24 }}>{ contentText }</p>
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
                        siteLanguage={siteLanguage}
                        language={translationLanguage}
                        handleChangeLanguage={this.handleChangeTranslationLanguage.bind(this)}
                        menuTranslatedTexts={translatedChangeTranslationText}
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

    let worksheet = (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <div><u style={{ fontSize: 18 }}>{translatedGrades[languageIWantToLearn]}</u></div>
        <div><b style={{ fontSize: 24 }}>{translatedTitles[languageIWantToLearn]}</b></div>
        <br />
        <div style={{ fontSize: 18, textAlign: 'left' }}>
          { worksheetSegments }
        </div>
      </div>
    );

    let shortStoryContent = (
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
          span={4}
        />
        <Col
          span={8}
        >
          <div>
            <img
              src={illustration}
              style={{ width: 400, margin: 'auto' }}
              alt="Critical Reading Example"
            />
          </div>
        </Col>
        <Col
          span={8}
        >
          { worksheet }
        </Col>
        <Col
          span={4}
        />
      </Row>
    );

    let illustrationWidth = 400;

    let credits = (
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
          span={4}
        />
        <Col
          span={16}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ marginLeft: 10 }}>
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
        </Col>
        <Col
          span={4}
        />
      </Row>
    );

    if (isMobile) {
      credits = (
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ marginLeft: 10 }}>
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
          </Col>
        </Row>
      );
    }

    return (
      <div>
        <div style={{ marginTop: 20 }}>
        <BrowserView>
          { shortStoryContent }
          <MultipleChoiceQuestionsLanding
            questions={questions}
            language={languageIWantToLearn}
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
                    src={illustration}
                    style={{ width: 400, margin: 'auto' }}
                    alt="Critical Reading Example"
                  />
                </div>
              </Col>
            </Row>
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
            <MultipleChoiceQuestionsLanding
              questions={questions}
              language={languageIWantToLearn}
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
  loadingSpeech: state.excerpt.loadingSpeech,
  speech: state.excerpt.speech,
  translatedText: state.translate.translatedText || '',
  loading: state.translate.loading
});

const mapDispatchToProps = dispatch => ({
  sentenceTokenize: (event, data) => dispatch(sentenceTokenize(event)),
  textToSpeech: (event, data) => dispatch(textToSpeech(event)),
  translateText: (event, data) => dispatch(translateText(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortStoryLanding);
