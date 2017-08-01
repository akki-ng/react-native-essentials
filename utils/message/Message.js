import React, { Component } from 'react';
import {View,
        TouchableHighlight,
        StyleSheet,
        Image,
        Text } from 'react-native'

import BaseComponent from 'src/components/BaseComponent'


var levels = ['info', 'warn', 'error']

export default class Message extends BaseComponent {
  getMessageImage() {
    switch(this.props.level) {
      case 'info' : return { uri: "info" , isStatic: true};
      case 'warn' : return { uri: "warning" , isStatic: true};
      case 'error' : return { uri: "error" , isStatic: true};
      default : return { uri: "info" , isStatic: true};
    }
  }

  renderComponent() {
    var messageImage = this.getMessageImage();
    if(this.props.shown) {
      return (
        <View style={[styles.messageWrapper, this.props.style]}>
          <Text style={styles.messageText}>{this.props.message}</Text>
          <Image resizeMode='contain' source={messageImage} style={styles.messageIcon} />
        </View>
      )
    } else {
      return null;
    }

  }
}

var styles = StyleSheet.create({
  messageWrapper: {
    justifyContent: "flex-start",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  messageText: {
    color: "#f44336",
    justifyContent: 'center',
    flex: 6,
    marginTop: 10,
    fontFamily: "Roboto-Regular",
    fontSize: 14,
  },
  messageIcon: {
    alignSelf: 'flex-end',
    marginTop: 5,
    width: 25.5,
    height: 22.5,
  }
});


Message.defaultProps = {
  shown: true,
  message: "Error!",
  level: "info"
}
