import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import BaseComponent from 'BaseComponent'

export default class StandaloneLabel extends BaseComponent {
  renderComponent() {
    return(
      <Text style={[styles.label, this.props.labelStyle]}>
        {this.props.name}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginLeft: 20,
    paddingTop: 18,
    paddingBottom: 17,
  }
})

StandaloneLabel.defaultProps = {
  name: "Some label"
}
