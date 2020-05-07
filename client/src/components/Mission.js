import React from 'react';
import {
  Row,
  Col,
  Button
} from 'antd';
import bookworm from "assets/images/bookworm-transparent.png";

function Mission() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: "100%",
      height: "100%",
      backgroundColor: 'rgba(160, 4, 152, 0.1)'
    }}>
      <Row
        gutter={16}
        style={{
          textAlign: 'center', height: '100%'
        }}>
        <Col
          span={5}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        />
        <Col
          span={7}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }}>
            <img
              src={bookworm}
              style={{ width: 400 }}
              alt="Learn a foreign language with context"
            />
          </div>
        </Col>
        <Col
          span={7}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: "100%"
          }}>
            <div><b style={{ fontSize: 40 }}>Grok</b></div>
            <div style={{ fontSize: 24 }}><i>Verb</i></div>
            <div style={{ fontSize: 24 }}>to understand profoundly and intuitively</div>
            <Button
              style={{
                marginTop: 10,
                backgroundColor: '#389e0d',
                borderColor: '#389e0d'
              }}
              type="primary"
            >
              Get Started Again
            </Button>
          </div>
        </Col>
        <Col
          span={5}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        />
      </Row>
    </div>
  );
}

export default Mission;
