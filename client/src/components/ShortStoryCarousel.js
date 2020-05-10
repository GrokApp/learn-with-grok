import React from 'react';
import 'App.css';
import {
  Row,
  Col,
  Button,
  Divider,
  Carousel,
  Tabs,
} from 'antd';
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import PinkBicycle from 'components/PinkBicycle';
import GrandpasCooking from 'components/GrandpasCooking';
import TheBees from 'components/TheBees';
import Apples from 'components/Apples';

const { TabPane } = Tabs;

class ShortStoryCarousel extends React.Component {

  render() {
    let language = this.props.languageIWantToLearn;

    let translatedTitles1 = {
      'GB': 'The New Bicycle',
      'FR': 'Le nouveau vélo',
      'ES': 'La nueva bicicleta',
      'DEU': 'Das neue Fahrrad'
    }

    let translatedTitles2 = {
      'GB': "Grandpa's Cooking",
      'FR': 'Cuisine de grand-père',
      'ES': 'La cocina del abuelo',
      'DEU': 'Opas Kochen'
    }

    let translatedTitles3 = {
      'GB': "The Bee",
      'FR': "L'abeille",
      'ES': 'La abeja',
      'DEU': 'Die Biene'
    }

    let translatedTitles4 = {
      'GB': 'Apples',
      'FR': 'Pommes',
      'ES': 'Las manzanas',
      'DEU': 'Äpfel'
    }

    let tab1 = translatedTitles1[language];
    let tab2 = translatedTitles2[language];
    let tab3 = translatedTitles3[language];
    let tab4 = translatedTitles4[language];

    return (
      <div style={{ textAlign: 'center' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={tab1} key="1">
            <PinkBicycle
              languageIWantToLearn={this.props.languageIWantToLearn}
              siteLanguage={this.props.siteLanguage}
            />
          </TabPane>
          <TabPane tab={tab2} key="2">
            <GrandpasCooking
              languageIWantToLearn={this.props.languageIWantToLearn}
              siteLanguage={this.props.siteLanguage}
            />
          </TabPane>
          <TabPane tab={tab3} key="3">
            <TheBees
              languageIWantToLearn={this.props.languageIWantToLearn}
              siteLanguage={this.props.siteLanguage}
            />
          </TabPane>
          <TabPane tab={tab4} key="4">
            <Apples
              languageIWantToLearn={this.props.languageIWantToLearn}
              siteLanguage={this.props.siteLanguage}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ShortStoryCarousel;
