import React, { Component } from 'react';
import {View, Text, TouchableOpacity,
        Image, StyleSheet } from 'react-native'

import CommonToolbar from 'src/components/utils/toolbar/CommonToolbar'


export default class CommonNavBar extends CommonToolbar {
  renderLeft() {
    if(this.props.enableBack) {
      return (
        <TouchableOpacity onPress={this.props.onBack.bind(this)}>
          <View style={[styles.row]}>
            <Image resizeMode={Image.resizeMode.contain} style={[styles.tabIcon]} source={this.props.backIcon}/>
            <Text style={styles.commonNavBarText}>BACK</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  renderCenter() {
    return (
        <TouchableOpacity onPress={this.props.onHeadingTap.bind(this)}>
          {this.props.title}
        </TouchableOpacity>
      )
  }

  renderRight() {
    if(this.props.enableNext) {
      return (
        <TouchableOpacity onPress={this.props.onNext.bind(this)}>
          <View style={[styles.row]}>
            <Text style={styles.commonNavBarText}>NEXT</Text>
            <Image resizeMode={Image.resizeMode.contain} style={[styles.tabIcon]} source={this.props.nextIcon}/>
          </View>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  tabIcon: {
    flex: 1,
    width: 24,
    height:24
  },
  commonNavBarText: {

  }
});

CommonNavBar.defaultProps = {
  enableBack: true,
  enableNext: true,
  onBack: function() {
    alert('Back')
  },
  onNext: function() {
    alert('Next')
  },
  onHeadingTap: function() {
    alert('Heading')
  },
  nextIcon: {uri: 'ic_action_image_navigate_next', isStatic: true},
  backIcon: {uri: 'ic_action_image_navigate_back', isStatic: true},
  title: <View style={[styles.container, {backgroundColor:'green', height: 12}]}><Text>Empty</Text></View>
}
