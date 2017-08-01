import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity,
        Text, ActivityIndicator} from 'react-native'

import BaseComponent from 'src/components/BaseComponent';

var Spinner = require('react-native-spinkit');

export default class ProgressButton extends BaseComponent {
  initializeState() {
    return {
      buttonState: this.props.buttonState,
      text: this.props.text,
    }
  }

  componentDidMountInternal() {

  }

  componentWillReceivePropsInternal(newProps) {
    if(this.props.text != newProps.text) {
      this.setState({text: newProps.text})
    }
  }

  idle(text) {
    this.setState({buttonState: 'idle', text: text})
  }

  busy(text="Please wait...") {
    this.setState({buttonState: 'busy', text: text})
  }

  success(text="Success", resetToIdle = true) {
    this.setState({buttonState: 'success', text: text})
    var self = this
    if(resetToIdle) {
      setTimeout(function() {
        self.setState({buttonState: 'idle', text: self.props.text})
      }, 2000)
    }
  }

  error(text="Error!!!", resetToIdle = true) {
    this.setState({buttonState: 'error', text: text})
    var self = this
    if(resetToIdle) {
      setTimeout(function() {
        self.setState({buttonState: 'idle', text: self.props.text})
      }, 2000)
    }
  }

  _renderIdleButton() {
    return(
        <TouchableOpacity style={[styles.button, styles.buttonEnable, this.props.enabledStyle, this.props.style]} onPress={this.onPress.bind(this)}>
          <Text style={[styles.buttonEnabledText, this.props.enabledTextStyle]}>{this.state.text}</Text>
        </TouchableOpacity>
      )
  }

  _renderBusyButton() {
    return(
        <View style={[styles.button, this.props.style, styles.busyButtonStyle, this.props.busyButtonStyle]}>
          <Spinner style={styles.spinner} isVisible={true} size={20} type={this.props.spinnerType} color={this.props.spinnerColor}/>
          <Text style={[styles.buttonEnabledText, this.props.enabledTextStyle]}>{this.state.text}</Text>
        </View>
      )
  }

  _renderSuccessButton() {
    return(
        <View style={[styles.button, styles.buttonEnable, this.props.enabledStyle, this.props.style]} >
          <Text style={[styles.buttonEnabledText, this.props.enabledTextStyle]}>{this.state.text}</Text>
        </View>
      )
  }

  _renderErrorButton() {
    return(
        <View style={[styles.button, this.props.style, styles.errorButtonStyle, this.props.errorButtonStyle]} >
          <Text style={[styles.buttonEnabledText, this.props.enabledTextStyle]}>{this.state.text}</Text>
        </View>
      )
  }

  renderComponent() {
    if(!this.props.disabled) {
      if(this.state.buttonState == 'idle') {
        return this._renderIdleButton()
      }else if(this.state.buttonState == 'busy') {
        return this._renderBusyButton()
      }else if(this.state.buttonState == 'success') {
        return this._renderSuccessButton()
      }else if(this.state.buttonState == 'error') {
        return this._renderErrorButton()
      }else {
        throw "Invalie button state"
      }
    }else{
      return (
        <View style={[styles.button, this.props.style, styles.buttonDisable, this.props.disabledStyle]}>
         <Text style={[styles.buttonDisabledText, this.props.disabledTextStyle]}>{this.state.text}</Text>
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
    flexDirection:'row',
    justifyContent:'center',
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
  },
  spinner: {
    marginRight: 10
  },
  errorButtonStyle: {
    backgroundColor: "#d60315",
  },
  busyButtonStyle: {
    backgroundColor: "#039ad6"
  }
});

ProgressButton.defaultProps = {
  text: 'Button',
  buttonState: 'idle', //'busy', 'success', 'error'
  style: styles.button,
  spinnerType: 'Wave', //['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
  spinnerColor: "#FFFFFF",
  enabledStyle: styles.buttonEnable,
  disabled: false,
  disabledStyle: styles.buttonDisable,
  enabledTextStyle: styles.buttonEnabledText,
  disabledTextStyle: styles.buttonDisabledText,
  errorButtonStyle: styles.errorButtonStyle,
  busyButtonStyle: styles.busyButtonStyle,
  onPress: function(buttonRef) {
    alert("No action binded");
  }
}
