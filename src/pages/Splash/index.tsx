import React from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import {Colors, Sizes} from '../../assets/Theme';

export const Splash = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#eee'} />
      <View style={styles.container}>
        <View style={styles.centerLogo}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  centerLogo: {
    alignItems: 'center',
    marginTop: '60%',
  },
  logoImage: {
    width: Sizes.windowWidth * 0.5,
    resizeMode: 'contain',
  },
});
