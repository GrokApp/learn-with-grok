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
      position: 'relative',
      width: "100%",
      height: "100%",
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }}>
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
          <div style={{
            width: "100%",
            textAlign: 'left'
          }}>
            <p style={{ fontSize: 18, fontWeight: 400, padding: '8px' }}>
              The Grok approach to learning a second language is through immersion. By learning vocabulary in context, we believe it helps reinforce what was picked up and accelerates the time it takes to fully master a second language. We strive to make the process of learning a second language enjoyable. Whether you plan to pick up a language for your next vacation or are challenging a friend to who can learn quickest, we are here to make the process fun and engaging.
            </p>
            <p style={{ fontSize: 18, fontWeight: 400, padding: '8px' }}>
              Please see our first blog post [HERE] on the origin of the idea for Grok and why we chose to create a new way to help with learning a second language.
            </p>
          </div>
        </Col>
        <Col
          span={4}
        />
      </Row>
    </div>
  );
}

export default Mission;
