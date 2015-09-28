/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;
var Tabs = require('react-native-tabs');

class Example extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    var self = this;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          Selected page: {this.state.page}
        </Text>
        <Tabs selected="second" style={{backgroundColor:'white'}}
              onSelect={function(el){self.setState({page: el.props.name});return {style:{color:'red'}}}}>
            <Text name="first">First</Text>
            <Text name="second">Second</Text>
            <Text name="third">Third</Text>
            <Text name="fourth">Fourth</Text>
            <Text name="fifth">Fifth</Text>
        </Tabs>
      </View>
    );
  }
}

var styles = StyleSheet.create({
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

AppRegistry.registerComponent('Example', () => Example);
