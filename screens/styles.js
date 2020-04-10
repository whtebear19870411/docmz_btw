import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addframe: {
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    // shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    // shadowRadius: 0,
    elevation: 10,
  },
  inputGroup: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    alignItems: 'center',
    backgroundColor: '#621FF7',
    padding: 10,
    marginHorizontal: 100,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  btntext: {
    color: 'white',
    fontSize: 18,
  },
  input: {width: '80%', color: 'black', paddingLeft: 20, fontSize: 18},
  icon: {
    width: 30,
    height: 30,
    opacity: 0.5,
    alignSelf: 'center',
    marginLeft: 20,
  },
});

export default styles;
