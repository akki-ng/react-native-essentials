import React, { Component } from 'react';
import {View, StyleSheet, Text,
       Switch} from 'react-native'

import BaseComponent from 'src/components/BaseComponent'
export default class LabeledSwitch extends BaseComponent {

  onValueChange(value) {
    try {
      return this.props.onValueChange(value)
    } catch (_error) {}
  }

  renderComponent() {
    return (
        <View style={styles.container}>
          <Text style={styles.label}>{this.props.label}</Text>
          <Switch
            onValueChange={this.onValueChange.bind(this)}
            style={styles.switcherButton}
            value={this.props.value}
            thumbTintColor="#4285f4"
            disabled={!this.props.editable}
          />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 20,
    paddingRight:20,
    paddingBottom: 15,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "Roboto-Regular",
  },
  switcherButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right:20,
  }
})

LabeledSwitch.defaultProps = {
  editable: true,
  onValueChange: function(value) {
    alert(value)
  },
  value: false,
  label: "Are you registered as a company?"
}
