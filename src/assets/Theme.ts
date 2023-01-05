import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export const Colors = {
  primary_color_1: '#963234',
  primary_color_2: '#808080',
  primary_color_3: '#d2393c',

  errorColor_1: '#E63946',
  errorColor_2: '#FFA69E',
  successColor_1: '#31572C',
  successColor_2: '#ECF39E',

  gray_1: '#212529',
  gray_2: '#343A40',
  gray_3: '#495057',
  gray_4: '#6C757D',
  gray_5: '#ADB5BD',
  gray_6: '#CED4DA',
  gray_7: '#DEE2E6',
  gray_8: '#E9ECEF',
  gray_9: '#F8F9FA',

  background: '#eeeeee',
};

export const Sizes = {
  windowWidth: width,
  windowHeight: height,
};

export const CommonStyles = StyleSheet.create({});
