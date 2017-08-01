import React, { Component } from 'react';
import {Text, View, TouchableWithoutFeedback,
        DatePickerAndroid, StyleSheet } from 'react-native'

import DatePicker from 'react-native-datepicker'

import {FloatingField} from 'src/components/utils/fields/FloatingLabelField'
import BaseComponent from 'src/components/BaseComponent'
import moment from 'moment'

export default class FloatLabelDatePicker extends BaseComponent{
  initializeState(props) {
    return {
      focussed: false,
    }
  }

  withBorder() {
    if (!this.props.noBorder) {
      return styles.withBorder;
    };
  }

  showPicker = async (options) => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
      } else {
        var date = new Date(year, month, day);
        this.setValue(date);
      }
    } catch ({code, message}) {
      console.warn(`Error in example : `, message);
    }
  };

  renderComponentOld() {
    var date_value = ""
    if(this.props.value != undefined) {
      date_value = moment(this.props.value).format(this.props.dateFormat);
    }

    return(
      <FloatingField labelText={this.props.placeholder} focused={this.props.value}>
        <TouchableWithoutFeedback
          onPress={this.showPicker.bind(this, {
            date: this.props.value ? new Date(this.props.value).getTime() : new Date(this.props.initialValue).getTime(),
            minDate: this.props.minDate ? new Date(this.props.minDate).getTime() : new Date().getTime(),
            maxDate: this.props.maxDate ? new Date(this.props.maxDate).getTime() : new Date().getTime(),
          })}>
          <View>
            <Text style={[styles.fieldLabel, (date_value instanceof Date  ) ? styles.valueText : ""]}>{this.props.value == undefined || this.props.value == null ? this.props.placeholder : date_value}</Text>
          </View>
        </TouchableWithoutFeedback>
      </FloatingField>
    );
  }

  renderComponent() {
    var date_value = null
    if(this.props.value != undefined) {
      date_value = moment(this.props.value).format(this.props.dateFormat);
    }

    // this.props.value ? new Date(this.props.value) : new Date(this.props.initialValue)

    return (
        <FloatingField labelText={this.props.placeholder} focused={this.props.value}>
          <DatePicker
              style={{width: -1}}
              date={date_value}
              mode={this.props.mode}
              disabled={!this.props.editable}
              placeholder={this.props.placeholder}
              format={this.props.dateFormat}
              minDate={this.props.minDate ? new Date(this.props.minDate) : new Date()}
              maxDate={this.props.maxDate ? new Date(this.props.maxDate) : new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              hideText={false}
              customStyles={{
                dateIcon: {
                  // position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderColor: 'transparent',
                  borderWidth: 0,
                  position: 'absolute',
                  left: 0
                },
                placeholderText: styles.fieldLabel,
                dateText: [styles.fieldLabel, styles.valueText, this.props.editable ? null : this.props.disabledTextStyle],
                dateTouchBody: {backgroundColor: 'transparent'},
                disabled: styles.disabled
              }}
              onDateChange={(dateString, date) => {this.setValue(date)}}
           />
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

  labelStyle() {
    if (this.state.focussed) {
      return styles.focussed;
    }
  }

  placeholderValue() {
    if (this.state.text) {
      return this.props.placeholder;
    }
  }

  setValue(value) {
    this.setState({
      value: value
    });
    try {
       return this.props.onChange(value);
    } catch (_error) {}
  }

  withMargin() {
    if (this.state.text) {
      return styles.withMargin;
    }
  }
}

const styles = StyleSheet.create({
  fieldLabel: {
    height: 30,
    color: '#818181',
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginLeft: 5,
    marginTop: 15
  },
  valueText: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    marginTop: 15,
    marginLeft: 5,
    color: "#000000"
  },
  textFieldStyle: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
  disabled: {
    backgroundColor: 'transparent'
  }
})

FloatLabelDatePicker.defaultProps = {
  minDate: new Date(1900,1,1),
  maxDate: new Date(),
  placeholder: "Choose date",
  dateFormat: 'MMMM YYYY',
  mode: 'date',
  initialValue: new Date(),
  editable: true,
  disabledTextStyle: {
    color: '#919191'
  }
}
