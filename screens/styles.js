import {StyleSheet} from 'react-native';
import {colors} from './shared/constant';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // padding: 10,
  },

  cardframe: {
    alignItems: 'center',
    // backgroundColor:'green',
    margin: 20,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderWidth: 1,
    // borderColor: colors.grey,
    borderRadius: 5,
    backgroundColor: colors.card_color,
    shadowColor: 'black',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  cardlabel: {
    // flex: 1,
    color: colors.white,
    fontSize: 18,
  },
  cardimg: {width: 40, height: 30, alignItems: 'center'},

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
    justifyContent: 'center',
    backgroundColor: colors.card_color,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 40,
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
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    textAlign: 'left',
    color: 'black',
    fontSize: 18,
    paddingVertical: 10,
  },
  shadow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
  },

  icon: {
    width: 30,
    height: 30,
    opacity: 0.5,
    alignSelf: 'center',
    marginLeft: 20,
  },
  menuItem: {padding: 10, color: 'white', fontSize: 20},
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  page_title: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    // backgroundColor:'green'
  },
});

export default styles;
