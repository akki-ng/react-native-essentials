import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity,
        Text} from 'react-native'

import BaseComponent from 'BaseComponent';

export default class SimpleButton extends BaseComponent {
  renderComponent() {
    if(!this.props.disabled) {
      return (
        <TouchableOpacity style={[styles.button, styles.buttonEnable, this.props.enabledStyle, this.props.style]} onPress={this.onPress.bind(this)}>
          <Text style={[styles.buttonEnabledText, this.props.enabledTextStyle]}>{this.props.text}</Text>
        </TouchableOpacity>
      )
    }else{
      return (
        <View style={[styles.button, this.props.style, styles.buttonDisable, this.props.disabledStyle]}>
          <Text style={[styles.buttonDisabledText, this.props.disabledTextStyle]}>{this.props.text}</Text>
        </View>
      )
    }
  }

  onPress() {
    if(this.props.onPress instanceof Function) {
      this.props.onPress(this)
    }
  }
}

var styles = StyleSheet.create({
  button: {
    alignItems: 'stretch',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems: 'center',
    padding: 15,
  },
  buttonEnable: {
    backgroundColor: "#0fb14a",
  },
  buttonDisable: {
    backgroundColor: "#ececec",
  },
  buttonEnabledText: {
    textAlign:'center',
    fontSize:18,
    color:"#ffffff",
    fontFamily: "Roboto-Medium",
    textAlignVertical: 'center',
    fontWeight: '500',
  },
  buttonDisabledText: {
    textAlign:'center',
    fontSize:18,
    color: "#000",
    opacity: .25,
    textAlignVertical: 'center',
    fontWeight: '500',
    fontFamily: "Roboto-Medium",
    textAlignVertical: 'center'
  }
});

SimpleButton.defaultProps = {
  text: 'Simple Button',
  disabled: false,
  style: styles.button,
  enabledStyle: styles.buttonEnable,
  disabledStyle: styles.buttonDisable,
  enabledTextStyle: styles.buttonEnabledText,
  disabledTextStyle: styles.buttonDisabledText,
  onPress: function(buttonRef) {
    alert("No action binded");
  }
}
