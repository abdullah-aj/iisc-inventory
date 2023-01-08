import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button} from '@rneui/themed';
import {CameraButton} from '../../components/CameraButton/CameraButton';
import {useProduct} from '../../hooks/useProduct';

type ImgListType = {
  id: number;
  path: string;
};

export const ProductImageList = () => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const {getProduct} = useProduct();

  const [imgList, setImgList] = useState<Array<ImgListType>>([]);
  const [hasAllImages, setHasAllImages] = useState(false);

  const handleNext = () => {};

  const handleCameraClick = (id: number) => {
    navigation.push('captureImage', {id: id, code: route?.params?.code});
  };

  useEffect(() => {
    if (route?.params?.code) {
      const prod = getProduct(route.params.code);
      if (prod?.image && prod.image.length) {
        setImgList([...prod.image]);
        const set = prod.image.filter(img => img.path !== '');
        setHasAllImages(set.length === 3);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  return (
    <FullPage title="TAKE PHOTOS" hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          {imgList.map((item: ImgListType, i: number) => (
            <CameraButton
              key={`camera-btn-${i}`}
              text="PHOTO"
              id={item.id}
              onPress={handleCameraClick}
              path={item.path}
            />
          ))}
        </View>
        <View>
          <Button
            disabled={!hasAllImages}
            buttonStyle={[CommonStyles.buttonStyle, styles.button]}
            disabledStyle={CommonStyles.buttonDisabledStyle}
            containerStyle={CommonStyles.buttonContainerStyle}
            onPress={handleNext}
            title="NEXT"
            titleStyle={CommonStyles.buttonTitleStyle}
          />
        </View>
      </View>
    </FullPage>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  button: {
    width: Sizes.windowWidth * 0.7,
    alignSelf: 'center',
    marginTop: 80,
  },
  cameraContainer: {
    marginTop: Sizes.windowHeight * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
});
