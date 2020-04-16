import React, {Component} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  Text,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import styles from './styles';
import {CardView} from 'react-native-credit-card-input';

class AppointmentScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/image/sub_back.png')}
          style={styles.background}>
          <View style={styles.page_title}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}>
              Appointment
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default AppointmentScreen;
