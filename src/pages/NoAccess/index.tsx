import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Colors, Sizes} from '../../assets/Theme';

export const NoAccess = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#eee'} />
      <View style={styles.container}>
        <View style={styles.centerLogo}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.errorText}>ERROR!</Text>
            <Text style={styles.textStyle}>Please contact</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.sohoby.com');
              }}>
              <Text style={styles.sohobyTextStyle}>SOHOBY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    zIndex: 9999,
  },
  centerLogo: {
    alignItems: 'center',
    marginTop: '60%',
  },
  logoImage: {
    width: Sizes.windowWidth * 0.5,
    resizeMode: 'contain',
  },
  textContainer: {
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: Colors.primary_color_1,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle: {
    marginTop: 10,
    color: Colors.primary_color_1,
    fontSize: 20,
    textAlign: 'center',
  },
  sohobyTextStyle: {
    marginTop: 5,
    color: Colors.primary_color_1,
    fontSize: 24,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: Colors.primary_color_1,
    borderStyle: 'solid',
  },
});
