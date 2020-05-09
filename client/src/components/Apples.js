import React from 'react';
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
import apples from "assets/images/apples-transparent.png";
import MultipleChoiceQuestions from 'components/MultipleChoiceQuestions';

class Apples extends React.Component {
  render() {
    let language = this.props.language || 'GB';

    let translatedGrades = {
      'GB': 'Grade 1 Worksheets',
      'FR': 'Feuilles de travail de première année',
      'ES': 'Hojas De Trabajo De Primer Grado',
      'DEU': 'Arbeitsblätter der Klasse 1'
    }

    let translatedTitles = {
      'GB': 'Apples',
      'FR': 'Pommes',
      'ES': 'Las manzanas',
      'DEU': 'Äpfel'
    }

    let worksheetTextGB = `
      Do you like apples? Apples can be red, yellow, or green. Each color tastes different. They are fruit. You can make apples into treats.

      Apples grow on trees. They finish growing in the fall. Then you can pick them to eat. When you pick an apple, you twist it and then pull it off the tree.

      There are five parts of an apple. The outside is the skin. The inside is the flesh. There are seeds inside of the apple. The stem is on top. Some apples have leaves by the stem. What else do you know about apples?
    `;

    let worksheetTextFR = `
      Aimes-tu les pommes? Les pommes peuvent être rouges, jaunes ou vertes. Chaque couleur a un goût différent. Ce sont des fruits. Vous pouvez faire des pommes en friandises.

      Les pommes poussent sur les arbres. Ils finissent de grandir à l'automne. Ensuite, vous pouvez les choisir pour manger. Lorsque vous cueillez une pomme, vous la tournez puis la retirez de l'arbre.

      Il y a cinq parties d'une pomme. L'extérieur est la peau. L'intérieur est la chair. Il y a des graines à l'intérieur de la pomme. La tige est sur le dessus. Certaines pommes ont des feuilles par la tige. Que savez-vous d'autre sur les pommes?
    `;

    let worksheetTextES = `
      ¿Te gustan las manzanas? Las manzanas pueden ser rojas, amarillas o verdes. Cada color tiene un sabor diferente. Son fruta. Puedes convertir las manzanas en golosinas.

      Las manzanas crecen en los árboles. Terminan de crecer en el otoño. Entonces puedes escogerlos para comer. Cuando eliges una manzana, la giras y luego la sacas del árbol.

      Hay cinco partes de una manzana. El exterior es la piel. El interior es la carne. Hay semillas dentro de la manzana. El tallo está arriba. Algunas manzanas tienen hojas por el tallo. ¿Qué más sabes sobre las manzanas?
    `;

    let worksheetTextDEU = `
      Magst du Äpfel? Äpfel können rot, gelb oder grün sein. Jede Farbe schmeckt anders. Sie sind Frucht. Sie können Äpfel zu Leckereien machen.

      Äpfel wachsen auf Bäumen. Sie wachsen im Herbst. Dann können Sie sie zum Essen auswählen. Wenn Sie einen Apfel pflücken, drehen Sie ihn und ziehen ihn dann vom Baum.

      Es gibt fünf Teile eines Apfels. Die Außenseite ist die Haut. Das Innere ist das Fleisch. Es gibt Samen im Apfel. Der Stiel ist oben. Einige Äpfel haben Blätter am Stiel. Was wissen Sie noch über Äpfel?
    `;

    let translatedWorksheets = {
      'GB': worksheetTextGB,
      'FR': worksheetTextFR,
      'ES': worksheetTextES,
      'DEU': worksheetTextDEU
    };

    let worksheetSegments = translatedWorksheets[language].split('\n').map(e => e.trim()).filter(e => !!e)

    worksheetSegments = worksheetSegments.map(segment => {
      return <p>{segment}</p>;
    });

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
          'GB': 'When do apples finish growing?',
          'FR': "Quand les pommes finissent-elles de pousser?",
          'ES': '¿Cuándo terminan de crecer las manzanas?',
          'DEU': 'Wann wachsen die Äpfel zu Ende?'
        },
        'answers': [
          {
            'GB': 'Spring',
            'FR': 'Printemps',
            'ES': 'Primavera',
            'DEU': 'Frühling'
          },
          {
            'GB': 'Summer',
            'FR': 'Été',
            'ES': 'Verano',
            'DEU': 'Sommer'
          },
          {
            'GB': 'Fall',
            'FR': 'Tomber',
            'ES': 'Otoño',
            'DEU': 'Fallen'
          },
          {
            'GB': 'Winter',
            'FR': 'Hiver',
            'ES': 'Invierno',
            'DEU': 'Winter'
          },
        ],
        'correctAnswer': 3
      },
      {
        'question': {
          'GB': 'How many parts does an apple have?',
          'FR': "Combien de pièces a une pomme?",
          'ES': '¿Cuántas partes tiene una manzana?',
          'DEU': 'Wie viele Teile hat ein Apfel?'
        },
        'answers': [
          {
            'GB': 'Two',
            'FR': 'Deux',
            'ES': 'Dos',
            'DEU': 'Zwei'
          },
          {
            'GB': 'Four',
            'FR': 'Quatre',
            'ES': 'Cuatro',
            'DEU': 'Vier'
          },
          {
            'GB': 'Five',
            'FR': 'Cinq',
            'ES': 'Cinco',
            'DEU': 'Fünf'
          },
          {
            'GB': 'Seven',
            'FR': 'Sept',
            'ES': 'Siete',
            'DEU': 'Sieben'
          },
        ],
        'correctAnswer': 3
      },
      {
        'question': {
          'GB': 'How do apples grow?',
          'FR': "Comment poussent les pommes?",
          'ES': '¿Cómo crecen las manzanas?',
          'DEU': 'Wie wachsen Äpfel?'
        },
        'answers': [
          {
            'GB': 'On trees',
            'FR': 'Sur les arbres',
            'ES': 'En los árboles',
            'DEU': 'Auf Bäumen'
          },
          {
            'GB': 'As roots',
            'FR': 'Comme racines',
            'ES': 'Como raíces',
            'DEU': 'Als Wurzeln'
          },
          {
            'GB': 'On vines',
            'FR': 'Sur vignes',
            'ES': 'En vides',
            'DEU': 'Auf Reben'
          },
        ],
        'correctAnswer': 1
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
                  src={apples}
                  style={{ width: 300, margin: 'auto' }}
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
                  src={apples}
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

export default Apples;
