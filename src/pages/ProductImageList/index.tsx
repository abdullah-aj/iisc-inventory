import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button} from '@rneui/themed';
import {CameraButton} from '../../components/CameraButton/CameraButton';

type ImgListType = {
  id: number;
  path: string;
};

export const ProductImageList = () => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const [imgList, setImgList] = useState<Array<ImgListType>>([
    {
      id: 1,
      path: '',
    },
    {
      id: 2,
      path: '',
    },
    {
      id: 3,
      path: '',
    },
  ]);

  const handleNext = () => {};

  const handleCameraClick = (id: number) => {
    const img = imgList.find(item => item.id === id);
    navigation.push('captureImage', {id: id, image: img?.path || ''});
  };

  useEffect(() => {
    if (route?.params?.id) {
      const item = imgList.find(img => img.id === route.params.id);
      if (item) {
        const list = imgList.map(img => {
          if (img.id === route.params.id) {
            return {...img, path: route.params.image};
          } else {
            return img;
          }
        });
        setImgList(list);
      } else {
        setImgList([
          ...imgList,
          {
            id: route.params.id,
            path: route.params.image,
          },
        ]);
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
            disabled={imgList.length < 3}
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
