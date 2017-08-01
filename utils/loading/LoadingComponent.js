import React, { Component } from 'react';
import {View, ScrollView, StyleSheet,
        Text, Image, Dimensions} from 'react-native'
import lodObj from 'lodash';

import {Actions} from 'react-native-router-flux';

var Spinner = require('react-native-spinkit');

import BaseComponent from 'src/components/BaseComponent'
export default class LoadingComponent extends BaseComponent {
  renderComponent() {
    if(this.props.compState == 'busy') {
      return (
        <View style={styles.fullSize}>
           <Spinner style={styles.spinner} isVisible={true} size={40} type={this.props.spinnerType} color={this.props.spinnerColor}/>
        </View>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({
  fullSize: {
    backgroundColor: "#000000",
    flex: 1,
    position: 'absolute',
    left: 0, right: 0, bottom: 0, top: 0,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    // aligenSelf: 'center'
  }
});

LoadingComponent.defaultProps = {
  spinnerType: 'Wave', //['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
  spinnerColor: "#FFFFFF",
  compState: 'idle'
}
