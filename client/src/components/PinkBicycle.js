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
import pinkBicycle from "assets/images/pink-bicycle-transparent.png";
import bg from "assets/images/flags-bg-cropped.png";

class PinkBicycle extends React.Component {
  render() {

    let worksheet = (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <div><u style={{ fontSize: 18 }}>Grade 1 Worksheets</u></div>
        <div><b style={{ fontSize: 24 }}>The New Bicycle</b></div>
        <br />
        <div style={{ fontSize: 18, textAlign: 'left' }}>
          <p>
            Emma has a new bicycle. It is bright pink and shiny.
          </p>
          <p>
            It was a gift from her uncle. He hid it behind a bush to
            surprise her.
          </p>
          <p>
            When Emma looked behind the
            bush and saw the bicycle, she
            jumped for joy. It was just what
            she wanted. She gave her
            uncle a big hug.
          </p>
          <p>
            She loves her new bicycle, and
            she loves her uncle.
          </p>
        </div>
      </div>
    );

    let multipleChoiceQuestions = (
      <div>
        <div style={{ fontSize: 20 }}>Questions</div>
        <Divider style={{ marginTop: 0 }} />
        <div style={{ fontSize: 20 }}>What color is the bicycle?</div>
        <div style={{ fontSize: 16, textAlign: 'left' }}>
          <Row
            gutter={16}
            style={{
              textAlign: 'center',
            }}
            type="flex"
            align="middle"
          >
            <Col span={4} />
            <Col
              span={8}
            >
              1. Blue
            </Col>
            <Col
              span={8}
            >
              2. Green
            </Col>
            <Col span={4} />
          </Row>
          <Row
            gutter={16}
            style={{
              textAlign: 'center', height: '100%'
            }}
            type="flex"
            align="middle"
          >
            <Col span={4} />
            <Col
              span={8}
            >
              3. Pink
            </Col>
            <Col
              span={8}
            >
              4. Yellow
            </Col>
            <Col span={4} />
          </Row>
        </div>
        <Divider />
        <div style={{ fontSize: 20 }}>Who was it a gift from?</div>
        <div style={{ fontSize: 16, textAlign: 'left' }}>
          <Row
            gutter={16}
            style={{
              textAlign: 'center',
              height: '100%',
              marginTop: 10
            }}
            type="flex"
            align="middle"
          >
            <Col span={4} />
            <Col
              span={8}
            >
              1. Mother
            </Col>
            <Col
              span={8}
            >
              2. Uncle
            </Col>
            <Col span={4} />
          </Row>
          <Row
            gutter={16}
            style={{
              textAlign: 'center', height: '100%'
            }}
            type="flex"
            align="middle"
          >
            <Col span={4} />
            <Col
              span={8}
            >
              3. Sister
            </Col>
            <Col
              span={8}
            >
              4. Grandfather
            </Col>
            <Col span={4} />
          </Row>
        </div>
        <Divider />
        <div style={{ fontSize: 20 }}>Where was it hidden?</div>
        <div style={{ fontSize: 16, textAlign: 'left' }}>
          <Row
            gutter={16}
            style={{
              textAlign: 'center',
              height: '100%',
              marginTop: 10
            }}
            type="flex"
            align="middle"
          >
            <Col span={4} />
            <Col
              span={8}
            >
              1. In the garage
            </Col>
            <Col
              span={8}
            >
              2. Behind a bush
            </Col>
            <Col span={4} />
          </Row>
          <Row
            gutter={16}
            style={{
              textAlign: 'center', height: '100%'
            }}
            type="flex"
            align="middle"
          >
            <Col span={4} />
            <Col
              span={8}
            >
              3. In the back yard
            </Col>
            <Col
              span={8}
            >
              4. In the shed
            </Col>
            <Col span={4} />
          </Row>
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
              { multipleChoiceQuestions }
            </Col>
          </Row>
        </MobileView>
      </div>
    );
  }
}

export default PinkBicycle;
