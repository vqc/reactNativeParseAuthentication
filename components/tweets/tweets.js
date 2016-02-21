import React, {
  View,
  Text,
  Component,
  StyleSheet,
} from 'react-native';

import Parse from 'parse/react-native';

class Tweets extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: null,
    }
  }
  componentWillMount(){
    Parse.User.currentAsync()
      .then((user)=>{ this.setState({ user: user}) });
  }
  render(){
    if(!this.state.user){
      return (<Text>Loading . . . </Text>);
    }
    const username = this.state.user.get('username');

    return(
      <View style={styles.container}>
        <Text>Welcome back, {username}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Tweets;
