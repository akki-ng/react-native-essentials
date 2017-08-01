import React, { Component } from 'react';
import {View, StyleSheet, Text, Image } from 'react-native'

let lodObj = require('lodash');

import * as Progress from 'react-native-progress';
import BaseComponent from 'src/components/BaseComponent'

const INITIAL_PROGRESS = 0.01

export default class MultiUploader extends BaseComponent {
  initializeState() {
    return {
      requestedUploads: [],
      successfulUploads: [],
      failureUploads: [],
      uploadingIndex: -1,
      color: "#f5a623",
      progress: INITIAL_PROGRESS,
      uploading: false,
    }
  }

  _startQueueUpload() {
    var self = this

    this.setState({uploading: true, progress: Math.random(), uploadingIndex: this.state.uploadingIndex + 1}, true, () => {

      var toBeUploaded = self.state.requestedUploads[self.state.uploadingIndex]
      this.props.handleUpload(toBeUploaded, this).then(function(successObj) {
        var concatedSuccessfulUploads = lodObj.concat(self.state.successfulUploads, successObj)
        self.setState({uploading: false, progress: INITIAL_PROGRESS, successfulUploads: concatedSuccessfulUploads}, true, () => {
          self.uploadIfNeeded()
        })

      }).catch(function(err) {
        var concatedFailureUploads = lodObj.concat(self.state.failureUploads, toBeUploaded)
        self.setState({uploading: false, progress: INITIAL_PROGRESS, failureUploads: concatedFailureUploads}, true, () => {
          self.uploadIfNeeded()
        })
      })

    })
  }

  uploadIfNeeded() {
    if(this.state.uploading === false && this.state.uploadingIndex + 1 < this.state.requestedUploads.length) {
      this._startQueueUpload()
    }
  }

  requestUpload(moreRequestedUploads) {
    var concatedRequestedUploads = lodObj.concat(this.state.requestedUploads, moreRequestedUploads)

    this.setState({requestedUploads : concatedRequestedUploads}, false, () => {this.uploadIfNeeded()})
  }

  setProgress(progress) {
    this.setState({progress: progress})
  }

  onLayout({nativeEvent}) {
    if(nativeEvent && nativeEvent.layout) {
      this.setState({width: nativeEvent.layout.width})
    }
  }

  renderComponent() {
    var statusText = "Uploading..."

    if(this.state.uploading === false) {
      var totalAvailableDocsCount = this.state.requestedUploads.length + this.props.initialAvailableDocsCount

      statusText = "Uploaded " + (this.state.successfulUploads.length + this.props.initialAvailableDocsCount) + "/" + (totalAvailableDocsCount)
    }else {
      var uploadingCount = this.state.uploadingIndex + 1
      var uploadingText = uploadingCount

      switch(uploadingCount) {
        case 1:
          uploadingText = "1st"; break;
        case 2:
          uploadingText = "2nd"; break;
        case 3:
          uploadingText = "3rd"; break;
        default:
          uploadingText = uploadingCount + "th"; break;
      }

      statusText = "Now uploading " + uploadingText + " of " + (this.state.requestedUploads.length)
    }
    return (
        <View style={styles.container}>
          <Text style={styles.statusText}>{statusText}</Text>
          <View style={styles.resultPanel}>
            <Text style={[styles.result, styles.resultSuccess]}>Success : {this.state.successfulUploads.length}</Text>
            <Text style={[styles.result, styles.resultFail]}>Fail : {this.state.failureUploads.length}</Text>
          </View>
          <View style={styles.progressBarWrapper} onLayout={this.onLayout.bind(this)}>
            {this.state.width &&
              <Progress.Bar progress={this.state.progress} width={this.state.width} color={this.state.color} />
            }
          </View>

        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  progressBarWrapper: {

  },
  statusText: {
    fontSize: 14,
    // color: "#000000",
    fontFamily: "Roboto-Regular",
  },
  resultPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  result: {
    fontSize: 12,
    // color: "#000000",
    fontFamily: "Roboto-Regular",
  },
  resultSuccess: {
    color: '#0fb14a'
  },
  resultFail: {
    color: '#d60315'
  }
})

MultiUploader.defaultProps = {
  showSingleProgressBar: true,
  initialAvailableDocsCount: 0,
  handleUpload: function(requestObj, uploaderObj) {
    var promise = new Promise(function(resolve, reject) {
      uploaderObj.setProgress(Math.random())
      setTimeout(function() {
        var temp = Math.random()
        if(temp < 0.5) {
          reject({})
        }else {
          resolve(requestObj)
        }
      }, 2000)
    });
    return promise
  }
}
