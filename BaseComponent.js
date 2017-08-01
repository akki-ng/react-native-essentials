import React, { Component } from 'react';
import {Text, View, InteractionManager} from 'react-native';
import lodObj from 'lodash';


export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = this.initializeState();
    this.state.compState = 'idle'
  }

  busy(callBack) {
    var self = this
    InteractionManager.runAfterInteractions(() => {
      self.setState({compState: 'busy'}, true, callBack)
    })
  }

  idle(callBack) {
    var self = this
    InteractionManager.runAfterInteractions(() => {
      self.setState({compState: 'idle'}, true, callBack)
    })
  }

  // displayName = "some name", better logging

  initializeState() {
    /*
      This method gets called only for constructor, Use it to do any operation at constructor level

     */
    return {}
  }

  componentWillMount() {
    this.componentWillMountInternal()
  }

  componentWillMountInternal() {

  }

  componentDidMount() {
    this.componentDidMountInternal()
  }

  componentDidMountInternal() {

  }

  componentWillReceiveProps(nextProps) {
    this.componentWillReceivePropsInternal(nextProps)
  }

  componentWillReceivePropsInternal(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.shouldComponentUpdateInternal(nextProps, nextState);
  }

  getDispatcher() {
    return this.props.dispatch
  }

  shouldComponentUpdateInternal(nextProps, nextState) {
    /*
    shouldComponentUpdate() is invoked before rendering when new props or state are being received. Defaults to true. This method is not called for the initial render or when forceUpdate() is used.
    Returning false does not prevent child components from re-rendering when their state changes.
     */
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    this.componentWillUpdateInternal(nextProps, nextState);
  }

  componentWillUpdateInternal(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {
    this.componentDidUpdateInternal(prevProps, prevState)
  }

  componentDidUpdateInternal(prevProps, prevState) {
    /*
    Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props
     */
  }

  componentWillUnmount() {
    this.componentWillUnmountInternal()
  }

  componentWillUnmountInternal() {
    /*
    Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any DOM elements that were created in componentDidMount
     */
  }

  render() {
    return this.renderComponent()
  }

  renderComponent() {
    return null
  }

  setState(updateObject, merge=true, callback) {
    if(merge && updateObject instanceof Object) {
      var newState = lodObj.mergeWith({}, this.state, updateObject)
      super.setState(newState, callback)
    }else {
      super.setState(updateObject, callback)
    }

  }

  mergeState(updateObject) {
    this.setState(lodObj.mergeWith({}, this.state, updateObject))
  }

  updateStateAndNotify(updateObject, merge=true, callback) {
    var self = this
    this.setState(updateObject, merge, function() {
      self.onStateChange(callback)
    })

  }

  onStateChange(callback) {
    try {

    }catch(_err) {

    }
  }
}
