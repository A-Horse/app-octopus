// flow
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppText } from './AppText';

export class TaskCard extends React.PureComponent<{
  card: Card,
  onPress: any
}> {
  componentWillMount() {}

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.container}>
          <AppText style={styles.cardTitle}>{this.props.card.title}</AppText>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 3
  },
  cardContainer: {
    borderRadius: 3,
    marginBottom: 5
  },
  cardTitle: {
    color: '#333'
  }
});
