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
import grandpasCooking from "assets/images/grandpas-cooking-transparent.png";

class GrandpasCooking extends React.Component {
  render() {

    let worksheet = (
      <div style={{ padding: 10 }}>
        <div><u style={{ fontSize: 18 }}>Grade 2 Worksheets</u></div>
        <div><b style={{ fontSize: 24 }}>Grandpa's Cooking</b></div>
        <br />
        <div style={{ fontSize: 18, textAlign: 'left' }}>
          <p>
            Ella loves her grandpa. He lives in Texas and comes to visit once a month.
            She wishes he came to visit every week because he tells great stories and
            makes her favorite dinner.
          </p>
          <p>
            Ella asks her mom to make the barbeque chicken that Grandpa makes.
          </p>
          <p>
            Ella’s mom says, “I will try, but no one make it as well as Grandpa does.
          </p>
          <p>
            Ella watches her mom prepare the sauce for the chicken. It looks tasty.
            When the chicken is finished cooking, Ella’s family sits down to eat. Her
            mom was right; no one make the barbeque chicken as well as Grandpa.
          </p>
          <p>
            The next time her grandpa comes to visit, Ella tells him the story about her
            mom trying to make the chicken. Her grandpa says, “That is a great story.”
            Then he teaches Ella and her mom how to make the chicken.
          </p>
          <p>
            Ella and her mom make the barbeque chicken once a week. It still does not
            taste quite as good as Grandpa’s. Ella loves her grandpa.
          </p>
        </div>
      </div>
    );

    let multipleChoiceQuestions = (
      <div>
        <div style={{ fontSize: 20 }}>Questions</div>
        <Divider style={{ marginTop: 0 }} />
        <div style={{ fontSize: 20 }}>Where does Ella’s grandpa live?</div>
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
              1. New Jersey
            </Col>
            <Col
              span={8}
            >
              2. Iowa
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
              3. Texas
            </Col>
            <Col
              span={8}
            >
              4. Florida
            </Col>
            <Col span={4} />
          </Row>
        </div>
        <Divider />
        <div style={{ fontSize: 20 }}>What is Ella’s favorite dinner?</div>
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
              1. Macaroni & Cheese
            </Col>
            <Col
              span={8}
            >
              2. Pizza
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
              3. Barbecue Chicken
            </Col>
            <Col
              span={8}
            >
              4. Spaghetti & Meatball
            </Col>
            <Col span={4} />
          </Row>
        </div>
        <Divider />
        <div style={{ fontSize: 20 }}>What does Grandpa teach Ella and her mom to make?</div>
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
              1. Roasted Corn
            </Col>
            <Col
              span={8}
            >
              2. Cheeseburger
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
              3. Cornbread
            </Col>
            <Col
              span={8}
            >
              4. Barbecue Chicken
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
                  src={grandpasCooking}
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
                  src={grandpasCooking}
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

export default GrandpasCooking;
