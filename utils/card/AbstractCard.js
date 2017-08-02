import React, { Component } from 'react';
import {View, StyleSheet } from 'react-native'

import BaseComponent from 'BaseComponent'

export default class AbstractCard extends BaseComponent {
  renderComponent() {
    var cardStyle = {
      backgroundColor: this.props.transparent? 'transparent' : '#fff',
      shadowColor: this.props.transparent ? undefined : '#000',
      shadowOffset: this.props.transparent ? undefined : {width: 0, height: 2},
      shadowOpacity: this.props.transparent ? undefined : 0.1,
      shadowRadius: this.props.transparent ? undefined : 1.5,
      elevation: this.props.transparent ? undefined : 2
    };

    return (
        <View style={[styles.cardLayout, cardStyle, this.props.style]}>
          {this.props.children}
        </View>
      )
  }
}

AbstractCard.defaultProps = {
  style: {

  }
}

var styles = StyleSheet.create({
  cardLayout: {
    marginVertical: 5,
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: '#eee',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    backgroundColor: 'blue'
  }
});

