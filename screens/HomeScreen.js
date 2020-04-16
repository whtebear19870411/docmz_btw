import React, {Component} from 'react';
import {
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  View,
} from 'react-native';

import {colors} from './shared/constant';
import styles from './styles';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      cardArr: [],
    };
  }

  componentDidMount() {
    this.goForFetch();
  }

  goForFetch = () => {
    this.setState({
      isLoading: true,
    });
    fetch('https://server.docmz.com/stripe/list/cus_G8M6Gz7PTLlfnF')
      .then(response => response.json())
      .then(responseJson => {
        console.log('getting data from fetch', responseJson);

        this.setState({
          isLoading: false,
          cardArr: responseJson.data.data,
        });
      })
      .catch(error => console.log(error));
  };
  // static navigationOptions = {
  //   header: null,
  // };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={colors.headercolor}
          translucent={true}
        />
        <ImageBackground
          source={require('../assets/image/back.png')}
          style={styles.background}>
          <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigate('Profile')}>
              <Text style={styles.menuItem}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Notifications')}>
              <Text style={styles.menuItem}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Payment')}>
              <Text style={styles.menuItem}>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Appointment')}>
              <Text style={styles.menuItem}>Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Settings')}>
              <Text style={styles.menuItem}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Help')}>
              <Text style={styles.menuItem}>Help</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default HomeScreen;
