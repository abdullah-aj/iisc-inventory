import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button, Input} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useProduct, ProdType} from '../../hooks/useProduct';
import DropDownPicker from 'react-native-dropdown-picker';
import {MEASURE_UNITS} from '../../utils/constants';

const validation = Yup.object().shape({
  // custodian: '',
  // factoryId: '',
  // quantity: '',
  // baseUnit: '',
  // tagNumber: '',
  // assetDescription: '',
  // assetNumber: '',

  custodian: Yup.string().required('Required'),
  quantity: Yup.string().required('Required'),
});

type FormValues = {
  custodian: string;
  factoryId: string;
  quantity: string;
  baseUnit: string;
  tagNumber: string;
  assetDescription: string;
  assetNumber: string;
};

export const AssetData = () => {
  const {getType} = useProduct();

  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const [code, setCode] = useState<string>('');
  const [prevData, setPrevData] = useState<any>(null);
  const [type, setType] = useState<ProdType | undefined>(undefined);
  const [unitDdOpen, setUnitDdOpen] = useState<boolean>(false);

  useEffect(() => {
    if (route?.params?.code) {
      setCode(route.params.code);
      setPrevData(route.params.prevData);
    }
  }, [route.params]);

  useEffect(() => {
    if (code !== '') {
      (async () => {
        const t: ProdType | undefined = await getType(code);
        setType(t);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const handleSubmitForm = async (values: FormValues) => {
    const data = {...prevData, ...values};
    if (type === 'BIO') {
      delete data.factoryId;
    }

    navigation.push('geoData', {
      code: code,
      prevData: data,
    });
  };

  return (
    <FullPage title={'ASSET DATA'} hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <Formik
            initialValues={{
              custodian: '',
              factoryId: '',
              quantity: '',
              baseUnit: '',
              tagNumber: '',
              assetDescription: '',
              assetNumber: '',
            }}
            validationSchema={validation}
            onSubmit={handleSubmitForm}>
            {({
              isSubmitting,
              handleSubmit,
              values,
              setFieldValue,
              setFieldTouched,
              errors,
              touched,
            }) => (
              <View>
                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.custodian && errors.custodian
                      ? errors.custodian
                      : undefined
                  }
                  label="Custodian"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Custodian"
                  onBlur={() => setFieldTouched('custodian')}
                  onChangeText={value => setFieldValue('custodian', value)}
                  value={values.custodian}
                />

                {type === 'MACHINE' && (
                  <Input
                    disabled={false}
                    disabledInputStyle={CommonStyles.disabledInputStyle}
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    errorMessage={
                      touched.factoryId && errors.factoryId
                        ? errors.factoryId
                        : undefined
                    }
                    label="Unique Factory ID"
                    labelStyle={CommonStyles.labelStyle}
                    placeholder="Asset Serial Number"
                    onBlur={() => setFieldTouched('factoryId')}
                    onChangeText={value => setFieldValue('factoryId', value)}
                    value={values.factoryId}
                    keyboardType={'number-pad'}
                  />
                )}

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.quantity && errors.quantity
                      ? errors.quantity
                      : undefined
                  }
                  label="Quantity"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Quantity"
                  onBlur={() => setFieldTouched('quantity')}
                  onChangeText={value => setFieldValue('quantity', value)}
                  value={values.quantity}
                  keyboardType={'number-pad'}
                />

                <View>
                  <Text style={CommonStyles.ddTitleText}>
                    Base Unit of Measure
                  </Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    //loading={false}
                    searchable={true}
                    key={'measure-unit'}
                    placeholder="Select Measure Unit"
                    placeholderStyle={CommonStyles.ddPlaceholderStyle}
                    containerStyle={CommonStyles.ddContainerStyle}
                    style={CommonStyles.ddStyle}
                    dropDownContainerStyle={CommonStyles.dropDownContainerStyle}
                    labelStyle={CommonStyles.ddLabelText}
                    disabled={false}
                    open={unitDdOpen}
                    value={values.baseUnit}
                    items={MEASURE_UNITS}
                    setOpen={val => {
                      setUnitDdOpen(val);
                      if (!val) {
                        setFieldTouched('baseUnit');
                      }
                    }}
                    setValue={fn => {
                      const value = fn(values.baseUnit);
                      setFieldValue('baseUnit', value);
                    }}
                  />
                  <Text style={CommonStyles.ddErrorText}>
                    {touched.baseUnit && errors.baseUnit
                      ? errors.baseUnit
                      : undefined}
                  </Text>
                </View>

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.tagNumber && errors.tagNumber
                      ? errors.tagNumber
                      : undefined
                  }
                  label="Tag Number"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Tag Number"
                  onBlur={() => setFieldTouched('tagNumber')}
                  onChangeText={value => setFieldValue('tagNumber', value)}
                  value={values.tagNumber}
                  keyboardType="number-pad"
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.assetDescription && errors.assetDescription
                      ? errors.assetDescription
                      : undefined
                  }
                  label="Asset Description"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Asset Description"
                  onBlur={() => setFieldTouched('assetDescription')}
                  onChangeText={value =>
                    setFieldValue('assetDescription', value)
                  }
                  value={values.assetDescription}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.assetNumber && errors.assetNumber
                      ? errors.assetNumber
                      : undefined
                  }
                  label="Unique Asset Number in the Entity"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Unique Asset Number"
                  onBlur={() => setFieldTouched('assetNumber')}
                  onChangeText={value => setFieldValue('assetNumber', value)}
                  value={values.assetNumber}
                  keyboardType="number-pad"
                />

                <View>
                  <Button
                    disabled={isSubmitting}
                    buttonStyle={[CommonStyles.buttonStyle, styles.button]}
                    disabledStyle={CommonStyles.buttonDisabledStyle}
                    containerStyle={CommonStyles.buttonContainerStyle}
                    onPress={handleSubmit}
                    title="NEXT"
                    titleStyle={CommonStyles.buttonTitleStyle}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </FullPage>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  formArea: {
    paddingHorizontal: 20,
    // width: Sizes.windowWidth * 0.7,
  },
  button: {
    width: Sizes.windowWidth * 0.87,
    alignSelf: 'center',
    marginTop: 10,
  },
});
