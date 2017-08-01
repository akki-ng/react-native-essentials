import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import BaseComponent from 'BaseComponent'

export default class SectionTitle extends BaseComponent {
  renderComponent() {
    return(
      <View style={[styles.sectionHeading, this.props.style]}>
        <Text style={[styles.sectionInnerTitle, this.props.headingTextStyle]}>
          {this.props.name}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionHeading: {
    backgroundColor: '#ececec',
    borderTopWidth: 1,
    borderTopColor: '#f8f8f8',
    justifyContent: "center",
    padding: 10
  },
  sectionInnerTitle: {
    paddingHorizontal: 10,
    fontFamily: "Roboto-Medium",
    color: "#4a4a4a",
    fontSize: 14,
  },
})

SectionTitle.defaultProps = {
  name: "Heading"
}

