import React from 'react';
import {
  Row,
  Col,
  Button,
  Avatar
} from 'antd';
import craig from "assets/images/cperkins_barefoot.jpg";

function Team() {
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
          span={4}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        />
        <Col
          span={8}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100%'
          }}>
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
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            textAlign: 'left',
          }}>
            <p style={{ fontSize: 24, fontWeight: 600, marginBottom: 0 }}>
              Craig Perkins
            </p>
            <p style={{ fontSize: 16, fontWeight: 400 }}>
              Founder & Avid Learner
            </p>
            <p style={{ fontSize: 14, fontWeight: 400 }}>
              Growing up I was obsessed with learning. No matter what subject I was interested in, it would always help if I was immersed in the topic to help understand it completely (or Grok it!). I was always the Math wiz, but I struggled with reading and as I got the older the importance of reading critically has become all more important. I am creating Grok in an effort to accelerate the way people pick up a second language. Through reading short stories and answering critical reading questions it will reinforce all the vocabulary you pick up when first learning a second, third fourth or even fifth language!
            </p>
            <blockquote style={{ fontSize: 14, fontWeight: 400 }}>
              <q>
                {"yIn nI' DaSIQjaj 'ej bIchepjaj"}
              </q>{" - Kingon for Live, Long and Prosper"}
              <footer>—Spock, <cite>Star Trek</cite></footer>
            </blockquote>
          </div>
        </Col>
        <Col
          span={4}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        />
      </Row>
    </div>
  );
}

export default Team;
