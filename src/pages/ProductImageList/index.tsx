import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button} from '@rneui/themed';
import {CameraButton} from '../../components/CameraButton/CameraButton';
import {useProduct, Product} from '../../hooks/useProduct';
import {useTranslation} from 'react-i18next';

type ImgListType = {
  id: number;
  path: string;
};

export const ProductImageList = () => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const {getProduct, addData, addType} = useProduct();
  const {t} = useTranslation();

  const [imgList, setImgList] = useState<Array<ImgListType>>([]);
  const [hasAllImages, setHasAllImages] = useState(false);
  const [symmetricalTo, setSymmetricalTo] = useState('');

  const handleNext = () => {
    if (symmetricalTo) {
      navigation.push('finishScreen', {
        code: route?.params?.code,
      });
    } else {
      navigation.push('dataFields', {
        code: route?.params?.code,
        prevData: route.params.prevData,
      });
    }
  };

  const handleCameraClick = (id: number) => {
    navigation.push('captureImage', {
      id: id,
      code: route?.params?.code,
      symmetricalTo: symmetricalTo,
      prevData: route.params.prevData,
    });
  };

  useEffect(() => {
    if (symmetricalTo) {
      const code = route?.params?.code;
      // get symmetrical data into current product
      (async () => {
        const symmetricalProd = getProduct(symmetricalTo);
        if (symmetricalProd?.data && symmetricalProd?.type) {
          // Hack for avoiding overwriting of hook state
          if (hasAllImages) {
            await addData(code, symmetricalProd.data);
          } else {
            await addType(code, symmetricalProd.type);
          }
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symmetricalTo, hasAllImages]);

  useEffect(() => {
    const code = route?.params?.code;
    if (code && code !== '') {
      if (route?.params?.symmetricalTo) {
        setSymmetricalTo(route.params.symmetricalTo);
      }
      const prod: Product | undefined = getProduct(code);
      if (prod?.image && prod.image.length) {
        setImgList([...prod.image]);
        const set = prod.image.filter(img => img.path !== '');
        setHasAllImages(set.length === 3);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  return (
    <FullPage title={t('take-photos')} hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          {imgList.map((item: ImgListType, i: number) => (
            <CameraButton
              key={`camera-btn-${i}`}
              text={t('photo')}
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
            title={t('next') as string}
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
