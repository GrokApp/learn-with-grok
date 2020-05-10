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
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import grandpasCooking from "assets/images/grandpas-cooking-transparent.png";
import MultipleChoiceQuestions from 'components/MultipleChoiceQuestions';

import {
  sentenceTokenize,
} from "store/thunks/excerptThunks";

let worksheetTextGB = `
  Ella loves her grandpa. He lives in Texas and comes to visit once a month. She wishes he came to visit every week because he tells great stories and makes her favorite dinner.

  Ella asks her mom to make the barbeque chicken that Grandpa makes.

  Ella’s mom says, “I will try, but no one make it as well as Grandpa does.

  Ella watches her mom prepare the sauce for the chicken. It looks tasty. When the chicken is finished cooking, Ella’s family sits down to eat. Her mom was right; no one make the barbeque chicken as well as Grandpa.

  The next time her grandpa comes to visit, Ella tells him the story about her mom trying to make the chicken. Her grandpa says, “That is a great story.” Then he teaches Ella and her mom how to make the chicken.

  Ella and her mom make the barbeque chicken once a week. It still does not taste quite as good as Grandpa’s. Ella loves her grandpa.
`;

let worksheetTextFR = `
  Ella aime son grand-père. Il vit au Texas et vient lui rendre visite une fois par mois. Elle souhaite qu'il vienne lui rendre visite chaque semaine car il raconte de belles histoires et fait son dîner préféré.

  Ella demande à sa maman de faire le poulet barbecue que grand-père fait.

  La maman d'Ella dit: «J'essaierai, mais personne n'y arrive aussi bien que grand-père.

  Ella regarde sa maman préparer la sauce pour le poulet. Ça a l'air délicieux. Une fois le poulet cuit, la famille d'Ella s'assoit pour manger. Sa maman avait raison; personne ne fait le poulet barbecue ainsi que grand-père.

  La prochaine fois que son grand-père vient lui rendre visite, Ella lui raconte l'histoire de sa mère qui essaie de faire le poulet. Son grand-père dit: "C'est une belle histoire." Puis il enseigne à Ella et à sa maman comment faire le poulet.

  Ella et sa maman préparent le poulet barbecue une fois par semaine. Il n'a toujours pas aussi bon goût que celui de Papy. Ella aime son grand-père.
`;

let worksheetTextES = `
  Ella ama a su abuelo. Vive en Texas y viene a visitarlo una vez al mes. Ella desea que él viniera a visitarlo todas las semanas porque él cuenta grandes historias y hace su cena favorita.

  Ella le pide a su mamá que haga el pollo a la barbacoa que hace el abuelo.

  La madre de Ella dice: "Lo intentaré, pero nadie lo hace tan bien como el abuelo.

  Ella mira a su madre preparar la salsa para el pollo. Parece sabroso. Cuando el pollo termina de cocinarse, la familia de Ella se sienta a comer. Su madre tenía razón; nadie hace el pollo a la parrilla tan bien como el abuelo.

  La próxima vez que su abuelo viene de visita, Ella le cuenta la historia de su madre tratando de hacer el pollo. Su abuelo dice: "Esa es una gran historia". Luego les enseña a Ella y a su madre cómo hacer el pollo.

  Ella y su madre hacen el pollo a la barbacoa una vez por semana. Todavía no sabe tan bien como el del abuelo. Ella ama a su abuelo.
`;

let worksheetTextDEU = `
  Ella liebt ihren Opa. Er lebt in Texas und kommt einmal im Monat zu Besuch. Sie wünscht sich, er würde jede Woche zu Besuch kommen, weil er großartige Geschichten erzählt und ihr Lieblingsessen macht.

  Ella bittet ihre Mutter, das Grillhähnchen zu machen, das Opa macht.

  Ellas Mutter sagt: "Ich werde es versuchen, aber niemand schafft es so gut wie Opa.

  Ella sieht zu, wie ihre Mutter die Sauce für das Huhn zubereitet. Es sieht sehr lecker aus. Wenn das Huhn fertig ist, setzt sich Ellas Familie zum Essen. Ihre Mutter hatte recht; Niemand macht das Grillhuhn so gut wie Opa.

  Das nächste Mal, wenn ihr Opa zu Besuch kommt, erzählt Ella ihm die Geschichte von ihrer Mutter, die versucht, das Huhn zu machen. Ihr Opa sagt: "Das ist eine großartige Geschichte." Dann bringt er Ella und ihrer Mutter bei, wie man das Huhn macht.

  Ella und ihre Mutter machen einmal pro Woche das Grillhuhn. Es schmeckt immer noch nicht ganz so gut wie das von Opa. Ella liebt ihren Opa.
`;

let translatedWorksheets = {
  'GB': worksheetTextGB,
  'FR': worksheetTextFR,
  'ES': worksheetTextES,
  'DEU': worksheetTextDEU
};

class GrandpasCooking extends React.Component {
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

  render() {
    let translatedGrades = {
      'GB': 'Grade 2 Worksheets',
      'FR': 'Feuilles de travail de 2e année',
      'ES': 'Hojas de trabajo de grado 2',
      'DEU': 'Arbeitsblätter der Klasse 2'
    }

    let translatedTitles = {
      'GB': "Grandpa's Cooking",
      'FR': 'Cuisine de grand-père',
      'ES': 'La cocina del abuelo',
      'DEU': 'Opas Kochen'
    }

    const {
      tokenizedExcerpt,
      languageIWantToLearn
    } = this.props;

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
        <div><u style={{ fontSize: 18 }}>{translatedGrades[languageIWantToLearn]}</u></div>
        <div><b style={{ fontSize: 24 }}>{translatedTitles[languageIWantToLearn]}</b></div>
        <br />
        <div style={{ fontSize: 18, textAlign: 'left' }}>
          { worksheetSegments }
        </div>
      </div>
    );

    let questions = [
      {
        'question': {
          'GB': 'Where does Ella’s grandpa live?',
          'FR': "Où vit le grand-père d'Ella?",
          'ES': '¿Dónde vive el abuelo de Ella?',
          'DEU': 'Wo wohnt Ellas Opa?'
        },
        'answers': [
          {
            'GB': 'New Jersey',
            'FR': 'New Jersey',
            'ES': 'New Jersey',
            'DEU': 'New Jersey'
          },
          {
            'GB': 'Iowa',
            'FR': 'Iowa',
            'ES': 'Iowa',
            'DEU': 'Iowa'
          },
          {
            'GB': 'Texas',
            'FR': 'Texas',
            'ES': 'Texas',
            'DEU': 'Texas'
          },
          {
            'GB': 'Florida',
            'FR': 'Florida',
            'ES': 'Florida',
            'DEU': 'Florida'
          },
        ],
        'correctAnswer': 3
      },
      {
        'question': {
          'GB': 'What is Ella’s favorite dinner?',
          'FR': "Quel est le dîner préféré d'Ella?",
          'ES': '¿Cuál es la cena favorita de Ella?',
          'DEU': 'Was ist Ellas Lieblingsessen?'
        },
        'answers': [
          {
            'GB': 'Macaroni & Cheese',
            'FR': 'Macaroni au fromage',
            'ES': 'Macarrones con queso',
            'DEU': 'Makkaroni & Käse'
          },
          {
            'GB': 'Pizza',
            'FR': 'Pizza',
            'ES': 'Pizza',
            'DEU': 'Pizza'
          },
          {
            'GB': 'Barbecue Chicken',
            'FR': 'Poulet barbecue',
            'ES': 'Pollo a la barbacoa',
            'DEU': 'Bbq Hühnchen'
          },
          {
            'GB': 'Spaghetti & Meatballs',
            'FR': 'Spaghetti et boulettes de viande',
            'ES': 'Espaguetis y Albóndigas',
            'DEU': 'Spaghetti & Fleischbällchen'
          },
        ],
        'correctAnswer': 3
      },
      {
        'question': {
          'GB': 'What does Grandpa teach Ella and her mom to make?',
          'FR': "Qu'est-ce que Papy apprend à Ella et à sa maman à faire?",
          'ES': '¿Qué les enseña el abuelo a Ella y a su madre?',
          'DEU': 'Was bringt Opa Ella und ihrer Mutter bei?'
        },
        'answers': [
          {
            'GB': 'Roasted Corn',
            'FR': 'Maïs rôti',
            'ES': 'Maiz tostado',
            'DEU': 'gerösteter Mais'
          },
          {
            'GB': 'Cheeseburger',
            'FR': 'Cheeseburger',
            'ES': 'Hamburguesa con queso',
            'DEU': 'Cheeseburger'
          },
          {
            'GB': 'Cornbread',
            'FR': 'Pain au maïs',
            'ES': 'Pan de maíz',
            'DEU': 'Körnerbrot'
          },
          {
            'GB': 'Barbecue Chicken',
            'FR': 'Poulet barbecue',
            'ES': 'Pollo a la barbacoa',
            'DEU': 'Bbq Hühnchen'
          },
        ],
        'correctAnswer': 4
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
              minHeight: '60vh'
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
                  src={grandpasCooking}
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
              span={244}
            >
              <div>
                <img
                  src={grandpasCooking}
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
  tokenizedExcerpt: state.excerpt.tokenizedExcerpt || {}
});

const mapDispatchToProps = dispatch => ({
  sentenceTokenize: (event, data) => dispatch(sentenceTokenize(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(GrandpasCooking);
