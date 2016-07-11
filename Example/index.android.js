import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Tabs from 'react-native-tabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'second' };
  }
  render() {
    return (
      <View style={styles.container}>
        <Tabs
          selected={this.state.page}
          style={{ backgroundColor: 'white' }}
          selectedStyle={{ color: 'red' }} onSelect={el => this.setState({ page: el.props.name })}
          pressOpacity={1}
        >
          <Text name="first">First</Text>
          <Text
            name="second"
            selectedIconStyle={{ borderTopWidth: 2, borderTopColor: 'red' }}
          >
            Second
          </Text>
          <Text name="third">Third</Text>
          <Text name="fourth" selectedStyle={{ color: 'green' }}>Fourth</Text>
          <Text name="fifth">Fifth</Text>
        </Tabs>
        <Text style={styles.welcome}>
          Welcome to React Native
        </Text>
        <Text style={styles.instructions}>
          Selected page: {this.state.page}
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Example', () => Example);
