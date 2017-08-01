import React, { Component } from 'react';
import {View, Text, ListView,
        ActivityIndicator, RefreshControl, StyleSheet } from 'react-native'

import BaseComponent from 'src/components/BaseComponent'
import {mapStateToProps, mapDispatchToProps} from 'src/store/StateToProps'

export default class StaticListDisplayer extends BaseComponent {
  initializeState (props) {
    return {
      dataSource: new ListView.DataSource({
                    // rowHasChanged: (row1, row2) => row1 !== row2,
                    rowHasChanged: (row1, row2) => true,
                  })
    }
  }

  isValidItem(item) {
    if(this.props.isValidItem) {
      return this.props.isValidItem(item);
    }
    return true;
  }

  filterEntityIds(items) {
    var filteredEntityIds = [];

    for (var i=0; i < items.length; i++) {
      if(this.isValidItem(items[i])) {
        filteredEntityIds.push(items[i]);
      }
    }
    return filteredEntityIds;
  }

  updateDataSource() {
    let rows = this.props.data;
    rows = this.filterEntityIds(rows)
    this.state.dataSource = this.state.dataSource.cloneWithRows(rows)
  }

  getPageSize() {
    return 10
  }

  renderHeader() {
    if(this.props.renderHeader) {
      return this.props.renderHeader()
    }
    return null
  }

  renderFooter() {
    if(this.props.renderFooter) {
      return this.props.renderFooter()
    }
    return null
  }


  renderListHeader() {
    if(this.props.renderListHeader) {
      return this.props.renderListHeader()
    }
    return null;
  }

  renderDataList() {
    return (
       <ListView
          ref={ref => this.listView = ref}
          pageSize={this.getPageSize()}
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={this._renderListCard.bind(this)}
          renderHeader={this.renderListHeader.bind(this)}
        />
    )
  }

  _renderListCard(data, sectionId, rowId) {
    if(this.props.renderListCard) {
      return this.props.renderListCard(data, sectionId, rowId)
    }
    return (
      <View>
        <Text>No Data</Text>
      </View>
    );
  }

  renderComponent() {

      this.updateDataSource();

      return(
        <View style={[styles.listStyle, this.props.style]}>
          {this.renderHeader()}
          {this.renderDataList()}
          {this.renderFooter()}
        </View>
      );

  }
};

var styles = StyleSheet.create({
  listStyle: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1
  }
});

StaticListDisplayer.defaultProps = {
  getListName: null,
  onEndReached: null,
  renderHeader: null,
  renderOnEmpty: null,
  renderListCard: null,
  renderFooter: null,
  isValidItem: null,
  onContentSizeChange: null
}

