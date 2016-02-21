'use strict';

import React, {
  Component,
  StyleSheet,
  Navigator,
} from 'react-native';
import Parse from 'parse/react-native';
import ParseReact from 'parse-react/react-native';

import SignIn from '../components/authentication/signin';
import SignUp from '../components/authentication/signup';
import Tweets from '../components/tweets/tweets';

const ROUTES = {
  signin: SignIn,
  signup: SignUp,
  tweets: Tweets,
}

class Main extends Component {
  componentWillMount(){
    Parse.initialize("qwORXPu90doOlJ21GU5d8DRMPWaiO9gzBhINSZ8C",
                      "PhVK1Z2KCCOOw9cwknQkKKhVnKBYNhcDtxtlkIEe")

    this.renderScene = this.renderScene.bind(this);
  }
  render(){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signin'}}
        renderScene={this.renderScene}
        configureScene={()=>{return Navigator.SceneConfigs.FloatFromRight;}}
        />
    )
  }
  renderScene(route, navigator){
    var Component = ROUTES[route.name]
    return <Component route={route} navigator={navigator}/>
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
});

export default Main;
