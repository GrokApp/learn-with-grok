import React from "react";
import ShortStoryLanding from "components/ShortStoryLanding";
import pinkBicycle from "assets/images/pink-bicycle-transparent.png";

class PinkBicycle extends React.Component {

  render() {
    const {
      languageIWantToLearn,
      siteLanguage
    } = this.props;

    let availableLanguages = [
      "GB",
      "FR",
      "ES",
      "DE"
    ]

    let translatedGrades = {
      "GB": "Grade 1 Worksheets",
      "FR": "Feuilles de travail de première année",
      "ES": "Hojas De Trabajo De Primer Grado",
      "DE": "Arbeitsblätter der Klasse 1"
    }

    let translatedTitles = {
      "GB": "The New Bicycle",
      "FR": "Le nouveau vélo",
      "ES": "La nueva bicicleta",
      "DE": "Das neue Fahrrad"
    }

    let worksheetTextGB = `
      Emma has a new bicycle. It is bright pink and shiny.

      It was a gift from her uncle. He hid it behind a bush to surprise her.

      When Emma looked behind the bush and saw the bicycle, she jumped for joy. It was just what she wanted. She gave her uncle a big hug.

      She loves her new bicycle, and she loves her uncle.
    `;

    let worksheetTextFR = `
      Emma a un nouveau vélo. Il est rose vif et brillant.

      C"était un cadeau de son oncle. Il l"a caché derrière un buisson pour la surprendre.

      Quand Emma a regardé derrière le buisson et a vu le vélo, elle a sauté de joie. C"était exactement ce qu"elle voulait. Elle a donné un gros câlin à son oncle.

      Elle aime son nouveau vélo et elle aime son oncle.
    `;

    let worksheetTextES = `
      Emma tiene una bicicleta nueva. Es de color rosado y brillante.

      Fue un regalo de su tío. Lo escondió detrás de un arbusto para sorprenderla.

      Cuando Emma miró detrás del arbusto y vio la bicicleta, saltó de alegría. Era justo lo que ella quería. Ella le dio un fuerte abrazo a su tío.

      Ella ama su bicicleta nueva y ama a su tío.
    `;

    let worksheetTextDE = `
      Emma hat ein neues Fahrrad. Es ist hellrosa und glänzend.

      Es war ein Geschenk ihres Onkels. Er versteckte es hinter einem Busch, um sie zu überraschen.

      Als Emma hinter den Busch schaute und das Fahrrad sah, sprang sie vor Freude. Es war genau das, was sie wollte. Sie umarmte ihren Onkel fest.

      Sie liebt ihr neues Fahrrad und sie liebt ihren Onkel.
    `;

    let translatedWorksheets = {
      "GB": worksheetTextGB,
      "FR": worksheetTextFR,
      "ES": worksheetTextES,
      "DE": worksheetTextDE
    };

    let questions = [
      {
        "question": {
          "GB": "What color is the bicycle?",
          "FR": "De quelle couleur est le vélo?",
          "ES": "¿De qué color es la bicicleta?",
          "DE": "Welche Farbe hat das Fahrrad?"
        },
        "answers": [
          {
            "responses": {
              "GB": "Blue",
              "FR": "Bleu",
              "ES": "Azul",
              "DE": "Blau"
            }
          },
          {
            "responses": {
              "GB": "Green",
              "FR": "Verte",
              "ES": "Verdes",
              "DE": "Grün"
            }
          },
          {
            "is_correct": true,
            "responses": {
              "GB": "Pink",
              "FR": "Rose",
              "ES": "Rosado",
              "DE": "Rosa"
            }
          },
          {
            "responses": {
              "GB": "Yellow",
              "FR": "Jaune",
              "ES": "Amarillo",
              "DE": "Gelb"
            }
          },
        ]
      },
      {
        "question": {
          "GB": "Who was it a gift from?",
          "FR": "De qui était-ce un cadeau?",
          "ES": "¿De quién fue un regalo?",
          "DE": "Von wem war es ein Geschenk?"
        },
        "answers": [
          {
            "responses": {
              "GB": "Mother",
              "FR": "Mère",
              "ES": "Madre",
              "DE": "Mutter"
            }
          },
          {
            "is_correct": true,
            "responses": {
              "GB": "Uncle",
              "FR": "Oncle",
              "ES": "Tío",
              "DE": "Onkel"
            }
          },
          {
            "responses": {
              "GB": "Sister",
              "FR": "Sœur",
              "ES": "Hermana",
              "DE": "Schwester"
            }
          },
          {
            "responses": {
              "GB": "Grandfather",
              "FR": "Grand-père",
              "ES": "Abuelo",
              "DE": "Großvater"
            }
          },
        ]
      },
      {
        "question": {
          "GB": "Where was it hidden?",
          "FR": "Où était-il caché?",
          "ES": "¿Dónde estaba escondido?",
          "DE": "Wo war es versteckt?"
        },
        "answers": [
          {
            "responses": {
              "GB": "In the garage",
              "FR": "Dans le garage",
              "ES": "En el garaje",
              "DE": "In der Garage"
            }
          },
          {
            "is_correct": true,
            "responses": {
              "GB": "Behind a bush",
              "FR": "Derrière un buisson",
              "ES": "Detrás de un arbusto",
              "DE": "Hinter einem Busch"
            }
          },
          {
            "responses": {
              "GB": "In the back yard",
              "FR": "Dans le jardin",
              "ES": "En el patio trasero",
              "DE": "Im Hinterhof"
            }
          },
          {
            "responses": {
              "GB": "In the shed",
              "FR": "Dans le cabanon",
              "ES": "En el cobertizo",
              "DE": "Im Schuppen"
            }
          },
        ]
      },
    ];

    return (
      <ShortStoryLanding
        translatedGrades={translatedGrades}
        translatedTitles={translatedTitles}
        translatedWorksheets={translatedWorksheets}
        questions={questions}
        languageIWantToLearn={languageIWantToLearn}
        siteLanguage={siteLanguage}
        illustration={pinkBicycle}
      />
    );
  }
}

export default PinkBicycle;
