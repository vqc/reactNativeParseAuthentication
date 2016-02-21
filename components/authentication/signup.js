import React, {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Component,
  TextInput,
} from 'react-native';

import Button from '../common/button';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';

class SignUp extends Component {
  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: '',
      signUpButtonLoading: false,
    }

    this.onSignUp = this.onSignUp.bind(this);
    this.onSignInPress = this.onSignInPress.bind(this);
  }
  render(){
    return(
      <View style={styles.container}>
        <Text>Sign Up</Text>
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
        <Text style={styles.label}>Password Confirm: </Text>
        <TextInput
          onChangeText={(text) => {this.setState({passwordConfirmation: text})}}
          secureTextEntry={true}
          style={styles.input}
          value={this.state.passwordConfirmation}/>
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button name={this.state.signUpButtonLoading ? "Loading . . ." : "Sign Up"} onPress={this.onSignUp}/>
        <Button name="I have an account!" onPress={this.onSignInPress}/>
      </View>
    )
  }
  onSignUp(){
    const user = new Parse.User();
    this.setState({signUpButtonLoading: true});
    if(this.state.password !== this.state.passwordConfirmation){
      this.setState({signUpButtonLoaing: false});
      return this.setState({errorMessage: 'Your passwords do not match'});
    }
    user.set('username', this.state.username);
    user.set('password', this.state.password);
    user.signUp(null, {
      success: (user) => {
        return this.props.navigator.immediatelyResetRouteStack([{name: 'tweets'}]);
      },
      error: (user, error) => {
        this.setState({
          signUpButtonLoading: false,
          errorMessage: error.message});
      }
    });
  }
  onSignInPress(){
    return this.props.navigator.pop();
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
})

export default SignUp;
