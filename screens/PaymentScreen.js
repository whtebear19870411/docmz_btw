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

class PaymentScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      number: '',
      expiry: '',
      cvc: '',
      isLoading: false,
    };
  }

  inputValueUpdateNumber = val => {
    var str = val;
    str = str.replace(' ', '');
    str = str.replace(' ', '');
    str = str.replace(' ', '');

    // console.log(str);
    var subnum1 = '',
      subnum2 = '',
      subnum3 = '',
      subnum4 = '';
    subnum1 = str.substring(0, 4);
    subnum2 = str.substring(4, 4 + 4);
    subnum3 = str.substring(8, 8 + 4);
    subnum4 = str.substring(12, 12 + 4);
    if (subnum1 !== '') {
      str = subnum1;
    }
    if (subnum2 !== '') {
      str = str + ' ' + subnum2;
    }
    if (subnum3 !== '') {
      str = str + ' ' + subnum3;
    }
    if (subnum4 !== '') {
      str = str + ' ' + subnum4;
    }
    this.setState({number: str});
  };

  inputValueUpdateExpiry = val => {
    var str = val;
    str = str.replace('/', '');
    var mm = str.substring(0, 2);
    var yy = '';
    if (mm > 12) {
      mm = '0' + str.substring(0, 1);
      yy = str.substring(1, 3);
    } else {
      mm = str.substring(0, 2);
      yy = str.substring(2, 4);
    }
    if (yy === '') {
      str = mm;
    } else {
      str = mm + '/' + yy;
    }
    this.setState({expiry: str});
  };

  inputValueUpdateCvc = val => {
    this.setState({cvc: val});
  };

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
              Payment
            </Text>
          </View>
          <View style={styles.cardframe}>
            <CardView
              focused={require('../assets/image/card_back.png')}
              number={this.state.number}
              expiry={this.state.expiry}
              cvc={this.state.cvc}
              name={this.state.name}
              cardScale={1.0}
              imageFront={require('../assets/image/card_front.png')}
              imageBack={require('../assets/image/card_back.png')}
            />
          </View>
          <View style={{flex: 1, paddingHorizontal: 30}}>
            <View style={{paddingVertical: 10}}>
              <Text style={styles.label}>Card number</Text>
              <View style={styles.shadow}>
                <TextInput
                  value={this.state.number}
                  onChangeText={val => this.inputValueUpdateNumber(val)}
                  placeholder={'0000 0000 0000 0000'}
                  keyboardType={'numeric'}
                />
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 0.4}}>
                <Text style={styles.label}>Expiry date</Text>
                <View style={styles.shadow}>
                  <TextInput
                    value={this.state.expriy}
                    onChangeText={val => this.inputValueUpdateExpiry(val)}
                    placeholder={'MM/YY'}
                    keyboardType={'numeric'}
                  />
                </View>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.label}>Secure Code</Text>
                <View style={styles.shadow}>
                  <TextInput
                    value={this.state.cvc}
                    onChangeText={val => this.inputValueUpdateCvc(val)}
                    placeholder={''}
                    keyboardType={'numeric'}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Name on card</Text>
              <View style={styles.shadow}>
                <TextInput
                  value={this.state.name}
                  onChangeText={val => this.setState({name: val})}
                  placeholder={''}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btntext}>Pay</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default PaymentScreen;
