import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Animated } from 'react-native'
import BaseComponent from "src/components/BaseComponent"

export class FloatingLabel extends BaseComponent {
  initializeState() {
    var initialPadding = 9;
    var initialOpacity = 0;

    if (this.props.visible) {
      initialPadding = 5
      initialOpacity = 1
    }

    return {
      paddingAnim: new Animated.Value(initialPadding),
      opacityAnim: new Animated.Value(initialOpacity)
    }
  }


  componentWillReceivePropsInternal(newProps) {
    Animated.timing(this.state.paddingAnim, {
      toValue: newProps.visible ? 5 : 9,
      duration: 230
    }).start();

    return Animated.timing(this.state.opacityAnim, {
      toValue: newProps.visible ? 1 : 0,
      duration: 230
    }).start();
  }

  renderComponent() {
    return(
      <Animated.View style={[styles.floatingLabel, {paddingTop: this.state.paddingAnim, opacity: this.state.opacityAnim}]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export class FloatingFieldHolder extends BaseComponent {
  initializeState() {
    return {
      marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
    }
  }

  componentWillReceivePropsInternal(newProps) {
    return Animated.timing(this.state.marginAnim, {
      toValue: newProps.withValue ? 10 : 0,
      duration: 230
    }).start();
  }

  renderComponent() {
    return(
      <Animated.View style={{marginTop: this.state.marginAnim}}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export class FloatingField extends BaseComponent {
  withBorder() {
    if (!this.props.noBorder) {
      return styles.withBorder;
    };
  }

  labelStyle() {
    if (this.props.focused) {
      return styles.focused;
    }
  }

  renderComponent() {
    return (
      <View style={styles.container}>
        <View style={[styles.fieldContainer, this.withBorder()]}>
          <FloatingLabel visible={this.props.focused}>
            <Text style={[styles.fieldLabel, this.labelStyle()]}>{this.props.labelText}</Text>
          </FloatingLabel>
          <FloatingFieldHolder withValue={this.props.focused}>
            {this.props.children}
          </FloatingFieldHolder>
        </View>
      </View>
    )
  }
}

FloatingField.defaultProps = {
  labelText: "Label"
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50
  },
  floatingLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  fieldLabel: {
    height: 30,
    fontSize: 12,
    color: '#818181',
    fontFamily: "Roboto-Regular",
    marginBottom: 50,
  },
  fieldContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  withBorder: {
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  valueText: {
    height: 100,
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    marginTop: 10,
  },
  withMargin: {
    marginTop: 10
  },
  focussed: {
    color: "#B1B1B1",
  },
  focussedTextField: {
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
});
