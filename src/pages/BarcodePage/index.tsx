import {Button} from '@rneui/base';
import React, {useState} from 'react';
import {Image, StyleSheet, View, Linking} from 'react-native';
import {Sizes} from '../../assets/Theme';
import FullPage from '../../components/layouts/full-page/FullPage';
import {CommonStyles} from '../../assets/CommonStyle';
import {BorderBox} from '../../components/BorderBox/BorderBox';
import {Camera} from 'react-native-vision-camera';
import Toast from 'react-native-toast-message';
import {BarcodeScanner} from '../../components/BarcodeScanner/BarcodeScanner';
import {Barcode} from 'vision-camera-code-scanner';
import {useProduct} from '../../hooks/useProduct';
import {useNavigation} from '@react-navigation/native';

export const BarcodePage = () => {
  const navigation = useNavigation<any>();
  const {addBarcode} = useProduct();

  const [openScanner, setOpenScanner] = useState(false);

  const handleBarcodeScan = async () => {
    let cameraPermission = await Camera.getCameraPermissionStatus();
    if (cameraPermission !== 'authorized') {
      await Camera.requestCameraPermission();
      cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === 'denied' || cameraPermission === 'restricted') {
        Toast.show({
          type: 'error',
          text1: 'Permission Denied',
          text2: 'Please allow this app to use the camera',
          onHide: () => Linking.openSettings(),
        });
      } else {
        handleBarcodeScan();
      }
      return false;
    } else {
      console.log('OPEN Camera');
      setOpenScanner(true);
    }
  };

  const onCodeCapture = (code: Barcode[]) => {
    setOpenScanner(false);
    if (code.length > 1) {
      Toast.show({
        type: 'error',
        text1: 'Multiple Barcode Detected',
        text2:
          'Please make sure there is only one code in the screen when scanning',
      });
    } else if (code.length === 1) {
      const val = code[0].displayValue || '';
      addBarcode(val);
      navigation.push('productImageList');
    }
  };

  return (
    <>
      {openScanner ? (
        <BarcodeScanner onCapture={onCodeCapture} />
      ) : (
        <FullPage title="ADDING ASSET" hasBackBtn={true}>
          <View style={styles.container}>
            <BorderBox
              height={Sizes.windowWidth * 0.7}
              width={Sizes.windowWidth * 0.7}>
              <View style={styles.codeContainer}>
                <Image
                  source={require('../../assets/images/barcode.png')}
                  style={styles.barcodeImg}
                />
              </View>
            </BorderBox>
            <View>
              <Button
                buttonStyle={[CommonStyles.buttonStyle, styles.button]}
                disabledStyle={CommonStyles.buttonDisabledStyle}
                containerStyle={CommonStyles.buttonContainerStyle}
                onPress={handleBarcodeScan}
                title="SCAN"
                titleStyle={CommonStyles.buttonTitleStyle}
              />
            </View>
          </View>
        </FullPage>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  button: {
    width: Sizes.windowWidth * 0.7,
    alignSelf: 'center',
    marginTop: 50,
  },
  codeContainer: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: -Sizes.windowWidth * 0.05,
  },
  barcodeImg: {
    width: Sizes.windowWidth * 0.5,
    resizeMode: 'contain',
  },
});
