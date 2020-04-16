import React, {Component} from 'react';
import {
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  ActivityIndicator,
  View,
} from 'react-native';
import styles from './styles';
import RNCountry from 'react-native-countries';
import {ScrollView} from 'react-native-gesture-handler';
import {CardView} from 'react-native-credit-card-input';
class UserDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      // choosenindex: '',
      number: '4242424242424242',
      expiry: '',
      cvc: '',
      id: '',
      object: '',
      address_city: '',
      address_country: '',
      address_line1: '',
      address_line1_check: '',
      address_line2: '',
      address_state: '',
      address_zip: '',
      address_zip_check: '',
      brand: '',
      country: '',
      customer: '',
      cvc_check: '',
      dynamic_last4: '',
      exp_month: '',
      exp_year: '',
      fingerprint: '',
      funding: '',
      last4: '',
      metadata: {},
      name: '',
      tokenization_method: '',

      amount: '',
      email: '',
      description: '',
      isLoading: false,
    };
  }

  componentWillMount() {
    this.setState({
      id: this.props.route.params.data.id,
      object: this.props.route.params.data.object,
      address_city: this.props.route.params.data.address_city,
      address_country: this.props.route.params.data.address_country,
      address_line1: this.props.route.params.data.address_line1,
      address_line1_check: this.props.route.params.data.address_line1_check,
      address_line2: this.props.route.params.data.address_line2,
      address_state: this.props.route.params.data.address_state,
      address_zip: this.props.route.params.data.address_zip,
      address_zip_check: this.props.route.params.data.address_zip_check,
      brand: this.props.route.params.data.brand,
      country: this.props.route.params.data.country,
      customer: this.props.route.params.data.customer,
      cvc_check: this.props.route.params.data.cvc_check,
      dynamic_last4: this.props.route.params.data.dynamic_last4,
      exp_month: this.props.route.params.data.exp_month,
      exp_year: this.props.route.params.data.exp_year,
      fingerprint: this.props.route.params.data.fingerprint,
      funding: this.props.route.params.data.funding,
      last4: this.props.route.params.data.last4,
      metadata: this.props.route.params.data.metadata,
      name: this.props.route.params.data.name,
      tokenization_method: this.props.route.params.data.tokenization_method,
      isLoading: false,
    });

    let countryNamesWithCodes = RNCountry.getCountryNamesWithCodes;
    countryNamesWithCodes.sort((a, b) => a.name.localeCompare(b.name));
    this.setState({
      countryNameListWithCode: countryNamesWithCodes,
    });
  }

  chargeCard() {
    if (this.state.amount === '') {
      alert('Enter amount please.');
      return;
    }
    if (this.state.email === '') {
      alert('Enter email please.');
      return;
    }

    this.setState({isLoading: true});

    // let formdata = new FormData();
    var dataToSend = {
      number: this.state.number,
      exp_month: this.state.exp_month,
      exp_year: this.state.exp_year,
      cvc: this.state.cvc,
      name: this.state.name,
      description: this.state.description,
      amount: this.state.amount,
      email: this.state.email,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://server.docmz.com/stripe/charge/card', {
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
          Alert.alert('Error', JSON.stringify(responseJson.message.raw.code));
        } else {
          Alert.alert(responseJson.message);
          this.setState({amount: '', email: '', description: ''});
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
    // const cciRef = useRef();
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    // this.inputref.CCInput.setValues({number: '4242'});
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <CardView
            name={this.state.name}
            number={this.state.number}
            expiry={this.state.exp_month + '/' + this.state.exp_year}
            cvc={this.state.cvc}
            brand={this.brand}
            cardScale={1.0}
            imageFront={require('../assets/image/card_front.png')}
            imageBack={require('../assets/image/card_back.png')}
          />
        </View>
        <ScrollView>
          <View style={{margin: 10}}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>amount</Text>
              <TextInput
                value={this.state.amount}
                onChangeText={val => this.setState({amount: val})}
                placeholder={'200'}
                keyboardType={'numeric'}
                style={styles.input}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>email</Text>
              <TextInput
                value={this.state.email}
                onChangeText={val => this.setState({email: val})}
                placeholder={'anas3rde@gmail.com'}
                keyboardType={'email'}
                style={styles.input}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>description</Text>
              <TextInput
                value={this.state.description}
                onChangeText={val => this.setState({description: val})}
                multiline={true}
                style={styles.input}
              />
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.chargeCard();
          }}>
          <Text style={styles.btntext}>Charge</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default UserDetailScreen;
