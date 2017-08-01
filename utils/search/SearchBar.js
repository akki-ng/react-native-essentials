import React, { Component } from 'react';
import {View, Image, StyleSheet, Dimensions,
        TouchableHighlight, AsyncStorage, ToastAndroid,
        Text, TouchableOpacity, ScrollView ,
        Modal, TextInput} from 'react-native'

import BaseComponent from "src/components/BaseComponent"

export default class SearchBar extends BaseComponent {
  initializeState() {
    var searchValueText = this.props.searchValue || this.props.defaultValue || ""
    return {
      searchValueText: searchValueText,
      searchValueRegex: new RegExp("(" + searchValueText.trim().split(' ').join('|') + ")", "gi")
    }
  }

  onSearchTextChange(searchText) {
    var searchValue = searchText.replace(/\s/g,'').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var searchValueRegex = new RegExp("(" + searchValue.split(' ').join('|') + ")", "gi");
    this.setState({searchValueText : searchText, searchValueRegex: searchValueRegex});
    this.props.onChange({searchValueText : searchText, searchValueRegex: searchValueRegex});
  }

  renderComponent() {
    if(this.props.show) {
      return (
          <View style={[styles.barStyle, this.props.style]}>
            <TextInput
                placeholder={this.props.placeholder}
                style={[styles.valueText]}
                defaultValue={this.props.defaultValue}
                value={this.state.searchValueText}
                maxLength={this.props.maxLength}
                onChangeText={this.onSearchTextChange.bind(this)}
                keyboardType={this.props.keyboardType}
                autoCorrect={this.props.autoCorrect}
                underlineColorAndroid='transparent'
              />
            <Image resizeMode='contain' source={{uri: 'image!ic_action_action_search', isStatic: true}} style={styles.searchIcon}/>
          </View>
        )
    }else {
      return null;
    }
  }
}

var styles = StyleSheet.create({
  barStyle: {
    borderColor: '#e0e0e0',
    borderWidth: 0.5,
    padding: 5,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  valueText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    height: 30,
    padding: 5,
    flex: 1
  },
  searchIcon: {
    width: 35,
    height: 35
  }
});

SearchBar.defaultProps = {
  show: true,
  defaultValue: '',
  searchValue: '',
  maxLength: 10,
  keyboardType: 'default',
  onChange: function(searchState) {
    console.log(searchState);
  }
}
