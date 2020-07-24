import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import LayoutMobile from './components/Layout/LayoutMobile'
import LayoutDesktop from './components/Layout/LayoutDesktop'

export default class App extends Component {
  render() {
    return (
      <MediaQuery minDeviceWidth={700}>
        {(matches) => {
          if (matches) {
            return <div> <LayoutDesktop /> </div>
          } else {
            return <div> <LayoutMobile /> </div>
          }
        }}
      </MediaQuery>
    );
  }
}
