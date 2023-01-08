import {Button} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Linking,
  PermissionsAndroid,
  Platform,
  Image,
  Alert,
} from 'react-native';
import {Sizes, Colors} from '../../assets/Theme';
import FullPage from '../../components/layouts/full-page/FullPage';
import {CommonStyles} from '../../assets/CommonStyle';
import {BorderBox} from '../../components/BorderBox/BorderBox';
import {Camera} from 'react-native-vision-camera';
import Toast from 'react-native-toast-message';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {CameraPage} from '../../components/Camera/CameraPage';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useProduct} from '../../hooks/useProduct';

type ImageType = {
  path: string;
  type: 'photo' | 'video';
};

export const CaptureImage = () => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const {addImage, getProduct} = useProduct();

  const [openCamera, setOpenCamera] = useState(false);
  const [imageSource, setImageSource] = useState<any>(null);

  useEffect(() => {
    if (route?.params?.code) {
      const prod = getProduct(route.params.code);
      if (prod?.image && prod.image.length) {
        const selectedImg = prod.image.find(
          image => image.id === route.params.id,
        );
        if (selectedImg?.path) {
          setImageSource({uri: selectedImg?.path});
        } else {
          setImageSource(null);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  const handleCaptureImage = async () => {
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
        handleCaptureImage();
      }
      return false;
    } else {
      setOpenCamera(true);
    }
  };

  const onImageCapture = async (image: ImageType) => {
    setOpenCamera(false);
    const {path, type} = image;
    if (route?.params?.code) {
      const uri = await saveImage(path, type);
      if (uri) {
        setImageSource({uri: uri});
        addImage(route.params.code, {id: route.params.id, path: uri});
      }
      // setImageSource({uri: `file://${path}`});

      navigation.push('productImageList', {code: route.params.code});
    } else {
      Alert.alert('CODE NOT FOUND', 'Please Scan the Barcode again');
    }
  };

  const imageView = () => {
    return (
      <Image
        source={imageSource}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
    );
  };

  const requestSavePermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;

    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    if (permission == null) return false;
    let hasPermission = await PermissionsAndroid.check(permission);
    if (!hasPermission) {
      const permissionRequestResult = await PermissionsAndroid.request(
        permission,
      );
      hasPermission = permissionRequestResult === 'granted';
    }
    return hasPermission;
  };

  const saveImage = async (path: string, type: 'photo' | 'video') => {
    try {
      const hasPermission = await requestSavePermission();
      if (!hasPermission) {
        Toast.show({
          type: 'error',
          text1: 'Permission Denied',
          text2: 'Please allow this app save image to device storage',
          onHide: () => Linking.openSettings(),
        });
        return;
      }
      return await CameraRoll.save(`file://${path}`, {
        type: type,
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e);
      Toast.show({
        type: 'error',
        text1: 'Failed to save',
        text2: `An unexpected error occurred while trying to save your ${type}. ${message}`,
      });
      return false;
    }
  };

  return (
    <>
      {openCamera ? (
        <CameraPage onCapture={onImageCapture} />
      ) : (
        <FullPage title="TAKING PHOTO" hasBackBtn={true}>
          <View style={styles.container}>
            <BorderBox
              height={Sizes.windowWidth * 0.7}
              width={Sizes.windowWidth * 0.7}>
              <View style={styles.imgContainer}>
                {imageSource ? (
                  imageView()
                ) : (
                  <Icon
                    name="camera"
                    type="material-community"
                    color={Colors.gray_8}
                    size={100}
                  />
                )}
              </View>
            </BorderBox>
            <View>
              <Button
                buttonStyle={[CommonStyles.buttonStyle, styles.button]}
                disabledStyle={CommonStyles.buttonDisabledStyle}
                containerStyle={CommonStyles.buttonContainerStyle}
                onPress={handleCaptureImage}
                title={imageSource ? 'CAPTURE AGAIN' : 'CAPTURE'}
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
  imgContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: Sizes.windowWidth * 0.7,
    height: Sizes.windowWidth * 0.7,
  },
  barcodeImg: {
    width: Sizes.windowWidth * 0.5,
    resizeMode: 'contain',
  },
});
