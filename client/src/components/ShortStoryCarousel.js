import React from 'react';
import 'App.css';
import {
  Row,
  Col,
  Button,
  Divider,
  Carousel
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

class ShortStoryCarousel extends React.Component {

  render() {
    return (
      <div>
        <Carousel dotPosition={'top'}>
          <PinkBicycle language={this.props.languageIWantToLearn} />
          <GrandpasCooking language={this.props.languageIWantToLearn} />
          <TheBees language={this.props.languageIWantToLearn} />
          <Apples language={this.props.languageIWantToLearn} />
        </Carousel>
      </div>
    );
  }
}

export default ShortStoryCarousel;
