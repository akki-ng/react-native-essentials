import React, { Component } from 'react';
import {View, ScrollView, StyleSheet,
        Text, Image, TouchableWithoutFeedback} from 'react-native'
import lodObj from 'lodash';

import {Actions} from 'react-native-router-flux';

import PhotoBrowser from 'react-native-photo-browser';
import {TopBar, BottomBar} from './bar'

import BaseComponent from 'src/components/BaseComponent'
export default class Gallery extends BaseComponent {
  initializeState() {
    return {
      pb: {
        mediaList: [{
                      photo: 'https://farm3.static.flickr.com/2667/4072710001_f36316ddc7_b.jpg',
                      selected: true,
                      caption: 'Grotto of the Madonna',
                      mediaActions: {
                        deleteNow: function(media) {
                          console.log('deleting', media)
                          return Promise.resolve()
                        },
                        onLongPress: function() {
                          alert('a')
                        },
                        downloadNow: function(media) {
                          console.log('downloading', media)
                        }
                      },
                      customData: {
                        customKey: 1,
                      }
                    },{
                      photo: 'https://farm3.static.flickr.com/2449/4052876281_6e068ac860_b.jpg',
                      thumb: 'https://farm3.static.flickr.com/2449/4052876281_6e068ac860_q.jpg',
                      selected: false,
                      caption: 'Beautiful Eyes',
                      mediaActions: {
                        deleteNow: function(media) {
                          console.log('deleting', media)
                          return Promise.resolve()
                        },
                        onLongPress: function() {
                          alert('a')
                        },
                        downloadNow: function(media) {
                          console.log('downloading', media)
                        }
                      },
                      customData: {
                        customKey: 2,
                      }
                    }]
      }
    }
  }

  _onActionButton(media, index) {
    // console.log('_onActionButton', media, index)
  }

  _onSelectionChanged(media, index, selected) {
    console.log('_onSelectionChanged', media, index, selected)
  }

  getAllSelectedMedia() {
    var selectedMedias = []
    for(var i = 0; i < this.state.pb.mediaList.length; i++) {
      var media = this.state.pb.mediaList[i]
      if(media.selected === true) {
        selectedMedias.push(media)
      }
    }
  }

  deleteAllSelected() {
    var selectedMedias = this.getAllSelectedMedia();
    alert('Coming Soon')
    // for(var i = 0; i < selectedMedias.length; i++) {
    //   var media = selectedMedias[i];
    //   try {
    //     media.mediaActions.deleteNow().then(function(){

    //     }).catch(() => {})
    //   }catch(err) {

    //   }
    // }
  }

  onPhotoLongPress(obj, media) {
    try {
      media.mediaActions.onLongPress()
    }catch(err) {

    }
  }

  bringToGridView() {
    if(this.PHOTOBROWSER) {
      this.PHOTOBROWSER._onGridButtonTap()
    }
  }

  renderComponent() {
    if(this.props.mediaList && this.props.mediaList.length == 0) {
      return (
          <View style={{flex: 1}}>
            <TopBar customTitle={this.props.title} onBack={this.props.onBack} displayed={true}/>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>No documents found</Text>
            </View>
          </View>
        )
    }
    return (
          <PhotoBrowser
                        onBack={this.props.onBack}
                        mediaList={this.props.mediaList}
                        initialIndex={0}
                        displayNavArrows={true}
                        displaySelectionButtons={false}
                        displayActionButton={true}
                        startOnGrid={this.props.startOnGrid}
                        enableGrid={this.props.enableGrid}
                        useCircleProgress={true}
                        alwaysShowControls={false}
                        displayTopBar={true}
                        onSelectionChanged={this._onSelectionChanged.bind(this)}
                        onActionButton={this._onActionButton.bind(this)}
                        onPhotoLongPress={this.onPhotoLongPress.bind(this)}
                        topBarComponent={TopBar}
                        topBarProps={{deleteAllSelected: this.deleteAllSelected.bind(this), customTitle: this.props.title}}
                        bottomBarProps={{}}
                        bottomBarComponent={BottomBar}
                        ref={(input) => { this.PHOTOBROWSER = input; }}
                      />
      )
  }
}

const styles = StyleSheet.create({})

Gallery.defaultProps = {
  onSingleDelete: null,
  onSingleShare: null,
  onSingleSaveToDevice: null,
  onMultiDelete: null,
  onMultiShare: null,
  onMultiSaveToDevice: null,
  mediaList: [],
  title: 'My Gallery',
  enableGrid: true,
  startOnGrid: true,
  onBack: () => {}
}
