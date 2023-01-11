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
  inputStyle: {
    paddingHorizontal: 10,
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
  outLineButtonStyle: {
    height: 45,
    borderColor: Colors.primary_color_1,
  },
  outlineBtnTextStyle: {
    color: Colors.primary_color_1,
  },
  ddPlaceholderStyle: {
    color: '#999',
    fontSize: 18,
  },
  ddContainerStyle: {
    paddingHorizontal: 10,
  },
  ddStyle: {
    borderColor: Colors.primary_color_1,
    backgroundColor: '#fff',
    minHeight: 45,
    borderRadius: 2,
  },
  dropDownContainerStyle: {
    borderColor: Colors.primary_color_1,
    marginLeft: 10,
  },
  ddTitleText: {
    color: Colors.gray_1,
    paddingLeft: 12,
    paddingBottom: 4,
  },
  ddLabelText: {
    fontSize: 18,
  },
  ddErrorText: {
    color: Colors.errorColor_1,
    paddingLeft: 15,
    paddingTop: 5,
    fontSize: 12,
  },
});
