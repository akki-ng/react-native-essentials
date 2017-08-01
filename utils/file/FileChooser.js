import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Image } from 'react-native'

import BaseComponent from 'src/components/BaseComponent'

import ActionSheet from 'react-native-action-sheet-xg';
import ImagePicker from 'react-native-image-crop-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

let BUTTONS = [
  'Take Photo',
  'Choose from Gallery',
  'Choose from Device',
  'Cancel'
];

let CANCEL_INDEX = 3;


export default class FileChooser extends BaseComponent {

  showActionSheet() {
    this.refs.action1.show();
  }

  onOptionSelect(buttonIndex) {
    if(buttonIndex != CANCEL_INDEX) {
      // IGNORE CANCEL
      switch(buttonIndex) {
        case 0 :
          this.openCamera(); break;
        case 1 :
          this.openGallery(); break;
        case 2 :
          this.openDocumentSelect(); break;
        default :
          this.openCamera(); break;
      }
    }
  }

  openCamera() {
    this.LOGGER.debug('opening camera')
    ImagePicker.openCamera({
      // width: 1200,
      // height: 900,
      cropping: true,
      compressImageQuality: 0.4,
    }).then(image => {
      this.onSelectComplete([image])
    }).catch(function(err) {

    });
  }

  openGallery() {
    this.LOGGER.debug('opening gallery')
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      cropping: true,
      multiple: true,
      compressImageQuality: 0.4,
      mediaType: 'photo'
    }).then(images => {
      this.onSelectComplete(images)
    }).catch(function(err) {

    });
  }

  onSelectComplete(documents) {
    try {
      this.props.onSelectComplete(documents)
    }catch(_err) {

    }
  }

  openDocumentSelect() {
    this.LOGGER.debug('opening document select')
    var self = this
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error,url) => {
      this.onSelectComplete([url])
    });
  }

  renderComponent() {
    return (
        <View style={[styles.container, this.props.style]}>
          <TouchableOpacity onPress={this.showActionSheet.bind(this)}>
            <Image source={this.props.addDocumentIcon} style={styles.addDocumentIcon} />
          </TouchableOpacity>
          <ActionSheet
            title={this.props.title}
            message={this.props.message}
            options = {BUTTONS}
            cancelButtonIndex = {CANCEL_INDEX}
            callback = {this.onOptionSelect.bind(this)}
            ref = "action1"
          />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  cardLayout: {

  },
  addDocumentIcon: {
    width: 56,
    height: 56,
  }
});

FileChooser.defaultProps = {
   addDocumentIcon: {uri: 'ic_add_a_photo', isStatic: true},
   title: 'Choose Documents',
   message: '',
   onSelectComplete: function(images) {
    console.log(images)
   }
}

