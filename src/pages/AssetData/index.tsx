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
import {MEASURE_UNITS, ASSET_CONDITION} from '../../utils/constants';

const validation = Yup.object().shape({
  // custodian: '',
  // uniqueFactoryId: '',
  // quantity: '',
  // baseUnitOfMeasure: '',
  // assetDescription: '',
  // uniqueAssetNumber: '',

  custodian: Yup.string().required('Required'),
  quantity: Yup.string().required('Required'),
});

type FormValues = {
  custodian: string;
  uniqueFactoryId: string;
  quantity: string;
  baseUnitOfMeasure: string;
  assetDescription: string;
  uniqueAssetNumber: string;
  assetCondition: string;
};

export const AssetData = () => {
  const {getType} = useProduct();

  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const [code, setCode] = useState<string>('');
  const [prevData, setPrevData] = useState<any>(null);
  const [type, setType] = useState<ProdType | undefined>(undefined);
  const [unitDdOpen, setUnitDdOpen] = useState<boolean>(false);
  const [conditionDdOpen, setConditionDdOpen] = useState<boolean>(false);

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

    if (type === 'INTANGIBLE') {
      delete data.uniqueFactoryId;
      navigation.push('intangibleData', {
        code: code,
        prevData: data,
      });
      return;
    } else if (
      type === 'BIO' ||
      type === 'INFRASTRUCTURE' ||
      type === 'FURNITURE'
    ) {
      delete data.uniqueFactoryId;
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
              uniqueFactoryId: '',
              quantity: '',
              baseUnitOfMeasure: '',
              assetDescription: '',
              uniqueAssetNumber: '',
              assetCondition: '',
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

                {type === 'MACHINE' ||
                  (type === 'TRANSPORT' && (
                    <Input
                      disabled={false}
                      disabledInputStyle={CommonStyles.disabledInputStyle}
                      inputContainerStyle={CommonStyles.inputContainerStyle}
                      errorMessage={
                        touched.uniqueFactoryId && errors.uniqueFactoryId
                          ? errors.uniqueFactoryId
                          : undefined
                      }
                      label="Unique Factory ID"
                      labelStyle={CommonStyles.labelStyle}
                      placeholder="Asset Serial Number"
                      onBlur={() => setFieldTouched('uniqueFactoryId')}
                      onChangeText={value =>
                        setFieldValue('uniqueFactoryId', value)
                      }
                      value={values.uniqueFactoryId}
                      keyboardType={'number-pad'}
                    />
                  ))}

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
                    value={values.baseUnitOfMeasure}
                    items={MEASURE_UNITS}
                    setOpen={val => {
                      setUnitDdOpen(val);
                      if (!val) {
                        setFieldTouched('baseUnitOfMeasure');
                      }
                    }}
                    setValue={fn => {
                      const value = fn(values.baseUnitOfMeasure);
                      setFieldValue('baseUnitOfMeasure', value);
                    }}
                  />
                  <Text style={CommonStyles.ddErrorText}>
                    {touched.baseUnitOfMeasure && errors.baseUnitOfMeasure
                      ? errors.baseUnitOfMeasure
                      : undefined}
                  </Text>
                </View>

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
                    touched.uniqueAssetNumber && errors.uniqueAssetNumber
                      ? errors.uniqueAssetNumber
                      : undefined
                  }
                  label="Unique Asset Number in the Entity"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Unique Asset Number"
                  onBlur={() => setFieldTouched('uniqueAssetNumber')}
                  onChangeText={value =>
                    setFieldValue('uniqueAssetNumber', value)
                  }
                  value={values.uniqueAssetNumber}
                  keyboardType="number-pad"
                />

                <View>
                  <Text style={CommonStyles.ddTitleText}>Asset Condition</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    key={'asset-condition'}
                    placeholder="Select Asset Condition"
                    placeholderStyle={CommonStyles.ddPlaceholderStyle}
                    containerStyle={CommonStyles.ddContainerStyle}
                    style={CommonStyles.ddStyle}
                    dropDownContainerStyle={CommonStyles.dropDownContainerStyle}
                    labelStyle={CommonStyles.ddLabelText}
                    disabled={false}
                    open={conditionDdOpen}
                    value={values.assetCondition}
                    items={ASSET_CONDITION}
                    setOpen={val => {
                      setConditionDdOpen(val);
                      if (!val) {
                        setFieldTouched('assetCondition');
                      }
                    }}
                    setValue={fn => {
                      const value = fn(values.assetCondition);
                      setFieldValue('assetCondition', value);
                    }}
                    dropDownDirection={'TOP'}
                  />
                  <Text style={CommonStyles.ddErrorText}>
                    {touched.assetCondition && errors.assetCondition
                      ? errors.assetCondition
                      : undefined}
                  </Text>
                </View>

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
