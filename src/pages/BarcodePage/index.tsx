import {Button} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, Linking, Alert} from 'react-native';
import {Sizes} from '../../assets/Theme';
import FullPage from '../../components/layouts/full-page/FullPage';
import {CommonStyles} from '../../assets/CommonStyle';
import {BorderBox} from '../../components/BorderBox/BorderBox';
import {Camera} from 'react-native-vision-camera';
import Toast from 'react-native-toast-message';
import {BarcodeScanner} from '../../components/BarcodeScanner/BarcodeScanner';
import {Barcode} from 'vision-camera-code-scanner';
import {useProduct} from '../../hooks/useProduct';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Input} from '@rneui/themed';

export const BarcodePage = () => {
  const route: any = useRoute();
  const navigation = useNavigation<any>();
  const {addBarcode, getType} = useProduct();

  const [openScanner, setOpenScanner] = useState(false);
  const [barCode, setBarCode] = useState('');
  const [scannerUsed, setScannerUsed] = useState(false);
  const [updateCheck, setUpdateCheck] = useState(false);

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
      setBarCode(val);
      setScannerUsed(true);
    }
  };

  const handleNextClick = () => {
    if (route?.params?.type) {
      addBarcode(barCode, route.params.type);
      setUpdateCheck(true);
      // navigate after product state update in useEffect
    } else if (route?.params?.symmetricalTo) {
      const type = getType(route.params.symmetricalTo.type);
      addBarcode(barCode, type);
      setUpdateCheck(true);
    } else {
      Alert.alert('ERROR', 'There was an error, Please try again');
    }
  };

  useEffect(() => {
    if (updateCheck) {
      if (route?.params?.symmetricalTo) {
        navigation.push('productImageList', {
          code: barCode,
          symmetricalTo: route.params.symmetricalTo,
          prevData: route.params.prevData,
        });
      } else {
        navigation.push('productImageList', {
          code: barCode,
          prevData: route.params.prevData,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCheck]);

  useEffect(() => {}, [route.params]);

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
            <View style={styles.manualBarcode}>
              <Input
                value={barCode}
                disabled={false}
                disabledInputStyle={CommonStyles.disabledInputStyle}
                inputContainerStyle={CommonStyles.inputContainerStyle}
                errorMessage={''}
                label="Barcode"
                labelStyle={CommonStyles.labelStyle}
                placeholder="Manually Enter Barcode"
                onChangeText={setBarCode}
                keyboardType={'number-pad'}
              />
            </View>
            <View>
              <Button
                buttonStyle={[CommonStyles.buttonStyle, styles.button]}
                disabledStyle={CommonStyles.buttonDisabledStyle}
                containerStyle={CommonStyles.buttonContainerStyle}
                onPress={handleBarcodeScan}
                title={scannerUsed ? 'SCAN AGAIN' : 'SCAN'}
                titleStyle={CommonStyles.buttonTitleStyle}
              />
              <Button
                disabled={!barCode}
                buttonStyle={[CommonStyles.buttonStyle, styles.button]}
                disabledStyle={CommonStyles.buttonDisabledStyle}
                containerStyle={CommonStyles.buttonContainerStyle}
                onPress={handleNextClick}
                title="NEXT"
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
    width: Sizes.windowWidth * 0.72,
    alignSelf: 'center',
    marginTop: 0,
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
  manualBarcode: {
    width: Sizes.windowWidth * 0.77,
    alignSelf: 'center',
    marginTop: 20,
  },
});
