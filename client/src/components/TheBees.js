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
import theBees from "assets/images/the-bees-transparent.png";
import bg from "assets/images/flags-bg-cropped.png";
import MultipleChoiceQuestions from 'components/MultipleChoiceQuestions';

class TheBees extends React.Component {
  render() {
    let language = this.props.language || 'GB';

    let translatedGrades = {
      'GB': 'Grade 3 Worksheets',
      'FR': 'Feuilles de travail de 3e année',
      'ES': 'Hojas de trabajo de grado 3',
      'DEU': 'Arbeitsblätter der Klasse 3'
    }

    let translatedTitles = {
      'GB': "The Bee",
      'FR': "L'abeille",
      'ES': 'La abeja',
      'DEU': 'Die Biene'
    }

    let worksheetTextGB = `
        Bees live in a house that is called a hive. There are three kinds of bees: workers, drones, and queens. Only one queen bee can live in each hive. If she is lost or dead, the other bees will stop their work.

        Bees are very wise and busy little creatures. They all join together to build cells of wax for their honey. Each bee takes its proper place and does its own work. Some go out and gather honey from the flowers; others stay at home and work inside the hive.

        The cells which they build are all of one shape and size, and no room is left between them. The cells are not round. They have six sides.

        Did you ever look into a glass hive to see the bees while at work? It is pleasant to see how busy they always are.

        But the drones do not work. Before winter comes, all the drones are driven from the hive so that they don’t eat the honey which they did not gather.

        It is not safe for children to handle bees. Bees have a painful sting that they use in their defense.
    `;

    let worksheetTextFR = `
        Les abeilles vivent dans une maison qui s'appelle une ruche. Il existe trois types d'abeilles: travailleurs, drones et reines. Une seule reine peut vivre dans chaque ruche. Si elle est perdue ou morte, les autres abeilles arrêteront leur travail.

        Les abeilles sont de petites créatures très sages et occupées. Ils se réunissent tous pour construire des cellules de cire pour leur miel. Chaque abeille prend sa place et fait son propre travail. Certains sortent et ramassent le miel des fleurs; d'autres restent à la maison et le travail à l'intérieur de la ruche.

        Les cellules qu'ils construisent ont toutes une forme et une taille, et il n'y a plus de place entre eux. Les cellules ne sont pas rondes. Ils ont six côtés.

        Avez-vous déjà regardé dans une ruche en verre pour voir les abeilles au travail? C'est agréable de voir à quel point ils sont toujours occupés.

        Mais les drones ne fonctionnent pas. Avant l'hiver, tous les drones sont pilotés de la ruche pour qu'ils ne mangent pas le miel qu'ils n'ont pas récolté.

        Il n'est pas sûr pour les enfants de manipuler les abeilles. Les abeilles ont une piqûre douloureuse utiliser pour leur défense.
    `;

    let worksheetTextES = `
      Las abejas viven en una casa que se llama colmena. Hay tres tipos de abejas: trabajadores, zánganos y reinas. Solo una abeja reina puede vivir en cada colmena. Si ella está perdida o muerta, las otras abejas detendrán su trabajo.

      Las abejas son pequeñas criaturas muy sabias y ocupadas. Todos se unen para construir células de cera para su miel. Cada abeja toma su lugar apropiado y hace su propio trabajo. Algunos salen y recogen miel de las flores; otros se quedan en casa y trabajo dentro de la colmena.

      Las celdas que construyen son todas de una forma y tamaño, y no queda espacio entre ellos. Las celdas no son redondas. Tienen seis lados.

      ¿Alguna vez miraste en una colmena de vidrio para ver las abejas mientras trabajabas? Está agradable ver lo ocupados que siempre están.

      Pero los drones no funcionan. Antes de que llegue el invierno, todos los drones son conducidos de la colmena para que no coman la miel que no recolectaron.

      No es seguro que los niños manejen las abejas. Las abejas tienen una picadura dolorosa que utilizar en su defensa.
    `;

    let worksheetTextDEU = `
      Bienen leben in einem Haus, das Bienenstock genannt wird. Es gibt drei Arten von Bienen: Arbeiter, Drohnen und Königinnen. In jedem Bienenstock kann nur eine Bienenkönigin leben. Wenn sie ist verloren oder tot, die anderen Bienen werden ihre Arbeit einstellen.

      Bienen sind sehr weise und beschäftigte kleine Wesen. Sie alle schließen sich zusammen, um zu bauen Wachszellen für ihren Honig. Jede Biene nimmt ihren richtigen Platz ein und tut ihren eigene Arbeit. Einige gehen hinaus und sammeln Honig von den Blumen; andere bleiben bei Zuhause und Arbeit im Bienenstock.

      Die Zellen, die sie bauen, haben alle eine Form und Größe, und es bleibt kein Raum mehr zwischen ihnen. Die Zellen sind nicht rund. Sie haben sechs Seiten.

      Haben Sie jemals in einen Glasstock geschaut, um die Bienen bei der Arbeit zu sehen? Es ist angenehm zu sehen, wie beschäftigt sie immer sind.

      Aber die Drohnen funktionieren nicht. Bevor der Winter kommt, werden alle Drohnen angetrieben aus dem Bienenstock, damit sie den Honig nicht essen, den sie nicht gesammelt haben.

      Für Kinder ist der Umgang mit Bienen nicht sicher. Bienen haben einen schmerzhaften Stich, den sie haben Verwendung zu ihrer Verteidigung.
    `;

    let translatedWorksheets = {
      'GB': worksheetTextGB,
      'FR': worksheetTextFR,
      'ES': worksheetTextES,
      'DEU': worksheetTextDEU
    };

    let translatedQuestions = {
      'GB': 'Questions',
      'FR': 'Des Questions',
      'ES': 'Preguntas',
      'DEU': 'Fragen'
    }

    let worksheetSegments = translatedWorksheets[language].split('\n').map(e => e.trim()).filter(e => !!e)

    worksheetSegments = worksheetSegments.map(segment => {
      return <p>{segment}</p>;
    });

    let worksheet = (
      <div style={{ padding: 10 }}>
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
          'GB': 'How many sides does a cell in the hive have?',
          'FR': "Combien de côtés possède une cellule de la ruche?",
          'ES': '¿Cuántos lados tiene una celda en la colmena?',
          'DEU': 'Wie viele Seiten hat eine Zelle im Bienenstock?'
        },
        'answers': [
          {
            'GB': 'Three',
            'FR': 'Trois',
            'ES': 'Tres',
            'DEU': 'Drei'
          },
          {
            'GB': 'Four',
            'FR': 'Quatre',
            'ES': 'Cuatro',
            'DEU': 'Vier'
          },
          {
            'GB': 'Six',
            'FR': 'Six',
            'ES': 'Seis',
            'DEU': 'Sechs'
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
          'GB': 'Which is not a kind of bee?',
          'FR': "Ce qui n'est pas une sorte d'abeille?",
          'ES': '¿Cuál no es una especie de abeja?',
          'DEU': 'Welches ist keine Biene?'
        },
        'answers': [
          {
            'GB': 'Workers',
            'FR': 'Ouvrières',
            'ES': 'Trabajadores',
            'DEU': 'Arbeitskräfte'
          },
          {
            'GB': 'Kings',
            'FR': 'Rois',
            'ES': 'Reyes',
            'DEU': 'Könige'
          },
          {
            'GB': 'Queens',
            'FR': 'Reines',
            'ES': 'Reinas',
            'DEU': 'Königinnen'
          },
          {
            'GB': 'Drones',
            'FR': 'Drones',
            'ES': 'Zánganos',
            'DEU': 'Drohnen'
          },
        ],
        'correctAnswer': 2
      },
      {
        'question': {
          'GB': 'Which word best describes bees?',
          'FR': "Quel mot décrit le mieux les abeilles?",
          'ES': '¿Qué palabra describe mejor a las abejas?',
          'DEU': 'Welches Wort beschreibt Bienen am besten?'
        },
        'answers': [
          {
            'GB': 'Hard-working',
            'FR': 'Travailleur',
            'ES': 'Trabajador',
            'DEU': 'Hart arbeitend'
          },
          {
            'GB': 'Lazy',
            'FR': 'Paresseux',
            'ES': 'Perezoso',
            'DEU': 'Faul'
          },
          {
            'GB': 'Stupid',
            'FR': 'Stupide',
            'ES': 'Estúpido',
            'DEU': 'Blöd'
          },
          {
            'GB': 'Cuddly',
            'FR': 'Câlin',
            'ES': 'Mimoso',
            'DEU': 'Knuddelig'
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
                  src={theBees}
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
                  src={theBees}
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

export default TheBees;
