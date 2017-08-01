'use strict';

import React, { Component } from 'react';
import {StyleSheet, Image, Text,
        View, TouchableHighlight} from 'react-native';

import BaseComponent from 'src/components/BaseComponent'

export default class LabeledCheckBox extends BaseComponent {

  onChange() {
    if(this.props.editable) {
      this.props.onChange(!this.props.checked);
    }
  }

  renderComponent() {
      let container = (
          <View style={this.props.containerStyle || styles.container}>
              <Image
              style={this.props.checkboxStyle || styles.checkbox}
              source={source}/>
              <View style={styles.labelContainer}>
                  <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
              </View>
          </View>
      );

      let source;

      source = this.props.checked ? this.props.checkedImage : this.props.uncheckedImage;


      if (this.props.labelBefore) {
          container = (
              <View style={this.props.containerStyle || [styles.container, styles.flexContainer]}>
                  <View style={styles.labelContainer}>
                      <Text numberOfLines={this.props.labelLines} style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
                  </View>
                  <Image
                  style={[styles.checkbox, this.props.checkboxStyle]}
                  source={source}/>
              </View>
          );
      } else {
          container = (
              <View style={[styles.container, this.props.containerStyle]}>
                  <Image
                  style={[styles.checkbox, this.props.checkboxStyle]}
                  source={source}/>
                  <View style={styles.labelContainer}>
                      <Text numberOfLines={this.props.labelLines} style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
                  </View>
              </View>
          );
      }

      return (
          <TouchableHighlight onPress={this.onChange.bind(this)} underlayColor={this.props.underlayColor} style={styles.flexContainer}>
              {container}
          </TouchableHighlight>
      );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    width: 26,
    height: 26
  },
  labelContainer: {
      marginLeft: 10,
      marginRight: 10,
  },
  label: {
      fontSize: 15,
      color: 'grey'
  },
  flexContainer: {

  }
});

LabeledCheckBox.propTypes = {
  label: React.PropTypes.string,
  labelBefore: React.PropTypes.bool,
  labelStyle: React.PropTypes.oneOfType([React.PropTypes.array,React.PropTypes.object,React.PropTypes.number]),
  labelLines: React.PropTypes.number,
  checkboxStyle: React.PropTypes.oneOfType([React.PropTypes.array,React.PropTypes.object,React.PropTypes.number]),
  containerStyle: React.PropTypes.oneOfType([React.PropTypes.array,React.PropTypes.object,React.PropTypes.number]),
  checked: React.PropTypes.bool,
  underlayColor: React.PropTypes.string,
  onChange: React.PropTypes.func,
  editable: React.PropTypes.bool
};

LabeledCheckBox.defaultProps = {
  label: 'Label',
  labelLines: 1,
  labelBefore: false,
  checked: null,
  checkedImage: {uri: 'ic_action_check_box', isStatic: true},
  uncheckedImage: {uri: 'ic_action_check_box_outline_blank', isStatic: true},
  underlayColor: 'white',
  editable: true
};
