import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native'

import BaseComponent from 'src/components/BaseComponent'

export default class CommonToolbar extends BaseComponent {
  renderLeft() {
    if(this.props.renderLeft) {
      return this.props.renderLeft()
    }
    return (
        <Text>Left</Text>
      )
  }

  renderCenter() {
    if(this.props.renderCenter) {
      return this.props.renderCenter()
    }
    return (
        <Text>Center</Text>
      )
  }

  renderRight() {
    if(this.props.renderRight) {
      return this.props.renderRight()
    }
    return (
        <Text>Right</Text>
      )
  }

  renderComponent() {
    return (
        <View style={[styles.commonToolbar, this.props.style]}>
          <View style={styles.toolbarLeft}>
            {this.renderLeft()}
          </View>
          <View style={styles.toolbarCenter}>
            {this.renderCenter()}
          </View>
          <View style={styles.toolbarRight}>
            {this.renderRight()}
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  commonToolbar: {
    backgroundColor: "#ffffff",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  toolbarCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  toolbarRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
});

