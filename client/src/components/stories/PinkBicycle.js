import React from 'react';
import ShortStory from 'components/ShortStory';
import pinkBicycle from "assets/images/pink-bicycle-transparent.png";

class PinkBicycle extends React.Component {

  render() {
    const {
      languageIWantToLearn,
      siteLanguage,
      inLibrary
    } = this.props;

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
            'FR': 'Bleu',
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
      <ShortStory
        translatedGrades={translatedGrades}
        translatedTitles={translatedTitles}
        translatedWorksheets={translatedWorksheets}
        questions={questions}
        languageIWantToLearn={languageIWantToLearn}
        siteLanguage={siteLanguage}
        illustration={pinkBicycle}
        inLibrary={inLibrary}
      />
    );
  }
}

export default PinkBicycle;
