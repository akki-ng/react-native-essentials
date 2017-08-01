import React, { Component } from 'react';
import {View, Image, StyleSheet, Dimensions,
        TouchableHighlight, AsyncStorage, ToastAndroid,
        Text, TouchableOpacity, ScrollView,
        Modal, TextInput, ListView} from 'react-native'
import BaseComponent from "src/components/BaseComponent"
import SearchBar from 'src/components/utils/search/SearchBar'


export default class CommonDropdown extends BaseComponent {
  initializeState() {
    return {
      open: false,
      searchState: {

      }
    }
  }

  openModal() {
    if(this.props.editable) {
      this.setState({open: true})
    }
  }

  closeModal() {
    this.setState({open: false})
    this.onClose();
  }

  onOpen() {
    this.props.onOpen()
  }

  onClose() {
    this.props.onClose()
  }

  selectOption(value, text) {
    // this.setState({selectedValue: value})
    if(this.props.editable) {
      this.props.onSelect(value, text)

      if(this.props.closeAfterSelect) {
        this.closeModal()
      }
    }
  }

  getTextFromValue(value) {
    for (var i = 0; i < this.props.items.length; i++) {
      var item = this.props.items[i]
      if(item[this.props.valueKey] === value) {
        return item[this.props.labelKey];
      }
    }
    return this.props.title
  }

  renderList() {
    var list = [];

    for (var i = 0; i < this.props.items.length; i++) {
      var item = this.props.items[i]
      list.push(this.renderItem(item[this.props.labelKey], item[this.props.valueKey], i));
    }

    return list;
  }

  renderItem(text, value, key) {
    var val = value === undefined ? text : value

    var re = this.state.searchState.searchValueRegex;


    if(!this.props.allowSearch || text.replace(/\s/g,'').match(re)) {
      var selected;

      if(val == this.props.selectedValue) {
        selected = this.props.selectedItemStyle;
      }
      return (
        <TouchableOpacity key={key} onPress={this.selectOption.bind(this, val, text)}>
          <View style={[styles.itemStyle, this.props.itemStyle, selected]}>
            <Text style={[styles.dropdownText, {flex: 1}]}>{text}</Text>
            {
              val == this.props.selectedValue &&
              <Image resizeMode={Image.resizeMode.contain} source={this.props.selectIcon} style={[styles.selectIcon, this.props.selectIconStyle]}/>
            }
          </View>
        </TouchableOpacity>
      )
    }else {
      return null;
    }
  }


  renderListItem(data, entityId, sectionId, rowId) {
    var text = data[this.props.labelKey];
    var value = data[this.props.valueKey];

    var val = value === undefined ? text : value

    var re = this.state.searchState.searchValueRegex;


    if(!this.props.allowSearch || (text && text.replace(/\s/g,'').match(re)) ) {
      var selected;

      if(val == this.props.selectedValue) {
        selected = this.props.selectedItemStyle;
      }
      return (
        <TouchableOpacity onPress={this.selectOption.bind(this, val, text)}>
          <View style={[styles.itemStyle, this.props.itemStyle, selected]}>
            <Text style={[styles.dropdownText, {flex: 1}]}>{text}</Text>
            {
              val == this.props.selectedValue &&
              <Image resizeMode={Image.resizeMode.contain} source={this.props.selectIcon} style={[styles.selectIcon, this.props.selectIconStyle]}/>
            }
          </View>
        </TouchableOpacity>
      )
    }else {
      return null;
    }
  }

  renderTitle() {
    return (
      <View style={[{flexDirection: 'row', justifyContent: 'center', padding:10}]}>
        <Text style={[styles.dropdownHeading, this.props.headingStyle]}>{this.props.title}</Text>
        <TouchableOpacity style={[{alignSelf: 'center', flex: 0}]} onPress={this.closeModal.bind(this)}>
          <Image resizeMode={Image.resizeMode.contain} source={this.props.closeIcon} style={[styles.closeIconStyle, this.props.closeIconStyle]}/>
        </TouchableOpacity>
      </View>
    )
  }

  _getValueStyle() {
    if(!this.props.editable) {
      return this.props.disabledValueStyle
    }
    if(this.props.selectedValue) {
      return this.props.valueStyle
    }
    return this.props.noValueStyle;
  }

  renderComponent() {
    return (
        <TouchableOpacity style={styles.fieldContainer} onPress={this.openModal.bind(this)}>
          <Text style={[styles.dropdownText, styles.dropdownLabel, this._getValueStyle()]}>{this.getTextFromValue(this.props.selectedValue)}</Text>
          <Image resizeMode={Image.resizeMode.contain} source={this.props.expandIcon} style={[styles.expandIcon, this.props.expandIconStyle]}/>
           {this.renderModal()}
        </TouchableOpacity>
      )
  }

  onSearchTextChange(searchState) {
    this.setState({searchState: searchState})
  }

  renderSearchBar() {
    return (
        <SearchBar onChange={this.onSearchTextChange.bind(this)} searchValue={this.state.searchState.searchValueText}/>
      )
  }

  renderModal() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.items);

    return (
      <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.open}
          onRequestClose={this.onClose.bind(this)}
          onShow={this.onOpen.bind(this)}>
        <View style={[styles.container]}>
            <TouchableOpacity style={[styles.modal]} onPress={this.closeModal.bind(this)}/>

            <View style={[styles.listContainerStyle , this.props.listContainerStyle, {}]} >
              {this.renderTitle()}
              {this.props.allowSearch && this.renderSearchBar()}
              <ListView
                  dataSource={dataSource}
                  renderRow={this.renderListItem.bind(this)}
                />
            </View>
        </View>
      </Modal>
    )
  }
}

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  listContainerStyle: {
    backgroundColor: "#ffffff",
    height: deviceHeight/2.2,
  },
  expandIcon: {
    height: 35,
    width: 35
  },
  selectIcon: {
    height: 20,
    width: 25
  },
  itemStyle: {
    paddingTop: 15,
    paddingLeft: 36,
    paddingRight: 25,
    paddingBottom: 15,
    flexDirection: 'row'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0000006b'
  },
  dropdownHeading: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 24,
    color: "#1f1f1f",
    alignItems: 'center',
    alignSelf: 'center',
    opacity: 0.8,
    flex: 1
  },
  dropdownText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 30,
    color: "#1f1f1f",
    opacity: .8,
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    paddingLeft: 5
  },
  dropdownLabel: {

  },
  selectedItem: {
    backgroundColor: '#eeeeee'
  },
  closeIconStyle: {
    height:28,
    width: 28
  }
});

CommonDropdown.defaultProps = {
  position: 'bottom',
  isOpen: false,
  title: 'Please select',
  allowSearch: true,
  items: [{text: 'akki', value: "0"}, {text: 'ramesh', value: "1"}],
  onSelect: function(value, text) {
    console.log(value + "-" + text)
  },
  labelKey: "text",
  valueKey: "value",
  closeAfterSelect: true,
  onClose: function() {
    console.log('Modal just closed');
  },
  onOpen: function() {
    console.log('Modal just opened');
  },
  selectedValue: null,
  expandIcon: {uri: 'ic_action_navigation_arrow_drop_down', isStatic: true},
  closeIcon: {uri: 'ic_action_navigation_close_dark', isStatic: true},
  selectIcon: {uri: 'ic_list_check', isStatic: true},
  selectedItemStyle: {backgroundColor: '#eeeeee'},
  editable: true,
  disabledValueStyle: {
    fontSize: 18,
    color: "#818181",
    fontFamily: "Roboto-Regular",
    lineHeight: 30
  },
}


// EXAMPLE USAGE

// <CommonDropdown title='State' items={this.getBusinessNatureList()} selectedValue={this.state.address.state} onSelect={(value, text) => this.setState({ address: {state: value}})}/>


