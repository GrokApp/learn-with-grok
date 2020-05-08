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
import LanguageMenu from "components/LanguageMenu";
import ShortStoryCarousel from "components/ShortStoryCarousel";
import bookworm from "assets/images/bookworm-transparent.png";
import redCar from "assets/images/pink-bicycle-transparent.png";
import bg from "assets/images/flags-bg-cropped.png";

function Home() {
  return (
    <div
      // className="App-background"
      style={{
        position: 'relative',
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingBottom: 20
      }}
    >
      <BrowserView>
        <div
          style={{
            height: '20vh',
            opacity: 0.1,
            // backgroundImage: `url(${bg})`,
            // backgroundPosition: 'center',
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat'
          }}
        >
          <img
            src={bg}
            style={{
              width: '100%',
              transform: 'rotate(180deg)',
              marginTop: '-27vh'
            }}
            alt="Flag Divider"
          />
        </div>
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
              <img
                src={bookworm}
                style={{ width: 300, margin: 'auto' }}
                alt="Learn a foreign language with context"
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
            style={{
              padding: 10
            }}
          >
            <div>
              <div><b style={{ fontSize: 36 }}>Grok</b></div>
              <div style={{ fontSize: 20 }}><i>Verb</i></div>
              <div style={{ fontSize: 20 }}>to understand profoundly and intuitively</div>
              <br />
              <div style={{ fontSize: 20, textAlign: 'left' }}>
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
        </Row>
      </MobileView>
      <BrowserView>
        <div
          style={{
            height: '50vh',
            opacity: 0.1,
            // backgroundImage: `url(${bg})`,
            // backgroundPosition: 'center',
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat'
          }}
        >
          <img
            src={bg}
            style={{
              width: '100%',
              marginTop: '-10vh'
            }}
            alt="Flag Divider"
          />
        </div>
      </BrowserView>
      <MobileView>
        <div
          style={{
            opacity: 0.1,
            // backgroundImage: `url(${bg})`,
            // backgroundPosition: 'center',
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat'
          }}
        >
          <img
            src={bg}
            style={{
              width: '100%',
            }}
            alt="Flag Divider"
          />
        </div>
      </MobileView>
      <LanguageMenu />
      <Divider />
      <ShortStoryCarousel />
    </div>
  );
}

export default Home;
