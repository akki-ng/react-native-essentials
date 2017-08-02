/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';
import {BaseComponent, SimpleButton, ProgressButton, AbstractCard, SectionTitle, StandaloneLabel} from 'react-native-essentials'

export default class example extends BaseComponent {
  renderComponent() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, borderColor: 'orange', borderWidth: 2}}>
          <SectionTitle name="Heading" />
          <Text>{'<SectionTitle name="Heading" />'}</Text>
          <StandaloneLabel name="My Label" />
          <Text>{'<StandaloneLabel name="My Label" />'}</Text>
          <SimpleButton />
          <Text>{'<SimpleButton />'}</Text>
          <ProgressButton />
          <Text>{'<ProgressButton />'}</Text>
          <AbstractCard style={{margin: 5}}>
            <Text>I'm in Card</Text>
            <Text>Render any React componet in the card</Text>
          </AbstractCard>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('example', () => example);
