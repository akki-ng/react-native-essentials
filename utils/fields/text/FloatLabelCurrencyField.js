import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native'
import BaseComponent from "src/components/BaseComponent"
import FloatLabelTextField from "src/components/utils/fields/text/FloatLabelTextField"

export default class FloatLabelCurrencyField extends BaseComponent {
  renderComponent() {
    return (
        <View>
          <FloatLabelTextField
            placeholder={this.props.placeholder}
            style={[styles.valueText, this.props.style]}
            defaultValue={this.props.defaultValue}
            value={commaSeparatedValue(this.props.value)}
            maxLength={this.props.maxLength}
            selectionColor={this.props.selectionColor}
            onChangeText={this.onChangeText.bind(this)}
            secureTextEntry={this.props.secureTextEntry}
            keyboardType={this.props.keyboardType}
            autoCapitalize={this.props.autoCapitalize}
            autoCorrect={this.props.autoCorrect}
            blurOnSubmit={true}
            onSubmitEditing={this.unsetFocus}
            editable={this.props.editable}
            placeholderTextColor="#818181"
            multiline={this.props.multiline}
            ref={(input) => { this.textInput = input; }}
          />
          <Text style={styles.numberToWords}>{number2text(this.props.value)}</Text>
        </View>
      )
  }

  onChangeText(value) {
    value = (value == undefined || value == "") ? 0 : parseInt(value.replace(/,/g, ''));
    try {
      return this.props.onChangeText(value);
    } catch (_error) {}
  }

  setText(value) {
    this.textInput.setText(value);
  }

  setFocus() {
    this.textInput.setFocus();
  }

  unsetFocus() {
    this.textInput.unsetFocus()
  }
}

function commaSeparatedValue(value) {
    if(value != undefined && value != 0) {
      return insertCommas(value);
    } else {
      return "";
    }
  }


function insertCommas(number) {
  number = number.toString();
  number = Math.floor(number);
  number = number.toString();
  var lastThree = number.substring(number.length - 3);
  var otherNumbers = number.substring(0,number.length-3);
  if(otherNumbers != '')
    lastThree = ',' + lastThree;
  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return res
}


function number2text(value) {
  if(value > 0) {
    var fraction = Math.round(frac(value)*100);
    var f_text = "";

    if(fraction > 0) {
      f_text = "and "+ convert_number(fraction) +" Paise";
    }

    return "Rupees " + convert_number(value) + f_text + " only";
  }
  else {
    return ""
  }
}

function frac(f) {
  return f % 1;
}

function convert_number(number)
{
  if ((number < 0))
  {
    return "";
  }
  var Gn = Math.floor(number / 10000000);
  number -= Gn * 10000000;
  var kn = Math.floor(number / 100000);
  number -= kn * 100000;
  var Hn = Math.floor(number / 1000);
  number -= Hn * 1000;
  var Dn = Math.floor(number / 100);
  number = number % 100;
  var tn= Math.floor(number / 10);
  var one=Math.floor(number % 10);
  var res = "";

  if (Gn>0)
  {
    res += (convert_number(Gn) + " Crore");
  }
  if (kn>0)
  {
    res += (((res=="") ? "" : " ") +
    convert_number(kn) + " Lakh");
  }
  if (Hn>0)
  {
    res += (((res=="") ? "" : " ") +
    convert_number(Hn) + " Thousand");
  }

  if (Dn)
  {
    res += (((res=="") ? "" : " ") +
    convert_number(Dn) + " Hundred");
  }


  var ones = Array("", "One", "Two", "Three", "Four", "Five", "Six","Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen","Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen","Nineteen");
  var tens = Array("", "", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty","Seventy", "Eighty", "Ninety");

  if (tn>0 || one>0)
  {
    if (!(res==""))
    {
      res += " AND ";
    }
    if (tn < 2)
    {
      res += ones[tn * 10 + one];
    }
    else
    {

      res += tens[tn];
      if (one>0)
      {
        res += ("-" + ones[one]);
      }
    }
  }

  if (res=="")
  {
    res = "zero";
  }
  return res;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  numberToWords: {
    fontSize: 14,
    color: "#54a624",
    paddingTop: 5,
  },
  textFieldStyle: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
})

FloatLabelCurrencyField.defaultProps = {
  keyboardType: "numeric"
}



