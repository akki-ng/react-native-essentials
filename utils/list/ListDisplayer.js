import React, { Component } from 'react';
import {View, Text, ListView,
        ActivityIndicator, RefreshControl, StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import {mapStateToProps, mapDispatchToProps} from 'src/store/StateToProps'

//import NoInternetCard from 'src/components/errors/NoInternetCard'

import BaseComponent from 'src/components/BaseComponent'


class ListDisplayer extends BaseComponent {
  initializeState () {
    return {
      dataSource: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => {
                      // return row1 !== row2;
                      return true;
                    },
                  }),
      showEmpty: false
    }
  }

  componentDidMountInternal() {
    const {listReducer, appStateReducer} = this.props;
    const listExist = listReducer[this.getListName()] ? true : false;
    if(!listExist || (listReducer[this.getListName()].firstFetch && !listReducer[this.getListName()].isFetching)) {
      this._onEndReached();
    }
  }

  componentWillReceivePropsInternal(nextProps) {
    const {listReducer} = nextProps;
    const firstFetch = this.getListName() in listReducer ? listReducer[this.getListName()].firstFetch : true;
    const isFetching = this.getListName() in listReducer ? listReducer[this.getListName()].isFetching : true;
    if(!isFetching && firstFetch) {
      this._onEndReached();
    }
  }

  getListName() {
    if(this.props.getListName) {
      return this.props.getListName();
    }
    return "UndefinedList";
  }

  _onEndReached() {
    this.onEndReached();
  }

  onEndReached() {
    if(this.props.onEndReached) {
      this.props.onEndReached();
    }else {
    }
  }

  _onRefresh() {
    var self = this;
    if(this.props.onRefresh) {
      this.props.onRefresh();
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
      if(this.isValidItem(this.getItem(items[i]))) {
        filteredEntityIds.push(items[i]);
      }
    }
    return filteredEntityIds;
  }

  getRows() {
    const {dispatch, listReducer} = this.props;
    let rows = this.getListName() in listReducer ? listReducer[this.getListName()].list : []
    return rows;
  }

  updateDataSource() {
    const {dispatch, listReducer} = this.props;
    const isFetching = this.getListName() in listReducer ? listReducer[this.getListName()].isFetching : true;
    let rows = this.getRows();
    this.state.showEmpty = rows.length < 1 && !isFetching;
    rows = this.filterEntityIds(rows)
    this.state.dataSource = this.state.dataSource.cloneWithRows(rows)
    // this.setState(this.state);
  }

  getPageSize() {
    return 1
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

  renderOnEmpty() {
    if(this.props.renderOnEmpty) {
      return this.props.renderOnEmpty();
    }
    return (
      <View>
        <Text>Empty List</Text>
      </View>
    )
  }

  _renderListHeader() {
    if(this.props.renderListHeader instanceof Function) {
      return this.props.renderListHeader();
    }
    return this.renderListHeader();
  }

  renderListHeader() {
    return (
      <Text style={{paddingLeft: 5}}>Showing {this.state.dataSource.getRowCount(0)} entries</Text>
    )
  }

  renderDataList() {
    const {listReducer, appStateReducer} = this.props;
    const listExist = listReducer[this.getListName()] ? true : false;

    const isEmpty = ( !listExist ||
          (listExist && (listReducer[this.getListName()].list.length == 0) ) )? true: false;
    var isFetching = listReducer[this.getListName()] ? listReducer[this.getListName()].isFetching : true
    isFetching = isFetching && !isEmpty;

    return (
      <View style={{flex: 1}}>
        {isEmpty && <ActivityIndicator animating={isEmpty} color={this.props.indicatorColor}/>}
        <ListView
          ref={ref => this.listView = ref}
          onContentSizeChange={this.onContentSizeChange.bind(this)}
          pageSize={this.getPageSize()}
          dataSource={this.state.dataSource}
          onEndReached={this._onEndReached.bind(this)}
          enableEmptySections={true}
          renderRow={this._renderListCard.bind(this)}
          renderHeader={this._renderListHeader.bind(this)}
          refreshControl={<RefreshControl
              refreshing={isFetching}
              onRefresh={this._onRefresh.bind(this)}
            />}
        />
      </View>
    )
  }

  getItem(entityId) {
    const {listReducer} = this.props;

    var itemData = listReducer[this.getListName()].entities[entityId]
    return itemData;
  }

  _renderListCard(entityId, sectionId, rowId) {
    var itemData = this.getItem(entityId)
    return this.renderListCard(itemData, entityId, sectionId, rowId)
  }

  renderListCard(data, entityId, sectionId, rowId) {
    if(this.props.renderListCard) {
      return this.props.renderListCard(data, entityId, sectionId, rowId)
    }
    return (
      <View>
        <Text>No Card</Text>
      </View>
    );
  }

  onContentSizeChange() {
    if(this.props.onContentSizeChange) {
      this.props.onContentSizeChange();
    }
  }

  renderComponent() {
     // <NoInternetCard/>
    const {listReducer, appStateReducer} = this.props;
    if(!appStateReducer.isNetworkAvailable) {
      return(
        <View>
          {this.renderHeader()}

          {this.renderFooter()}
        </View>
      )
    }else {
      this.updateDataSource();
      return(
        <View style={[styles.listStyle, this.props.style]}>
          {this.renderHeader()}
          {!this.state.showEmpty &&
            this.renderDataList()}
          {this.state.showEmpty &&
            this.renderOnEmpty()}
          {this.renderFooter()}
        </View>
      );
    }
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

ListDisplayer.defaultProps = {
  getListName: null,
  onEndReached: null,
  renderHeader: null,
  renderOnEmpty: null,
  renderListCard: null,
  renderFooter: null,
  isValidItem: null,
  onContentSizeChange: null
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDisplayer);
