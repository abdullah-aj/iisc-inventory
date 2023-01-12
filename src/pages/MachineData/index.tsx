import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button, Input} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validation = Yup.object().shape({
  // material: '',
  // registrationNumber: '',
  // yearOfManufacture: '',
  // serialNumber: '',
  // country: '',
  // model: '',
  // manufacturer: '',

  material: Yup.string().required('Required'),
});

type FormValues = {
  material: string;
  registrationNumber: string;
  yearOfManufacture: string;
  serialNumber: string;
  country: string;
  model: string;
  manufacturer: string;
};

export const MachineData = () => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const [code, setCode] = useState<string>('');
  const [prevData, setPrevData] = useState<any>(null);

  useEffect(() => {
    if (route?.params?.code) {
      setCode(route.params.code);
      setPrevData(route.params.prevData);
    }
  }, [route.params]);

  const handleSubmitForm = async (values: FormValues) => {
    const data = {...prevData, ...values};

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
    <FullPage title="Machinery and Equipment" hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <Formik
            initialValues={{
              material: '',
              registrationNumber: '',
              yearOfManufacture: '',
              serialNumber: '',
              country: '',
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
                    touched.registrationNumber && errors.registrationNumber
                      ? errors.registrationNumber
                      : undefined
                  }
                  label="Registration / Plate Number"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Plate Number"
                  onBlur={() => setFieldTouched('registrationNumber')}
                  onChangeText={value =>
                    setFieldValue('registrationNumber', value)
                  }
                  value={values.registrationNumber}
                />

                <Input
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
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.serialNumber && errors.serialNumber
                      ? errors.serialNumber
                      : undefined
                  }
                  label="Manufacture Serial Number"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Manufacture Serial Number"
                  onBlur={() => setFieldTouched('serialNumber')}
                  onChangeText={value => setFieldValue('serialNumber', value)}
                  value={values.serialNumber}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.country && errors.country
                      ? errors.country
                      : undefined
                  }
                  label="Country of Origin"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Country of Origin"
                  onBlur={() => setFieldTouched('country')}
                  onChangeText={value => setFieldValue('country', value)}
                  value={values.country}
                />

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
