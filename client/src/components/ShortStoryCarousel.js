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

function ShortStoryCarousel() {
  return (
    <div>
      <Carousel dotPosition={'top'}>
        <PinkBicycle />
        <GrandpasCooking />
        <TheBees />
        <Apples />
      </Carousel>
    </div>
  );
}

export default ShortStoryCarousel;
