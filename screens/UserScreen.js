/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  View,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {ListItem} from 'react-native-elements';
import firebase from '../database/firebaseDb';

class UserScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('cards');
    this.state = {
      isLoading: true,
      cardArr: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = querySnapshot => {
    const cardArr = [];
    querySnapshot.forEach(res => {
      const {number, expiry, cvc} = res.data();
      cardArr.push({
        key: res.id,
        res,
        number,
        expiry,
        cvc,
      });
    });
    this.setState({
      cardArr,
      isLoading: false,
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#621FF7"
          translucent={true}
        />
        <ScrollView style={styles.container}>
          {this.state.cardArr.map((item, i) => {
            return (
              <View style={{borderRadius: 5, marginVertical: 5}}>
                <ListItem
                  Component={TouchableScale}
                  friction={90} //
                  tension={100} // These props are passed to the parent component (here TouchableScale)
                  activeScale={0.95} //
                  linearGradientProps={{
                    colors: ['#621FF7', '#824ef4'],
                    // start: [1, 0],
                    // end: [1, 0],
                  }}
                  ViewComponent={LinearGradient} // Only if no expo
                  leftAvatar={{
                    rounded: false,
                    source: require('../assets/image/card.png'),
                  }}
                  title={item.number}
                  titleStyle={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingLeft: 30,
                  }}
                  subtitleStyle={{color: 'white', textAlign: 'right'}}
                  subtitle={item.expiry + '     ' + item.cvc}
                  chevron={{color: 'white'}}
                  onPress={() => {
                    this.props.navigation.navigate('UserDetailScreen', {
                      userkey: item.key,
                    });
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.navigation.navigate('AddUserScreen')}>
          <Text style={styles.btntext}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default UserScreen;
