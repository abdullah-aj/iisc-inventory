import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button, Input} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ProdType, useProduct} from '../../hooks/useProduct';
import DropDownPicker from 'react-native-dropdown-picker';
import {COUNTRY_LIST, YEAR_LIST} from '../../utils/constants';

const validation = Yup.object().shape({
  // material: '',
  // plateNumber: '',
  // yearOfManufacture: '',
  // serialNumber: '',
  // manufactureSerialNumber: '',s
  // countryOfOrigin: '',
  // model: '',
  // manufacturer: '',

  material: Yup.string().required('Required'),
});

type FormValues = {
  material: string;
  plateNumber: string;
  yearOfManufacture: string;
  manufactureSerialNumber: string; // ==
  serialNumber: string;
  countryOfOrigin: string;
  model: string;
  manufacturer: string;
};

export const MachineData = () => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const [code, setCode] = useState<string>('');
  const [prevData, setPrevData] = useState<any>(null);
  const [countryDdOpen, setCountryDdOpen] = useState<boolean>(false);
  const [yearDdOpen, setYearDdOpen] = useState<boolean>(false);
  const [type, setType] = useState<ProdType | undefined>(undefined);
  const {getType} = useProduct();

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
    if (type !== 'TRANSPORT') {
      delete data.serialNumber;
    }

    navigation.push('finishScreen', {
      code: code,
      prevData: data,
    });
  };

  const handleCancel = () => {
    Alert.alert(
      'Warning',
      'This will remove all the data entered for current entity. \n\nContinue?',
      [
        {
          text: 'No',
          onPress: () => {
            console.log('DO NOT CANCEL');
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            console.log('CANCELED PRESSED');
          },
          style: 'default',
        },
      ],
    );
  };

  return (
    <FullPage title="MANUFACTURING DATA" hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <Formik
            initialValues={{
              material: '',
              plateNumber: '',
              yearOfManufacture: '',
              serialNumber: '',
              manufactureSerialNumber: '',
              countryOfOrigin: '',
              model: '',
              manufacturer: '',
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
                    touched.material && errors.material
                      ? errors.material
                      : undefined
                  }
                  label="Material"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Material"
                  onBlur={() => setFieldTouched('material')}
                  onChangeText={value => setFieldValue('material', value)}
                  value={values.material}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.plateNumber && errors.plateNumber
                      ? errors.plateNumber
                      : undefined
                  }
                  label="Registration / Plate Number"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Plate Number"
                  onBlur={() => setFieldTouched('plateNumber')}
                  onChangeText={value => setFieldValue('plateNumber', value)}
                  value={values.plateNumber}
                />

                {/* <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.yearOfManufacture && errors.yearOfManufacture
                      ? errors.yearOfManufacture
                      : undefined
                  }
                  label="Year of Manufacture"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Year of Manufacture"
                  onBlur={() => setFieldTouched('yearOfManufacture')}
                  onChangeText={value =>
                    setFieldValue('yearOfManufacture', value)
                  }
                  value={values.yearOfManufacture}
                  keyboardType="number-pad"
                /> */}
                <View>
                  <Text style={CommonStyles.ddTitleText}>
                    Year of Manufacture
                  </Text>
                  <DropDownPicker
                    listMode="MODAL"
                    loading={true}
                    searchable={true}
                    key={'year-list'}
                    placeholder="Year of Manufacture"
                    placeholderStyle={CommonStyles.ddPlaceholderStyle}
                    containerStyle={[
                      CommonStyles.ddContainerStyle,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {zIndex: 10000},
                    ]}
                    style={CommonStyles.ddStyle}
                    dropDownContainerStyle={CommonStyles.dropDownContainerStyle}
                    labelStyle={CommonStyles.ddLabelText}
                    disabled={false}
                    open={yearDdOpen}
                    value={values.yearOfManufacture}
                    items={YEAR_LIST()}
                    setOpen={val => {
                      setYearDdOpen(val);
                      if (!val) {
                        setFieldTouched('yearOfManufacture');
                      }
                    }}
                    setValue={fn => {
                      const value = fn(values.yearOfManufacture);
                      setFieldValue('yearOfManufacture', value);
                    }}
                  />
                  <Text style={CommonStyles.ddErrorText}>
                    {touched.yearOfManufacture && errors.yearOfManufacture
                      ? errors.yearOfManufacture
                      : undefined}
                  </Text>
                </View>
                {type === 'TRANSPORT' ? (
                  <Input
                    disabled={false}
                    disabledInputStyle={CommonStyles.disabledInputStyle}
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    errorMessage={
                      touched.serialNumber && errors.serialNumber
                        ? errors.serialNumber
                        : undefined
                    }
                    label="Serial Number"
                    labelStyle={CommonStyles.labelStyle}
                    placeholder="Serial Number"
                    onBlur={() => setFieldTouched('serialNumber')}
                    onChangeText={value => setFieldValue('serialNumber', value)}
                    value={values.serialNumber}
                  />
                ) : (
                  <Input
                    disabled={false}
                    disabledInputStyle={CommonStyles.disabledInputStyle}
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    errorMessage={
                      touched.manufactureSerialNumber &&
                      errors.manufactureSerialNumber
                        ? errors.manufactureSerialNumber
                        : undefined
                    }
                    label="Manufacture Serial Number"
                    labelStyle={CommonStyles.labelStyle}
                    placeholder="Manufacture Serial Number"
                    onBlur={() => setFieldTouched('manufactureSerialNumber')}
                    onChangeText={value =>
                      setFieldValue('manufactureSerialNumber', value)
                    }
                    value={values.manufactureSerialNumber}
                  />
                )}

                <View>
                  <Text style={CommonStyles.ddTitleText}>
                    Country of Origin
                  </Text>
                  <DropDownPicker
                    listMode="MODAL"
                    loading={true}
                    searchable={true}
                    key={'country-list'}
                    placeholder="Country of Origin"
                    placeholderStyle={CommonStyles.ddPlaceholderStyle}
                    containerStyle={CommonStyles.ddContainerStyle}
                    style={CommonStyles.ddStyle}
                    dropDownContainerStyle={CommonStyles.dropDownContainerStyle}
                    labelStyle={CommonStyles.ddLabelText}
                    disabled={false}
                    open={countryDdOpen}
                    value={values.countryOfOrigin}
                    items={COUNTRY_LIST}
                    setOpen={val => {
                      setCountryDdOpen(val);
                      if (!val) {
                        setFieldTouched('countryOfOrigin');
                      }
                    }}
                    setValue={fn => {
                      const value = fn(values.countryOfOrigin);
                      setFieldValue('countryOfOrigin', value);
                    }}
                  />
                  <Text style={CommonStyles.ddErrorText}>
                    {touched.countryOfOrigin && errors.countryOfOrigin
                      ? errors.countryOfOrigin
                      : undefined}
                  </Text>
                </View>

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.model && errors.model ? errors.model : undefined
                  }
                  label="Model"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Model"
                  onBlur={() => setFieldTouched('model')}
                  onChangeText={value => setFieldValue('model', value)}
                  value={values.model}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.manufacturer && errors.manufacturer
                      ? errors.manufacturer
                      : undefined
                  }
                  label="Manufacturer"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Manufacturer"
                  onBlur={() => setFieldTouched('manufacturer')}
                  onChangeText={value => setFieldValue('manufacturer', value)}
                  value={values.manufacturer}
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
                  <Button
                    type="outline"
                    disabled={isSubmitting}
                    buttonStyle={[
                      CommonStyles.outLineButtonStyle,
                      styles.button,
                      styles.lastBtn,
                    ]}
                    disabledStyle={CommonStyles.buttonDisabledStyle}
                    containerStyle={CommonStyles.buttonContainerStyle}
                    onPress={handleCancel}
                    title="CANCEL"
                    titleStyle={CommonStyles.outlineBtnTextStyle}
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
  lastBtn: {
    marginBottom: 20,
  },
});
