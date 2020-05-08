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
import theBees from "assets/images/the-bees-transparent.png";
import bg from "assets/images/flags-bg-cropped.png";

class TheBees extends React.Component {
  render() {

    let worksheet = (
      <div style={{ padding: 10 }}>
        <div><u style={{ fontSize: 18 }}>Grade 3 Worksheets</u></div>
        <div><b style={{ fontSize: 24 }}>The Bee</b></div>
        <br />
        <div style={{ fontSize: 18, textAlign: 'left' }}>
          <p>
            Bees live in a house that is called a hive. There are three kinds of bees:
            workers, drones, and queens. Only one queen bee can live in each hive. If
            she is lost or dead, the other bees will stop their work.
          </p>
          <p>
            Bees are very wise and busy little creatures. They all join together to build
            cells of wax for their honey. Each bee takes its proper place and does its
            own work. Some go out and gather honey from the flowers; others stay at
            home and work inside the hive.
          </p>
          <p>
            The cells which they build are all of one shape and size, and no room is left
            between them. The cells are not round. They have six sides.
          </p>
          <p>
            Did you ever look into a glass hive to see the bees while at work? It is
            pleasant to see how busy they always are.
          </p>
          <p>
            But the drones do not work. Before winter comes, all the drones are driven
            from the hive so that they don’t eat the honey which they did not gather.
          </p>
          <p>
            It is not safe for children to handle bees. Bees have a painful sting that they
            use in their defense.
          </p>
        </div>
      </div>
    );

    let multipleChoiceQuestions = (
      <div>
        <div style={{ fontSize: 20 }}>Questions</div>
        <Divider style={{ marginTop: 0 }} />
        <div style={{ fontSize: 20 }}>How many sides does a cell in the hive have?</div>
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
              1. Three
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
              3. Six
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
        <div style={{ fontSize: 20 }}>Which is not a kind of bee?</div>
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
              1. Workers
            </Col>
            <Col
              span={8}
            >
              2. Kings
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
              3. Queens
            </Col>
            <Col
              span={8}
            >
              4. Drones
            </Col>
            <Col span={4} />
          </Row>
        </div>
        <Divider />
        <div style={{ fontSize: 20 }}>Which word best describes bees?</div>
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
              1. Hard-working
            </Col>
            <Col
              span={8}
            >
              2. Lazy
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
              3. Stupid
            </Col>
            <Col
              span={8}
            >
              4. Cuddly
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
                  src={theBees}
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
                  src={theBees}
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

export default TheBees;
