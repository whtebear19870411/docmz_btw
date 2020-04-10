import React, {Component} from 'react';
import {
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import styles from './styles';
import firebase from '../database/firebaseDb';

class UserDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      number: '',
      expiry: '',
      cvc: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    const dbRef = firebase
      .firestore()
      .collection('cards')
      .doc(this.props.route.params.userkey);
    dbRef.get().then(res => {
      if (res.exists) {
        const card = res.data();
        this.setState({
          key: res.id,
          number: card.number,
          expiry: card.expiry,
          cvc: card.cvc,
          isLoading: false,
        });
        // this.refs.CCInput.setValues({number: '4242'});
      } else {
        console.log('Document does not exist!');
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase
      .firestore()
      .collection('cards')
      .doc(this.state.key);
    updateDBRef
      .set({
        number: this.state.number,
        expiry: this.state.expiry,
        cvc: this.state.cvc,
      })
      .then(docRef => {
        this.setState({
          key: '',
          number: '',
          expiry: '',
          cvc: '',
          isLoading: false,
        });
        this.props.navigation.navigate('UserScreen');
      })
      .catch(error => {
        console.error('Error: ', error);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteUser() {
    const dbRef = firebase
      .firestore()
      .collection('cards')
      .doc(this.props.route.params.userkey);
    dbRef.delete().then(res => {
      console.log('Item removed from database');
      this.props.navigation.navigate('UserScreen');
    });
  }

  openTwoButtonAlert = () => {
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteUser()},
        {
          text: 'No',
          onPress: () => console.log('No item was removed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
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
        <CreditCardInput
          // autoFocus
          // requiresName
          // requiresCVC
          // requiresPostalCode
          cvc={'456'}
          cardScale={1.0}
          labelStyle={s.label}
          inputStyle={s.input}
          validColor={'black'}
          invalidColor={'red'}
          placeholderColor={'darkgray'}
          onFocus={this._onFocus}
          onChange={this._onChange}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.updateUser();
          }}>
          <Text style={styles.btntext}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.openTwoButtonAlert();
          }}>
          <Text style={styles.btntext}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const s = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    marginTop: 60,
  },
  label: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
});
export default UserDetailScreen;
