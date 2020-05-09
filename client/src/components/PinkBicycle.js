import { connect } from 'react-redux';
import React from 'react';
import 'App.css';
import {
  Row,
  Col,
  Button,
  Divider,
  Anchor,
} from 'antd';
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import pinkBicycle from "assets/images/pink-bicycle-transparent.png";
import bg from "assets/images/flags-bg-cropped.png";
import MultipleChoiceQuestions from 'components/MultipleChoiceQuestions';

import {
  sentenceTokenize,
} from "store/thunks/excerptThunks";

let worksheetTextGB = `
  Emma has a new bicycle. It is bright pink and shiny.

  It was a gift from her uncle. He hid it behind a bush to surprise her.

  When Emma looked behind the bush and saw the bicycle, she jumped for joy. It was just what she wanted. She gave her uncle a big hug.

  She loves her new bicycle, and she loves her uncle.
`;

let worksheetTextFR = `
  Emma a un nouveau vélo. Il est rose vif et brillant.

  C'était un cadeau de son oncle. Il l'a caché derrière un buisson pour la surprendre.

  Quand Emma a regardé derrière le buisson et a vu le vélo, elle a sauté de joie. C'était exactement ce qu'elle voulait. Elle a donné un gros câlin à son oncle.

  Elle aime son nouveau vélo et elle aime son oncle.
`;

let worksheetTextES = `
  Emma tiene una bicicleta nueva. Es de color rosado y brillante.

  Fue un regalo de su tío. Lo escondió detrás de un arbusto para sorprenderla.

  Cuando Emma miró detrás del arbusto y vio la bicicleta, saltó de alegría. Era justo lo que ella quería. Ella le dio un fuerte abrazo a su tío.

  Ella ama su bicicleta nueva y ama a su tío.
`;

let worksheetTextDEU = `
  Emma hat ein neues Fahrrad. Es ist hellrosa und glänzend.

  Es war ein Geschenk ihres Onkels. Er versteckte es hinter einem Busch, um sie zu überraschen.

  Als Emma hinter den Busch schaute und das Fahrrad sah, sprang sie vor Freude. Es war genau das, was sie wollte. Sie umarmte ihren Onkel fest.

  Sie liebt ihr neues Fahrrad und sie liebt ihren Onkel.
`;

let translatedWorksheets = {
  'GB': worksheetTextGB,
  'FR': worksheetTextFR,
  'ES': worksheetTextES,
  'DEU': worksheetTextDEU
};

class PinkBicycle extends React.Component {
  componentWillMount() {
    console.log(this.props);
    const {
      sentenceTokenize,
      language
    } = this.props;

    let excerpt = translatedWorksheets[language];

    sentenceTokenize({'excerpt': excerpt, 'language': language});
  }

  componentDidUpdate(prevProps) {
    const {
      sentenceTokenize,
      language,
    } = this.props;

    if (this.props.language !== prevProps.language) {
      console.log(this.props);
      let excerpt = translatedWorksheets[language];
      sentenceTokenize({'excerpt': excerpt, 'language': language});
    }
  }

  render() {
    let language = this.props.language;

    let translatedGrades = {
      'GB': 'Grade 1 Worksheets',
      'FR': 'Feuilles de travail de première année',
      'ES': 'Hojas De Trabajo De Primer Grado',
      'DEU': 'Arbeitsblätter der Klasse 1'
    }

    let translatedTitles = {
      'GB': 'The New Bicycle',
      'FR': 'Le nouveau vélo',
      'ES': 'La nueva bicicleta',
      'DEU': 'Das neue Fahrrad'
    }

    const {
      tokenizedExcerpt,
    } = this.props;

    let worksheetSegments = [];

    if (!tokenizedExcerpt) {
      worksheetSegments = translatedWorksheets[language].split('\n').map(e => e.trim()).filter(e => !!e)

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
          return (
            <a className="App-sentenceLink">
              <span
                key={sIdx}
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
                { sentence }
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
        <div><u style={{ fontSize: 18 }}>{translatedGrades[language]}</u></div>
        <div><b style={{ fontSize: 24 }}>{translatedTitles[language]}</b></div>
        <br />
        <div style={{ fontSize: 18, textAlign: 'left' }}>
          { worksheetSegments }
        </div>
      </div>
    );

    let questions = [
      {
        'question': {
          'GB': 'What color is the bicycle?',
          'FR': 'De quelle couleur est le vélo?',
          'ES': '¿De qué color es la bicicleta?',
          'DEU': 'Welche Farbe hat das Fahrrad?'
        },
        'answers': [
          {
            'GB': 'Blue',
            'FR': 'Verte',
            'ES': 'Azul',
            'DEU': 'Blau'
          },
          {
            'GB': 'Green',
            'FR': 'Verte',
            'ES': 'Verdes',
            'DEU': 'Grün'
          },
          {
            'GB': 'Pink',
            'FR': 'Rose',
            'ES': 'Rosado',
            'DEU': 'Rosa'
          },
          {
            'GB': 'Yellow',
            'FR': 'Jaune',
            'ES': 'Amarillo',
            'DEU': 'Gelb'
          },
        ],
        'correctAnswer': 3
      },
      {
        'question': {
          'GB': 'Who was it a gift from?',
          'FR': 'De qui était-ce un cadeau?',
          'ES': '¿De quién fue un regalo?',
          'DEU': 'Von wem war es ein Geschenk?'
        },
        'answers': [
          {
            'GB': 'Mother',
            'FR': 'Mère',
            'ES': 'Madre',
            'DEU': 'Mutter'
          },
          {
            'GB': 'Uncle',
            'FR': 'Oncle',
            'ES': 'Tío',
            'DEU': 'Onkel'
          },
          {
            'GB': 'Sister',
            'FR': 'Sœur',
            'ES': 'Hermana',
            'DEU': 'Schwester'
          },
          {
            'GB': 'Grandfather',
            'FR': 'Grand-père',
            'ES': 'Abuelo',
            'DEU': 'Großvater'
          },
        ],
        'correctAnswer': 2
      },
      {
        'question': {
          'GB': 'Where was it hidden?',
          'FR': 'Où était-il caché?',
          'ES': '¿Dónde estaba escondido?',
          'DEU': 'Wo war es versteckt?'
        },
        'answers': [
          {
            'GB': 'In the garage',
            'FR': 'Dans le garage',
            'ES': 'En el garaje',
            'DEU': 'In der Garage'
          },
          {
            'GB': 'Behind a bush',
            'FR': 'Derrière un buisson',
            'ES': 'Detrás de un arbusto',
            'DEU': 'Hinter einem Busch'
          },
          {
            'GB': 'In the back yard',
            'FR': 'Dans le jardin',
            'ES': 'En el patio trasero',
            'DEU': 'Im Hinterhof'
          },
          {
            'GB': 'In the shed',
            'FR': 'Dans le cabanon',
            'ES': 'En el cobertizo',
            'DEU': 'Im Schuppen'
          },
        ],
        'correctAnswer': 2
      },
    ];

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
            language={language}
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
              span={244}
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
            language={language}
          />
        </MobileView>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tokenizedExcerpt: state.excerpt.tokenizedExcerpt || {}
});

const mapDispatchToProps = dispatch => ({
  sentenceTokenize: (event, data) => dispatch(sentenceTokenize(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(PinkBicycle);
