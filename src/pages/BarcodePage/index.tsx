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

export const BarcodePage = () => {
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
      }
      return false;
    } else {
      console.log('OPEN Camera');
      setOpenScanner(true);
    }
  };

  const onCodeCapture = (code: Barcode[]) => {
    setOpenScanner(false);
    code.forEach(async (scannedBarcode: any) => {
      if (scannedBarcode.rawValue !== '') {
        Toast.show({
          type: 'error',
          text1: 'Code Scanned',
          text2: scannedBarcode.displayValue,
        });
      }
    });
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
