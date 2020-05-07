import React from 'react';
import 'App.css';
import {
  Row,
  Col,
  Button,
  Divider
} from 'antd';
import bookworm from "assets/images/bookworm-transparent.png";
import redCar from "assets/images/red-car-transparent.png";
import bg from "assets/images/flags-bg.png";

function Home() {
  return (
    <div style={{
      position: 'relative',
      width: "100%",
      height: "100%",
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      paddingBottom: 20
    }}>
      <div
        className="App-background"
      >
        <Row
          gutter={16}
          style={{
            textAlign: 'center',
            height: '100%',
            minHeight: '90vh'
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
                src={bookworm}
                style={{ width: 400, margin: 'auto' }}
                alt="Learn a foreign language with context"
              />
            </div>
          </Col>
          <Col
            span={8}
          >
            <div>
              <div><b style={{ fontSize: 40 }}>Grok</b></div>
              <div style={{ fontSize: 24 }}><i>Verb</i></div>
              <div style={{ fontSize: 24 }}>to understand profoundly and intuitively</div>
              <br />
              <div style={{ fontSize: 24, textAlign: 'left' }}>
                <ol>
                  <li>Immerse yourself in another language.</li>
                  <li>Pick up a second language by reading short stories.</li>
                  <li>At the end of each story answer multiple-choice critical reading questions and advance to higher level content.</li>
                </ol>
              </div>
              <Button
                style={{
                  backgroundColor: '#389e0d',
                  borderColor: '#389e0d',
                }}
                type="primary"
                size="large"
              >
                Get Started
              </Button>
            </div>
          </Col>
          <Col
            span={4}
          />
        </Row>
      </div>
      <Divider />
      <Row
        gutter={16}
        style={{
          textAlign: 'center',
          height: '100%',
          minHeight: '90vh'
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
              src={redCar}
              style={{ width: 400, margin: 'auto' }}
              alt="Critical Reading Example"
            />
          </div>
        </Col>
        <Col
          span={8}
        >
          <div>
            <div><b style={{ fontSize: 40 }}>Bob drives a red car.</b></div>
            <br />
            <div style={{ fontSize: 24 }}>What color car does Bob drive?</div>
            <div style={{ fontSize: 24, textAlign: 'left' }}>
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
                <Col
                  span={12}
                >
                  1. Blue
                </Col>
                <Col
                  span={12}
                >
                  2. Green
                </Col>
              </Row>
              <Row
                gutter={16}
                style={{
                  textAlign: 'center', height: '100%'
                }}
                type="flex"
                align="middle"
              >
                <Col
                  span={12}
                >
                  3. Red
                </Col>
                <Col
                  span={12}
                >
                  4. Yellow
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col
          span={4}
        />
      </Row>
    </div>
  );
}

export default Home;
