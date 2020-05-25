import React from 'react';
import { connect } from 'react-redux';
import 'App.css';
import {
  Row,
  Col,
  Button,
  Divider
} from 'antd';
import {
  Link
} from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import LanguageMenu from "components/LanguageMenu";
import ShortStoryCarousel from "components/ShortStoryCarousel";
import MultipleChoiceQuestionsLanding from "components/MultipleChoiceQuestionsLanding";
import bookworm from "assets/images/library-transparent.png";
import redCar from "assets/images/pink-bicycle-transparent.png";
import bg from "assets/images/flags-bg-cropped.png";

import {
  translateText
} from "store/thunks/translateThunks";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.examples = React.createRef();
  }

  componentDidMount() {
    let {
      translateText,
      siteLanguage,
      languageIWantToLearn
    } = this.props;
    const source = languageIWantToLearn;
    const target = 'ES';
    // translateText({
    //   'text': 'Hello World!',
    //   'source': source,
    //   'target': target
    // });
  }

  render() {

    const {
      languageIWantToLearn,
      siteLanguage,
    } = this.props;

    let translatedVerb = {
      'GB': 'Verb',
      'FR': 'Verbe',
      'ES': 'Verbo',
      'DE': 'Verb'
    }

    let translatedDefinition = {
      'GB': 'to understand profoundly and intuitively',
      'FR': 'comprendre profondément et intuitivement',
      'ES': 'entender profunda e intuitivamente',
      'DE': 'tief und intuitiv zu verstehen'
    }

    let translatedSummaryOne = {
      'GB': 'Immerse yourself in another language.',
      'FR': 'Plongez-vous dans une autre langue.',
      'ES': 'Sumérgete en otro idioma.',
      'DE': 'Tauchen Sie ein in eine andere Sprache.'
    }

    let translatedSummaryTwo = {
      'GB': 'Pick up a second language by reading short stories.',
      'FR': 'Choisissez une deuxième langue en lisant des nouvelles.',
      'ES': 'Aprende un segundo idioma leyendo cuentos cortos.',
      'DE': 'Lernen Sie eine zweite Sprache, indem Sie Kurzgeschichten lesen.'
    }

    let translatedSummaryThree = {
      'GB': 'At the end of each story answer multiple-choice critical reading questions and advance to higher level content.',
      'FR': 'À la fin de chaque histoire, répondez aux questions de lecture critique à choix multiples et passez au contenu de niveau supérieur.',
      'ES': 'Al final de cada historia, responda preguntas de lectura crítica de opción múltiple y avance a contenido de nivel superior.',
      'DE': 'Beantworten Sie am Ende jeder Geschichte Multiple-Choice-Fragen zum kritischen Lesen und wechseln Sie zu übergeordneten Inhalten.'
    }

    let translatedGetStarted = {
      'GB': 'Get Started',
      'FR': 'Commencer',
      'ES': 'Empezar',
      'DE': 'Loslegen'
    }

    let translatedSeeExamples = {
      'GB': 'See Examples',
      'FR': 'Voir des exemples',
      'ES': 'Ver ejemplos',
      'DE': 'Siehe Beispiele'
    }

    let titleSize = 40;
    let textSize = 24;
    if (isMobile) {
      titleSize = 36;
      textSize= 20;
    }

    let submitButtons = (
      <div>
        <Row gutter={10}>
          <Col span={5} />
          <Col span={7}>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                if (this.examples) {
                  console.log(this.examples);
                  window.scrollTo(0, this.examples.current.offsetTop)
                }
              }}
            >
              {translatedSeeExamples[siteLanguage]}
            </Button>
          </Col>
          <Col span={7}>
            <Link to="/signup">
              <Button
                style={{
                  backgroundColor: '#389e0d',
                  borderColor: '#389e0d',
                }}
                type="primary"
                size="large"
              >
                {translatedGetStarted[siteLanguage]}
              </Button>
            </Link>
          </Col>
          <Col span={5} />
        </Row>
      </div>
    );

    if (isMobile) {
      submitButtons = (
        <div>
          <Row style={{ marginTop: 10 }}>
            <Col span={6} />
            <Col span={12}>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  if (this.examples) {
                    console.log(this.examples);
                    window.scrollTo(0, this.examples.current.offsetTop)
                  }
                }}
              >
                {translatedSeeExamples[siteLanguage]}
              </Button>
            </Col>
            <Col span={6} />
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col span={6} />
            <Col span={12}>
              <Link to="/signup">
                <Button
                  style={{
                    backgroundColor: '#389e0d',
                    borderColor: '#389e0d',
                  }}
                  type="primary"
                  size="large"
                >
                  {translatedGetStarted[siteLanguage]}
                </Button>
              </Link>
            </Col>
            <Col span={6} />
          </Row>
        </div>
      );
    }

    let summary = (
      <div>
        <div><b style={{ fontSize: titleSize }}>Grok</b></div>
        <div style={{ fontSize: textSize }}><i>{translatedVerb[siteLanguage]}</i></div>
        <div style={{ fontSize: textSize }}>{translatedDefinition[siteLanguage]}</div>
        <br />
        <div style={{ fontSize: textSize, textAlign: 'left' }}>
          <ul>
            <li>{translatedSummaryOne[siteLanguage]}</li>
            <li>{translatedSummaryTwo[siteLanguage]}</li>
            <li>{translatedSummaryThree[siteLanguage]}</li>
          </ul>
        </div>
        { submitButtons }
      </div>
    );

    return (
      <div
        // className="App-background"
        style={{
          position: 'relative',
          width: "100%",
          height: "100%",
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          paddingBottom: 20
        }}
      >
        <BrowserView>
          <div
            style={{
              height: '20vh',
              opacity: 0.1,
              // backgroundImage: `url(${bg})`,
              // backgroundPosition: 'center',
              // backgroundSize: 'cover',
              // backgroundRepeat: 'no-repeat'
            }}
          >
            <img
              src={bg}
              style={{
                width: '100%',
                transform: 'rotate(180deg)',
                marginTop: '-32vh'
              }}
              alt="Flag Divider"
            />
          </div>
          <Row
            gutter={16}
            style={{
              textAlign: 'center',
              height: '100%',
              minHeight: '50vh'
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
                  src={bookworm}
                  style={{ width: 400, margin: 'auto' }}
                  alt="Learn a foreign language with context"
                />
              </div>
            </Col>
            <Col
              span={8}
            >
              { summary }
            </Col>
            <Col
              span={4}
            />
          </Row>
        </BrowserView>
        <MobileView>
          <Row
            gutter={16}
            style={{
              textAlign: 'center',
              height: '100%',
              paddingTop: 20,
            }}
            type="flex"
            align="middle"
          >
            <Col
              span={24}
            >
              <div>
                <img
                  src={bookworm}
                  style={{ width: 300, margin: 'auto' }}
                  alt="Learn a foreign language with context"
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
              { summary }
            </Col>
          </Row>
        </MobileView>
        <BrowserView>
          <div
            style={{
              height: '50vh',
              opacity: 0.1,
              backgroundImage: `url(${bg})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              marginBottom: 20
            }}
          >
          </div>
        </BrowserView>
        <MobileView>
          <div
            style={{
              opacity: 0.1,
              // backgroundImage: `url(${bg})`,
              // backgroundPosition: 'center',
              // backgroundSize: 'cover',
              // backgroundRepeat: 'no-repeat'
            }}
          >
            <img
              src={bg}
              style={{
                width: '100%',
              }}
              alt="Flag Divider"
            />
          </div>
        </MobileView>
        <LanguageMenu
          handleChangeLanguageIWantToLearn={this.props.handleChangeLanguageIWantToLearn}
          language={languageIWantToLearn}
        />
        <div ref={this.examples}>
          <ShortStoryCarousel
            languageIWantToLearn={languageIWantToLearn}
            siteLanguage={siteLanguage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  translatedText: state.translate.translatedText || {}
});

const mapDispatchToProps = dispatch => ({
  translateText: (event, data) => dispatch(translateText(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
