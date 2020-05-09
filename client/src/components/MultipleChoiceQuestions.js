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

class MultipleChoiceQuestions extends React.Component {
  render() {
    let language = this.props.language || 'GB';

    let translatedQuestions = {
      'GB': 'Questions',
      'FR': 'Des Questions',
      'ES': 'Preguntas',
      'DEU': 'Fragen'
    }

    let questionsReact = [];

    this.props.questions.forEach((q) => {
      let answersReact = [];
      const answers = q['answers'];
      for (var i = 0; i < answers.length; i += 2) {
        const left = answers[i][language];
        let right = null;
        if (i + 1 < answers.length) {
          right = answers[i+1][language];
        }
        let rightReact = <Col span={8} />
        if (!!right) {
          rightReact = (
            <Col span={8}>
              <Button type="dashed">{i+2}. {right}</Button>
            </Col>
          );
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
            <Col span={4} />
            <Col
              span={8}
            >
              <Button type="dashed">{i+1}. {left}</Button>
            </Col>
            { rightReact }
            <Col span={4} />
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

export default MultipleChoiceQuestions;
