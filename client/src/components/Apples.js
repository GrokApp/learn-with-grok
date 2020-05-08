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

class Apples extends React.Component {
  render() {

    let worksheet = (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <div><u style={{ fontSize: 18 }}>Grade 1 Worksheets</u></div>
        <div><b style={{ fontSize: 24 }}>Apples</b></div>
        <br />
        <div style={{ fontSize: 18, textAlign: 'left' }}>
          <p>
            Do you like apples? Apples can be red, yellow, or
            green. Each color tastes different. They are fruit.
            You can make apples into treats.
          </p>
          <p>
            Apples grow on trees. They finish growing in the
            fall. Then you can pick them to eat. When you pick
            an apple, you twist it and then pull it off the tree.
          </p>
          <p>
            There are five parts of an apple. The outside is the
            skin. The inside is the flesh. There are seeds inside
            of the apple. The stem is on top. Some apples have
            leaves by the stem. What else do you know about
            apples?
          </p>
        </div>
      </div>
    );

    let multipleChoiceQuestions = (
      <div>
        <div style={{ fontSize: 20 }}>Questions</div>
        <Divider style={{ marginTop: 0 }} />
        <div style={{ fontSize: 20 }}>When do apples finish growing?</div>
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
              1. Spring
            </Col>
            <Col
              span={8}
            >
              2. Summer
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
              3. Fall
            </Col>
            <Col
              span={8}
            >
              4. Winter
            </Col>
            <Col span={4} />
          </Row>
        </div>
        <Divider />
        <div style={{ fontSize: 20 }}>How many parts does an apple have?</div>
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
              1. Two
            </Col>
            <Col
              span={8}
            >
              2. Four
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
              3. Five
            </Col>
            <Col
              span={8}
            >
              4. Seven
            </Col>
            <Col span={4} />
          </Row>
        </div>
        <Divider />
        <div style={{ fontSize: 20 }}>How do apples grow?</div>
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
              1. On trees
            </Col>
            <Col
              span={8}
            >
              2. As roots
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
              3. On vines
            </Col>
            <Col
              span={8}
            />
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
              { multipleChoiceQuestions }
            </Col>
          </Row>
        </MobileView>
      </div>
    );
  }
}

export default Apples;
