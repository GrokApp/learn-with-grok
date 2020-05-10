import React from 'react';
import {
  Row,
  Col,
  Button,
  Avatar
} from 'antd';
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import craig from "assets/images/cperkins_barefoot.jpg";

function Signup() {
  return (
    <div style={{
      position: 'relative',
      width: "100%",
      height: "100%",
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }}>
      <BrowserView>
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
              <div style={{ width: '50%', margin: 'auto' }}>
                <Avatar
                  src={craig}
                  size={200}
                  alt="Craig"
                />
              </div>
            </div>
          </Col>
          <Col
            span={8}
          >
            <div>
              <p style={{ fontSize: 24, fontWeight: 600, marginBottom: 0 }}>
                Craig Perkins
              </p>
              <p style={{ fontSize: 16, fontWeight: 400 }}>
                Founder & Avid Learner
              </p>
              <p style={{ fontSize: 14, fontWeight: 400, textAlign: 'left' }}>
                Growing up I was obsessed with learning. No matter what subject I was interested in, it would always help if I was immersed in the topic to help understand it completely (or Grok it!). I was always the Math wiz, but I struggled with reading and as I got the older the importance of reading critically has become all more important. I am creating Grok in an effort to accelerate the way people pick up a second language. Through reading short stories and answering critical reading questions it will reinforce all the vocabulary you pick up when first learning a second, third fourth or even fifth language!
              </p>
              <blockquote style={{ fontSize: 14, fontWeight: 400 }}>
                <q>
                  {"yIn nI' DaSIQjaj 'ej bIchepjaj"}
                </q>{" - Kingon for \"Live, Long and Prosper\""}
                <footer>—Spock, <cite>Star Trek</cite></footer>
              </blockquote>
            </div>
          </Col>
          <Col
            span={4}
          />
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
            <div>
              <div style={{ width: '50%', margin: 'auto' }}>
                <Avatar
                  src={craig}
                  size={200}
                  alt="Craig"
                />
              </div>
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
          <div style={{ padding: 10 }}>
            <p style={{ fontSize: 24, fontWeight: 600, marginBottom: 0 }}>
              Craig Perkins
            </p>
            <p style={{ fontSize: 16, fontWeight: 400 }}>
              Founder & Avid Learner
            </p>
            <p style={{ fontSize: 14, fontWeight: 400, textAlign: 'left' }}>
              Growing up I was obsessed with learning. No matter what subject I was interested in, it would always help if I was immersed in the topic to help understand it completely (or Grok it!). I was always the Math wiz, but I struggled with reading and as I got the older the importance of reading critically has become all more important. I am creating Grok in an effort to accelerate the way people pick up a second language. Through reading short stories and answering critical reading questions it will reinforce all the vocabulary you pick up when first learning a second, third fourth or even fifth language!
            </p>
            <blockquote style={{ fontSize: 14, fontWeight: 400 }}>
              <q>
                {"yIn nI' DaSIQjaj 'ej bIchepjaj"}
              </q>{" - Kingon for \"Live, Long and Prosper\""}
              <footer>—Spock, <cite>Star Trek</cite></footer>
            </blockquote>
          </div>
        </Col>
        </Row>
      </MobileView>
    </div>
  );
}

export default Signup;
