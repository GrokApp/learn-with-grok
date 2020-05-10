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
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import pinkBicycle from "assets/images/pink-bicycle-transparent.png";
import bg from "assets/images/flags-bg-cropped.png";
import MultipleChoiceQuestions from 'components/MultipleChoiceQuestions';
import ChangeTranslation from 'components/ChangeTranslation';

import {
  sentenceTokenize,
} from "store/thunks/excerptThunks";

import {
  translateText,
} from "store/thunks/translateThunks";

class ShortStory extends React.Component {
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
      languageIWantToLearn
    } = this.props;

    let excerpt = translatedWorksheets[languageIWantToLearn];

    sentenceTokenize({'excerpt': excerpt, 'language': languageIWantToLearn});
  }

  componentDidUpdate(prevProps) {
    const {
      sentenceTokenize,
      languageIWantToLearn,
    } = this.props;

    if (languageIWantToLearn !== prevProps.languageIWantToLearn) {
      let excerpt = translatedWorksheets[languageIWantToLearn];
      sentenceTokenize({'excerpt': excerpt, 'language': languageIWantToLearn});
    }
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
      questions
    } = this.props;

    let {
      translationLanguage,
    } = this.state;

    translationLanguage = translationLanguage || siteLanguage;

    let worksheetSegments = [];

    if (!tokenizedExcerpt) {
      worksheetSegments = translatedWorksheets[languageIWantToLearn].split('\n').map(e => e.trim()).filter(e => !!e)

      worksheetSegments = worksheetSegments.map((segment, idx) => {
        return (
          <p
            key={idx}
            style={{
              lineHeight: 1.8
            }}
          >
            <span
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                padding: 2,
                borderColor: 'rgba(50, 50, 50, 0.1)'
              }}
            >
              {segment}
            </span>
          </p>
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
                    <ChangeTranslation
                      siteLanguage={siteLanguage}
                      translationLanguage={translationLanguage}
                      handleChangeTranslationLanguage={this.handleChangeTranslationLanguage.bind(this)}
                    />
                  }
                  onVisibleChange={isVisible => this.handleHoverChange(sentence, isVisible)}
                >
                  { sentence }
                </Popover>
              </span>
            </a>
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

    return (
      <div style={{ marginTop: 20 }}>
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
            <Col
              span={4}
            />
            <Col
              span={8}
            >
              <div>
                <img
                  src={pinkBicycle}
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
          <MultipleChoiceQuestions
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
                  src={pinkBicycle}
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
            >
              { worksheet }
            </Col>
          </Row>
          <MultipleChoiceQuestions
            questions={questions}
            language={languageIWantToLearn}
          />
        </MobileView>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tokenizedExcerpt: state.excerpt.tokenizedExcerpt || {},
  translatedText: state.translate.translatedText || '',
  loading: state.translate.loading
});

const mapDispatchToProps = dispatch => ({
  sentenceTokenize: (event, data) => dispatch(sentenceTokenize(event)),
  translateText: (event, data) => dispatch(translateText(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortStory);
