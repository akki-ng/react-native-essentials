import React, { Component } from 'react';
import {StyleSheet, Text, Image,
        View, Dimensions, Animated, Platform } from 'react-native';

import BaseComponent from 'src/components/BaseComponent'
let lodObj = require('lodash');

import { TabViewAnimated, TabViewPage , TabBar, TabViewTransitioner, SceneMap, TabViewPagerScroll, TabViewPagerPan, TabViewPagerAndroid} from 'react-native-tab-view';
const FirstRoute = () => <View style={[ styles.container, { backgroundColor: '#ff4081' } ]} />;
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} />;


export default class CommonTabs extends BaseComponent {
  initializeState() {
    var initialData = this.getInitialsTabsAndChildren(this.props);
    return  {
                    index: (this.state && this.state.index) ? this.state.index : this.props.selected,
                    routes: initialData.tabs,
                    children: initialData.children,
                 };
  }

  componentWillReceivePropsInternal(nextProps) {
    //TODO
    // if(this.state.index !== nextProps.selected) {
    //   this.setState({index: nextProps.selected})
    // }
    var initialData = this.getInitialsTabsAndChildren(nextProps);
    this.setState({
                    index: (nextProps.selected !== this.state.index) ? nextProps.selected : this.state.index,
                    routes: initialData.tabs,
                    children: initialData.children,
                 })
  }

  getInitialsTabsAndChildren(props) {
    var tabs = [];
    var children = {};
    var sceneMap = {};
    if(props.renderScene || !props.children || props.children.length == 0) {
      tabs = props.tabs
    } else if(!props.renderScene && props.children.length > 0) {
        for(var i = 0; i < props.children.length; i++) {
          var child = props.children[i];
          var tab = {};
          tab.key = child.props.tabkey.toString()
          tab.title = child.props.tabtitle
          // tab.icon = child.props.tabIcon
          // tab.selectedIcon = child.props.tabSelectedIcon
          tabs.push(tab);
          children[tab.key] = child;
        }
    }
    return {
      tabs: tabs,
      children: children,
      sceneMap: SceneMap(sceneMap)
    }
  }

  _handleChangeTab(index) {
    this.setState({ index });
    try {
      this.props.onRequestChangeTab(index)
    }catch(_error) {

    }
  };

  _renderHeaderTabBarTop(props) {
    return <TabBarTop {...props}/>;
  }

  _renderIcon_default(route) {
    if(route.focused) {
      return (
        <View style={[styles.multipleEntryTab, styles.selectedMultipleElement]}>
          <Image source={route.route.selectedIcon || {uri: 'summary'}} resizeMode={Image.resizeMode.contain} style={{
            height: 24,
            width: 24,
            alignSelf: 'center'
          }}/>
          <Text style={[styles.entryTabText, styles.selectedMultipleElementText]}>{route.route.title}</Text>
        </View>
      )
    }else {
      return (
        <View style={styles.multipleEntryTab}>
          <Image source={route.route.icon || {uri: 'summary'}} resizeMode={Image.resizeMode.contain} style={{
            height: 24,
            width: 24,
            alignSelf: 'center'
          }}/>
          <Text style={styles.entryTabText}>{route.route.title}</Text>
        </View>
      )
    }
  }

  _renderIcon(route) {
    if(this.props.renderIcon) {
      return this.props.renderIcon(route)
    }
    return this._renderIcon_default(route)
  }

  _renderLabel_Default(route) {
    if(route.focused) {
      return (
        <View style={[styles.multipleEntryTab, styles.selectedMultipleElement]}>
          <Text style={[styles.entryTabText, styles.selectedMultipleElementText]}>{route.route.title}</Text>
        </View>
      )
    }else {
      return (
        <View style={styles.multipleEntryTab}>
          <Text style={styles.entryTabText}>{route.route.title}</Text>
        </View>
      )
    }
  }

  _renderLabel(route) {
    if(this.props.renderLabel) {
      return this.props.renderLabel(route)
    }
    return this._renderLabel_Default(route)
  }


  _renderIndicator(props) {
    const { width, position } = props;

    const translateX = Animated.multiply(position, new Animated.Value(width));
    return (
        <Animated.View
        style={[ styles.indicator, { width, transform: [ { translateX } ] } ]}
      />
    );
  }

  _renderBadge() {
    return (
      <View style={styles.badge}>
        <Text style={styles.tabText}>Applicant</Text>
      </View>
    )
  }

  _renderHeader(props) {
    /*
    renderIndicator={this._renderIndicator.bind(this)}
                      tabWidth={deviceWidth / this.props.maxVisibleTabs}

     */

                      // renderIcon={this._renderIcon.bind(this)}
    var calculatedWidthStyle = null
    if(this.props.maxVisibleTabs) {
      let deviceWidth = Dimensions.get('window').width
      let deviceHeight = Dimensions.get('window').height

      calculatedWidthStyle = {maxWidth: deviceWidth / this.props.maxVisibleTabs}
    }
    if(this.props.showTabBar) {
      return <TabBar {...props}
                      pressColor='rgba(0, 0, 0, .2)'
                      renderLabel={this._renderLabel.bind(this)}
                      indicatorStyle={styles.indicator}
                      scrollEnabled={this.props.scrollEnabled}
                      style={styles.commonTabBar}
                      tabStyle={[styles.tabStyle, calculatedWidthStyle]}
                      />;
    } else {
      return null
    }
  }

  _renderSceneFromChildren() {

  }

  _renderScene({route} ){
    if(this.props.renderScene) {
      return this.props.renderScene(route);
    } else {
      return this.state.children[route.key];
    }
  }

  _renderPage(props) {
    return <TabViewPage {...props} renderScene={this._renderScene.bind(this)}/>;
  }

  _getNavigationState() {
    return {
      index: this.state.index,
      routes: this.state.routes,
    }
  }

  _onChangePosition(position) {
    if(Number.isInteger(position)) {
      if(this.props.onChangePosition) {
        this.props.onChangePosition(position)
      }
    }
  }

  _renderPager(props) {
   return (Platform.OS === 'ios') ? <TabViewPagerScroll {...props} /> : <TabViewPagerPan {...props} swipeEnabled={true} animationEnabled={true}/>
  }

  renderComponent() {
    return (
      <TabViewAnimated
        style={styles.container}
        lazy={this.props.lazy}
        navigationState={this._getNavigationState()}
        renderScene={this._renderScene.bind(this)}
        renderHeader={this._renderHeader.bind(this)}
        onRequestChangeTab={this._handleChangeTab.bind(this)}
        onChangePosition={this._onChangePosition.bind(this)}
      />
    );

        // renderPager={this._renderPager}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  entryTabText: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    alignSelf: 'center',
    color: 'gray',
  },
  selectedMultipleElementText: {
     // fontSize: 18,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  tabText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
  commonTabBar: {
    backgroundColor: '#ffffff',
    // // height: 50,
    // // margin: 0,
    // // marginTop: 0,
    // // paddingTop: 0,
    // padding: 10,
    // justifyContent:'flex-start',
    // flexDirection: 'row',
    borderColor: '#b1b1b1',
    borderTopWidth: 0.5
  },
  multipleEntriesTabs: {
     // backgroundColor: 'blue',
     // alignItems:'stretch',
     // justifyContent:'flex-start',
     // flex: 1,
     // padding: 5,
     // margin: 5,
  },
  multipleEntryTab: {
    backgroundColor: '#ffffff',
  },
  selectedMultipleElement: {

    // backgroundColor: 'orange'
  },
  indicator: {
    backgroundColor: '#10A835',
    // height: 2,
    // position: 'absolute',
    // bottom: 0
  },
  tabStyle: {
    borderColor: '#b1b1b1',
    // borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
  }
});

CommonTabs.defaultProps = {
  scrollEnabled: true,
  selected: 0,
  maxVisibleTabs: 4,
  tabs: [{
    key: "0",
    title: "First",
    icon: {uri: 'summary'},
    selectedIcon: {uri: 'summary'}
  }],
  showTabBar: true,
  onChangePosition: null,
  lazy: false
}

