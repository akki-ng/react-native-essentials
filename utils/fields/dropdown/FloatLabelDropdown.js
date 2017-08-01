import React, { Component } from 'react';
import {View,
        Image,
        StyleSheet,
        TouchableHighlight,
        AsyncStorage,
        ToastAndroid,
        Text,
        TouchableOpacity,
        ScrollView ,
      Modal} from 'react-native'

import BaseComponent from "src/components/BaseComponent"
import {FloatingField, FloatingLabel, FloatingFieldHolder} from 'src/components/utils/fields/FloatingLabelField'
import CommonDropdown from'src/components/utils/fields/dropdown/CommonDropdown';

export default class FloatLabelDropdown extends BaseComponent {
  initializeState() {
    return {
      focussed: false,
    }
  }

  componentWillReceivePropsInternal(newProps) {
    if (newProps.hasOwnProperty('selectedValue') && newProps.selectedValue !== this.state.selectedValue) {
      this.setState({ selectedValue: newProps.selectedValue })
    }
  }

  renderComponent() {
    return (
        <FloatingField labelText={this.props.placeholder} focused={this.props.selectedValue} noBorder={this.props.noBorder}>
          <CommonDropdown ref={(input) => { this.refs.dropdown = input; }}
                    title={this.props.placeholder} items={this.props.items}
                    selectedValue={this.props.selectedValue}
                    onSelect={this.props.onValueChange}
                    labelKey={this.props.labelKey} valueKey={this.props.valueKey}
                    style={this.props.style}
                    valueStyle={this.props.valueStyle}
                    noValueStyle={this.props.noValueStyle}
                    disabledValueStyle={this.props.disabledValueStyle}
                    onClose={() => {}}
                    onOpen={() => {}}
                    editable={this.props.editable}/>
        </FloatingField>
      )
  }

  setFocus() {
    this.setState({
      focussed: true
    });
    try {
      return this.props.onFocus();
    } catch (_error) {}
  }

  unsetFocus() {
    this.setState({
      focussed: false
    });
    try {
      return this.props.onBlur();
    } catch (_error) {}
  }
}

FloatLabelDropdown.defaultProps = {
  valueStyle: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
  noValueStyle: {
    fontSize: 18,
    color: "#818181",
    fontFamily: "Roboto-Regular",
    lineHeight: 30
  },
  disabledValueStyle: {
    fontSize: 18,
    color: "#818181",
    fontFamily: "Roboto-Regular",
    lineHeight: 30
  },
  editable: true
}
