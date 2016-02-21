import React, {
  View,
  Text,
  StyleSheet,
  TextInput,
  Component,
} from 'react-native';

import Button from '../common/button';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';

class SignIn extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      signInButtonLoading: false,
    }

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUpPress = this.onSignUpPress.bind(this);
  }
  render(){
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>
        <Text style={styles.label}>Username: </Text>
        <TextInput
          onChangeText={(text) => {this.setState({username: text})}}
          style={styles.input}
          autoCapitalize="none"
          value={this.state.username}/>
        <Text style={styles.label}>Password: </Text>
        <TextInput
          onChangeText={(text) => {this.setState({password: text})}}
          secureTextEntry={true}
          style={styles.input}
          value={this.state.password}/>
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button name={this.state.signInButtonLoading ? "Signing you in . . . " : "Sign In"} onPress={this.onSignIn}/>
        <Button name="I need an account..." onPress={this.onSignUpPress}/>
      </View>
    )
  }
  onSignIn(){
    this.setState({ signInButtonLoading: true, });
    Parse.User.logIn(this.state.username, this.state.password, {
      success: (user) => {
        this.setState({ signInButtonLoading: false, });
        return this.props.navigator.immediatelyResetRouteStack([{name: 'tweets'}]);
      },
      error: (data, error) => {return this.setState({signInButtonLoading: false, errorMessage: error.message});},
    })
    return this.setState({
      username: '',
      password: '',
      errorMessage: '',
    });
  }
  onSignUpPress(){
    this.props.navigator.push({name: 'signup'});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center',
  },
  label:{
    fontSize: 18,
  }
});

export default SignIn;
