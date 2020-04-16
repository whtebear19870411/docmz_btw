import React, {Component} from 'react';
import {
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

class UserScreen extends Component {
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

  renderItem = data => {
    return (
      <TouchableOpacity
        style={styles.cardItem}
        onPress={() =>
          this.props.navigation.navigate('UserDetailScreen', {data})
        }>
        {/* <View style={styles.cardItem}> */}
        <Image
          style={styles.cardimg}
          source={require('../assets/image/card_back.png')}
        />
        <Text style={styles.cardlabel}>{data.name}</Text>
        {/* </View> */}
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color={colors.dark} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={colors.bar_color}
          translucent={true}
        />
        <ScrollView style={styles.container}>
          <FlatList
            data={this.state.cardArr}
            renderItem={({item}) => this.renderItem(item)}
            // renderItem={({item}) => (
            //   <View>
            //     <Text>{item.id}</Text>
            //     <Text>{item.brand}</Text>
            //     <Text>{item.country}</Text>
            //   </View>
            // )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.navigation.navigate('AddUserScreen')}>
          <Text style={styles.btntext}>New Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default UserScreen;
