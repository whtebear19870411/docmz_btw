import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import styles from './styles';
import {CreditCardInput} from 'react-native-credit-card-input';
import firebase from '../database/firebaseDb';

class AddUserScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('cards');
    this.state = {
      number: '',
      expiry: '',
      cvc: '',
      isLoading: false,
    };

    this.storeUser = this.storeUser.bind(this);
  }

  // _onChange = formData => console.log(JSON.stringify(formData, null, ' '));
  _onChange = formData =>
    this.setState({
      number: formData.values.number,
      expiry: formData.values.expiry,
      cvc: formData.values.cvc,
    });
  _onFocus = field => console.log('focusing', field);

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeUser() {
    if (this.state.number === '') {
      console.log('Fill at least your name!');
    } else {
      this.setState({
        isLoading: true,
      });
      console.log('here');
      this.dbRef
        .add({
          number: this.state.number,
          expiry: this.state.expiry,
          cvc: this.state.cvc,
        })
        .then(res => {
          console.log('success', res);
          this.setState({
            number: '',
            expiry: '',
            cvc: '',
            isLoading: false,
          });
          this.props.navigation.navigate('UserScreen');
        })
        .catch(err => {
          console.error('Error found: ', err);
          this.setState({
            isLoading: false,
          });
        });
    }
    // alert(this.state.number + '\n' + this.state.expiry + '\n' + this.state.cvc);
  }

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
          autoFocus
          // requiresName
          requiresCVC
          // requiresPostalCode
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
            this.storeUser();
          }}>
          <Text style={styles.btntext}>Add Card</Text>
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

export default AddUserScreen;
