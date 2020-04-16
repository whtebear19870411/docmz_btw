import React, {Component} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import styles from './styles';
import {CreditCardInput} from 'react-native-credit-card-input';

class AddUserScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      number: '',
      expiry_mm: '',
      expiry_yy: '',
      cvc: '',
      cur_field: '',
      isLoading: false,
    };

    this.storeUser = this.storeUser.bind(this);
  }

  _onFocus = field => console.log('focusing', field);

  _onChange = formData => {
    /* eslint no-console: 0 */
    if (this.state.cur_field === 'number') {
      this.setState({number: formData.values.number});
    }
    if (this.state.cur_field === 'expiry') {
      var expiry = formData.values.expiry;
      this.setState({expiry_mm: expiry.substring(0, 2)});
      this.setState({expiry_yy: expiry.substring(3, 5)});
    }
    if (this.state.cur_field === 'cvc') {
      this.setState({cvc: formData.values.cvc});
    }
    if (this.state.cur_field === 'name') {
      this.setState({name: formData.values.name});
    }

    console.log(JSON.stringify(formData, null, ' '));
  };

  _onFocus = field => {
    this.setState({cur_field: field});
    console.log(field);
  };

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

  createCard() {
    if (this.state.number === '') {
      alert('Enter number please.');
      return;
    }
    if (this.state.expiry === '') {
      alert('Enter expiry please.');
      return;
    }
    if (this.state.cvc === '') {
      alert('Enter CVC please.');
      return;
    }
    if (this.state.name === '') {
      alert('Enter name please.');
      return;
    }

    this.setState({isLoading: true});

    // let formdata = new FormData();
    var dataToSend = {
      number: this.state.number,
      exp_month: this.state.expiry_mm,
      exp_year: this.state.expiry_yy,
      cvc: this.state.cvc,
      customer: 'cus_G8Nzhpci1nSal8',
      name: this.state.name,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://server.docmz.com/stripe/create/card/profile', {
      method: 'POST', //Request Type
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({isLoading: false});
        if (JSON.stringify(responseJson.status) === 'false') {
          Alert.alert(responseJson.message, responseJson.error);
        } else {
          Alert.alert(responseJson.message, JSON.stringify(responseJson));
        }
        // alert(JSON.stringify(responseJson));
        //  alert(responseJson);
        console.log(responseJson);
      })
      //If response is not in json then in error
      .catch(error => {
        this.setState({isLoading: false});
        // alert('false');
        alert('Error!  ' + JSON.stringify(error));
        console.error(error);
      });
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
          requiresName={true}
          allowScroll={true}
          onFocus={this._onFocus}
          onChange={this._onChange}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.createCard();
          }}>
          <Text style={styles.btntext}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddUserScreen;
