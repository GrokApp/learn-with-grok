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
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'

class MultipleChoiceQuestionsLanding extends React.Component {
  constructor(props) {
    super(props);

    this.answerQuestion = this.answerQuestion.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);

    this.state = {
      questionResponses: { }
    }
  }

  answerQuestion(qIdx, aIdx) {
    // qIdx and aIdx are 1-index
    const { questionResponses } = this.state;
    if (!questionResponses[qIdx]) {
      questionResponses[qIdx] = [];
    }
    questionResponses[qIdx].push(aIdx);
    this.setState({ questionResponses });
    const question = this.props.questions[qIdx - 1];
    const correctAnswer = question['correctAnswer'];
    const answer = question['answers'][aIdx - 1];
  }

  renderAnswer(answerText, aIdx, qIdx, q, qResponses) {
    let red6 = '#f5222d';
    let green7 = '#389e0d'
    let green6 = '#52c41a';

    // TODO Create a please loading animation before the button is re-rendered

    let answer = null;
    let correctAnswerIdx = q['correctAnswer'];
    if (qResponses.includes(aIdx)) {
      if (q['answers'][aIdx - 1]['is_correct']) {
        // Correct Answer
        answer = (
          <Col span={9}>
            <Button
              type="dashed"
              style={{
                borderColor: green7,
                color: green7,
              }}
            >
              <CheckCircleOutlined style={{ fontSize: 17, float: 'left', marginTop: 3 }}/>
              <span>{aIdx}. {answerText}</span>
            </Button>
          </Col>
        );
      } else {
        // Incorrect Answer
        answer = (
          <Col span={9}>
            <Button
              type="dashed"
              style={{
                borderColor: red6,
                color: red6,
                transition: 'opacity 500ms ease-in',
              }}
            >
              <CloseCircleOutlined style={{ fontSize: 17, float: 'left', marginTop: 3 }}/>
              <span>{aIdx}. {answerText}</span>
            </Button>
          </Col>
        );
      }
    } else {
      answer = (
        <Col span={9}>
          <Button
            type="dashed"
            onClick={e => this.answerQuestion(qIdx, aIdx)}
          >
            <span>{aIdx}. {answerText}</span>
          </Button>
        </Col>
      );
    }
    return answer;
  }

  render() {
    let language = this.props.language || 'GB';

    const { questionResponses } = this.state;

    let translatedQuestions = {
      'GB': 'Questions',
      'FR': 'Des Questions',
      'ES': 'Preguntas',
      'DE': 'Fragen'
    }

    let questionsReact = [];

    let red6 = '#f5222d';
    let green7 = '#389e0d'
    let green6 = '#52c41a';

    this.props.questions.forEach((q, qIdx) => {
      let answersReact = [];
      const answers = q['answers'];
      const qResponses = questionResponses[qIdx+1] || [];
      let correctAnswerIdx = q['correctAnswer'];

      for (var i = 0; i < answers.length; i += 2) {
        const leftIdx = (i+1).valueOf();
        const rightIdx = (i+2).valueOf();
        const left = answers[i]['responses'][language];
        let right = null;
        if (i + 1 < answers.length) {
          right = answers[i+1]['responses'][language];
        }
        let leftReact = this.renderAnswer(left, leftIdx, qIdx+1, q, qResponses);
        let rightReact = <Col span={9} />
        if (!!right) {
          rightReact = this.renderAnswer(right, rightIdx, qIdx+1, q, qResponses);
        }
        answersReact.push(
          <Row
            gutter={16}
            style={{
              textAlign: 'center',
              marginBottom: 10
            }}
            type="flex"
            align="middle"
          >
            <Col span={3} />
            { leftReact }
            { rightReact }
            <Col span={3} />
          </Row>
        )
      }
      questionsReact.push(
        <div>
          <div style={{ fontSize: 20, marginBottom: 15 }}>{q['question'][language]}</div>
          <div style={{ fontSize: 16, textAlign: 'left' }}>
            { answersReact }
          </div>
        </div>
      );
      questionsReact.push(<Divider />);
    });

    let multipleChoiceQuestions = (
      <div>
        <div style={{ fontSize: 20 }}>{translatedQuestions[language]}</div>
        <Divider style={{ marginTop: 0 }} />
        { questionsReact }
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
            <Col span={12} />
            <Col span={8}>
              { multipleChoiceQuestions }
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
              { multipleChoiceQuestions }
            </Col>
          </Row>
        </MobileView>
      </div>
    );
  }
}

export default MultipleChoiceQuestionsLanding;
