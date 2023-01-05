import {StyleSheet} from 'react-native';
import {Colors} from './Theme';

export const CommonStyles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Colors.primary_color_1,
    padding: 0,
    margin: 0,
    height: 45,
    backgroundColor: '#fff',
  },
  labelStyle: {
    fontWeight: 'normal',
    color: '#333',
    fontSize: 14,
    paddingBottom: 5,
    paddingLeft: 2,
  },
  disabledInputStyle: {
    backgroundColor: Colors.gray_6,
  },
  buttonStyle: {
    backgroundColor: Colors.primary_color_1,
    height: 45,
  },
  buttonDisabledStyle: {
    borderWidth: 1,
    borderColor: Colors.primary_color_2,
  },
  buttonContainerStyle: {
    margin: 5,
  },
  buttonTitleStyle: {marginHorizontal: 5},
});
