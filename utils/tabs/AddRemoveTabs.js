import React, { Component } from 'react';
import {StyleSheet, Text, Image,
        View, ScrollView, Dimensions,
        TouchableOpacity } from 'react-native';

import LoadingComponent from 'src/components/utils/loading/LoadingComponent'

import BaseComponent from 'src/components/BaseComponent'


export default class AddRemoveTabs extends BaseComponent {
  initializeState() {
    var selectedTab = this.props.selectedTab < this.props.tabs.length ? this.props.selectedTab : 0;
    return {
      selectedTab: this.props.tabs[selectedTab],
      tabs: this.props.tabs,
      isAdding: false,
      isRemoving: false
    }
  }

  _renderTabPage() {
    if(this.props.tabs.length == 0) {
      return (
          null
        )
    }else {
      return (
        <View style={[styles.container]}>
          { (this.props.allowRemove && (this.props.minTabs < this.props.tabs.length && !this.state.selectedTab.dontRemove) )&&
          <TouchableOpacity key={this.props.tabs.indexOf(this.state.selectedTab)} onPress={this.removeTab.bind(this, this.state.selectedTab)}>
            <View style={[styles.removeTabMessageHolder]}>
              <Text style={styles.removeTabMessageText}>
                REMOVE {this.state.selectedTab.title || ""}?
              </Text>
            </View>
          </TouchableOpacity>
          }
          <View>
            {this.props.renderTabPage(this.state.selectedTab)}
          </View>
        </View>
      )
    }
  }

  // componentWillReceivePropsInternal(nextProps) {
  //   var selectedTab = this.props.selectedTab;
  //   if(this.state.isAdding) {
  //     selectedTab = nextProps.tabs.length - 1;
  //   }

  //   this.setState({selectedTab: nextProps.tabs[selectedTab], isAdding: false, isRemoving: false})
  // }

  onTabPress(tab) {
    this.setState({ selectedTab: tab });
    try {
      return this.props.onTabChange(tab)
    } catch (_error) {}
  }

  removeTab(tab) {
    if(this.props.minTabs < this.props.tabs.length) {
      this.state.isRemoving = true
      this.props.onRemoveTab(tab);
    }
  }

  addTab() {
    this.state.isAdding = true
    this.props.onAddTab();
  }

  renderTab(tab, isAddButton) {
    if(!this.state.selectedTab) {
      return null
    }
    let deviceWidth = Dimensions.get('window').width
    return (
        <TouchableOpacity key={this.props.tabs.indexOf(tab)} onPress={ isAddButton == true ? this.addTab.bind(this) : this.onTabPress.bind(this, tab)}>
          <View>
            <View style={[styles.multipleEntryTab, this.state.selectedTab.key == tab.key ? styles.selectedMultipleElement : null, styles.scrollableTab, {width: deviceWidth/this.props.maxVisibleTabs}]}>
                <Image source={ this.state.selectedTab.key == tab.key ? tab.selectedIcon || this.props.selectedIcon : tab.icon || this.props.icon} resizeMode={Image.resizeMode.contain} style={styles.entryTabImage}/>
                <Text style={[styles.entryTabText, this.state.selectedTab.key == tab.key ? styles.selectedMultipleElementText : null]}>
                  {tab.title}
                </Text>
            </View>
          </View>
          {
            this.state.selectedTab.key == tab.key &&
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <Image source={this.props.indicatorIcon} resizeMode={Image.resizeMode.cover} style={styles.tabIndicator}/>
            </View>
          }
        </TouchableOpacity>
      )
  }

  renderTabs() {
    var tabs = [];
    for(var i = 0; i < this.props.tabs.length; i++ ) {
      var tab = this.props.tabs[i];
      tabs.push(this.renderTab(tab))
    }

    if(this.props.allowAdd && tabs.length < this.props.maxTabs) {
      tabs.push(  this.renderTab({
                    key: "_myAdd",
                    title: "ADD ANOTHER",
                    icon: this.props.addIcon
                  }, true) );
    }

    return (
       <ScrollView
          horizontal={true}
          scrollEnabled={true}
          bounces={true}
          scrollsToTop={false}
          showsHorizontalScrollIndicator={true}
          ref={(scrollView) => { _scrollView = scrollView; }}
          style={styles.scrollableTabs} >
        {tabs}
      </ScrollView>
    )
  }

  renderComponent() {
    return (
        <View style={styles.container}>
          {this.renderTabs()}
          {this._renderTabPage()}
          <LoadingComponent {...this.state} />
        </View>
      )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  removeTabMessageHolder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    justifyContent:'flex-start',
    flex: 1,
    padding: 16
  },
  removeTabMessageText: {
    color: '#f44336',
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  multipleEntryTab: {
    backgroundColor: '#f5f5f5',
    height: 64,
    alignItems:'center',
    justifyContent:'center',
    flex: 1,
  },
  selectedMultipleElement: {
    backgroundColor: '#4285f4',
  },
  scrollableTabs: {
    marginTop: 2,
    padding: 0,
    paddingTop: 0,
    margin: 0,
    marginTop: 0,
    backgroundColor: '#ffffff',
    flex: 0
  },
  scrollableTab: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 300
  },
  entryTabImage: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  entryTabText: {
    fontSize: 10,
    fontFamily: "Roboto-Medium",
    alignSelf: 'center',
    color: 'gray',
  },
  selectedMultipleElementText: {
    color: "#ffffff",
  },
  tabIndicator: {
    height: 35,
    width: 50,
    marginTop: -16,
    marginBottom: -12
    // backgroundColor: 'green',
  },

});


AddRemoveTabs.defaultProps = {
  scrollEnabled: true,
  maxVisibleTabs: 4,
  selectedTab: 0,
  addIcon: {uri: 'ic_person_dark', isStatic: true},
  selectedIcon: {uri: 'ic_person_light', isStatic: true},
  icon: {uri: 'ic_person_dark', isStatic: true},
  indicatorIcon: {uri: 'ic_filter_arrow_drop_down', isStatic: true},
  allowAdd: true,
  maxTabs: 20,
  allowRemove: true,
  minTabs: 1,
  renderTabPage: function(selectedTab) {
                              return (
                                    <View>
                                      <Text>Undefined {selectedTab.key} {selectedTab.title}</Text>
                                    </View>
                                  )
                            },
  tabs: [{
    key: "0",
    title: "First"
  }, {
    key: "1",
    title: "Second"
  },
  {
    key: "2",
    title: "3"
  }, {
    key: "3",
    title: "4"
  }],
  onTabChange: function(selectedTab) {

  }
}
