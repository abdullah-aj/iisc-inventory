import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Colors, Sizes} from '../../assets/Theme';
import {Button} from '@rneui/themed';
import {ProdType, useProduct} from '../../hooks/useProduct';
import {CommonStyles} from '../../assets/CommonStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import {useTranslation} from 'react-i18next';

const DATE = Date.now();

export const TypeSelection = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {addBarcode} = useProduct();

  const {t} = useTranslation();

  const [selectedProd, setSelectedProd] = useState<ProdType | ''>('');
  const [open, setOpen] = useState(false);
  const [typeList, setTypeList] = useState([
    {label: t('infrastructure'), value: 'INFRASTRUCTURE'},
    {label: t('machinery-and-equipment'), value: 'MACHINE'},
    {label: t('public-transportation-assets'), value: 'TRANSPORT'},
    {label: t('furniture'), value: 'FURNITURE'},
    {label: t('plants-and-animals'), value: 'BIO'},
    {label: t('intangible assets'), value: 'INTANGIBLE'},
  ]);
  const [fakeCode, setFakeCode] = useState('');
  const [prevData, setPrevData] = useState<any>(null);

  const handleBtnPress = async () => {
    if (selectedProd === 'INTANGIBLE') {
      addBarcode(`${DATE}`, selectedProd);
      setFakeCode(`${DATE}`);
      // navigate after product state update in useEffect
    } else {
      navigation.push('barcode', {type: selectedProd, prevData: prevData});
    }
  };

  useEffect(() => {
    if (fakeCode) {
      navigation.push('productImageList', {
        code: fakeCode,
        type: selectedProd,
        prevData: prevData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fakeCode]);

  useEffect(() => {
    if (route?.params?.prevData) {
      setPrevData(route.params.prevData);
    }
  }, [route.params]);

  return (
    <FullPage title={t('asset-type')} hasBackBtn={true} disableScroll={true}>
      <View style={styles.centerContainer}>
        <View style={styles.innerCircle}>
          <View>
            <DropDownPicker
              key={'asset-type'}
              placeholder={t('select-asset-type') as string}
              placeholderStyle={CommonStyles.ddPlaceholderStyle}
              containerStyle={CommonStyles.ddContainerStyle}
              style={[CommonStyles.ddStyle, styles.ddStyle]}
              dropDownContainerStyle={[
                CommonStyles.dropDownContainerStyle,
                styles.ddContainerStyle,
              ]}
              labelStyle={CommonStyles.ddLabelText}
              disabled={false}
              open={open}
              value={selectedProd}
              items={typeList}
              setOpen={setOpen}
              setValue={setSelectedProd}
              setItems={setTypeList}
              maxHeight={250}
            />
          </View>
          <Button
            disabled={selectedProd === ''}
            buttonStyle={[CommonStyles.buttonStyle, styles.button]}
            disabledStyle={CommonStyles.buttonDisabledStyle}
            containerStyle={CommonStyles.buttonContainerStyle}
            onPress={handleBtnPress}
            title={t('next') as string}
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
    width: Sizes.windowWidth * 0.6,
    alignSelf: 'center',
    marginTop: 10,
  },
  ddStyle: {
    width: Sizes.windowWidth * 0.6,
  },
  ddContainerStyle: {
    width: Sizes.windowWidth * 0.6,
  },
});
