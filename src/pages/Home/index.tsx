import {Button} from '@rneui/base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, Sizes} from '../../assets/Theme';
import FullPage from '../../components/layouts/full-page/FullPage';
import {CommonStyles} from '../../assets/CommonStyle';
import {useNavigation} from '@react-navigation/native';

export const Home = () => {
  const navigation = useNavigation<any>();

  const handleAddAsset = () => {
    navigation.push('entityData');
  };

  return (
    <FullPage title="ADDING ASSET">
      <View style={styles.centerContainer}>
        <View style={styles.innerCircle}>
          <Button
            buttonStyle={[CommonStyles.buttonStyle, styles.button]}
            disabledStyle={CommonStyles.buttonDisabledStyle}
            containerStyle={CommonStyles.buttonContainerStyle}
            onPress={handleAddAsset}
            title="ADD ASSET"
            titleStyle={CommonStyles.buttonTitleStyle}
          />
        </View>
      </View>
    </FullPage>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    backgroundColor: Colors.gray_8,
    height: Sizes.windowWidth * 0.9,
    width: Sizes.windowWidth * 0.9,
    borderRadius: Sizes.windowWidth * 0.9,
    alignSelf: 'center',
    marginTop: Sizes.windowHeight * 0.19,
    alignContent: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    backgroundColor: Colors.gray_7,
    height: Sizes.windowWidth * 0.7,
    width: Sizes.windowWidth * 0.7,
    borderRadius: Sizes.windowWidth * 0.7,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: Sizes.windowWidth * 0.5,
  },
});
