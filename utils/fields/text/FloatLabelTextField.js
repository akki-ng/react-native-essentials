import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Animated } from 'react-native'
import {FloatingLabel, FloatingFieldHolder} from 'src/components/utils/fields/FloatingLabelField'
import BaseComponent from "src/components/BaseComponent"

class FloatLabelTextField extends BaseComponent {
  initializeState() {
    return {
      focussed: false,
      text: this.props.value
    }
  }

  componentWillReceivePropsInternal(newProps) {
    if (newProps.hasOwnProperty('value') && newProps.value !== this.state.text) {
      this.setState({ text: newProps.value })
    }
  }

  withBorder() {
    if (!this.props.noBorder) {
      if(this.state.focussed == false) {
        return styles.withBorder;
      }
      else {
        return styles.focussedTextField;
      }
    };
  }

  renderComponent() {
    return(
      <View style={[styles.container, this.props.wrapperStyle]}>
        <View style={[styles.fieldContainer, this.withBorder()]}>
          <FloatingLabel visible={this.state.text}>
            <Text style={[styles.fieldLabel, this.labelStyle()]}>{this.placeholderValue()}</Text>
          </FloatingLabel>
          <FloatingFieldHolder withValue={this.state.text}>
            <TextInput
              placeholder={this.props.placeholder}
              style={[styles.valueText, this.props.style, this.props.editable ? null : this.props.disabledTextStyle]}
              defaultValue={this.props.defaultValue}
              value={this.state.text || this.state.text == 0 ? this.state.text.toString() : ""}
              maxLength={this.props.maxLength}
              selectionColor={this.props.selectionColor}
              onFocus={this.setFocus.bind(this)}
              onBlur={this.unsetFocus.bind(this)}
              onChangeText={this.setText.bind(this)}
              secureTextEntry={this.props.secureTextEntry}
              keyboardType={this.props.keyboardType}
              autoCapitalize={this.props.autoCapitalize}
              autoCorrect={this.props.autoCorrect}
              blurOnSubmit={true}
              onSubmitEditing={this.unsetFocus.bind(this)}
              editable={this.props.editable}
              placeholderTextColor="#818181"
              multiline={this.props.multiline}
              underlineColorAndroid='transparent'
            />
          </FloatingFieldHolder>
        </View>
      </View>
    );
  }
  setFocus() {
    this.setState({
      focussed: true,
      valueTextFocussed: "focussedTextField",
    });
    try {
      return this.props.onFocus();
    } catch (_error) {}
  }

  unsetFocus() {
    this.setState({
      focussed: false,
      valueTextFocussed: "unfocussedTextField",
    });
  }

  labelStyle() {
    if (this.state.focussed) {
      return styles.focussed;
    }
  }

  placeholderValue() {
    if (this.props.placeholder) {
      return this.props.placeholder;
    }
  }

  setText(value) {
    this.setState({
      text: value
    });
    try {
      return this.props.onChangeText(value);
    } catch (_error) {}
  }

  withMargin() {
    if (this.state.text) {
      return styles.withMargin;
    }
  }
}

FloatLabelTextField.defaultProps = {
  autoCorrect: false,
  autoCapitalize: 'characters',
  disabledTextStyle: {
    color: '#919191'
  },
  wrapperStyle: {

  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
  },
  floatingLabel: {
    position: 'absolute',
    top: 0,
    left: 0
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
    height: 50,
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

module.exports = FloatLabelTextField
