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
  gender: Yup.string()
    //.matches(/^[\u0621-\u064A0-9 ]+$/, 'Please use English Numerals')
    .required('Required'),
  //.required('Required'),
  // productionCapacity: Yup.string().required('Required'),
  // purpose: Yup.string().matches(
  //   /^[\u0621-\u064A0-9 ]+$/,
  //   'Please use English Numerals',
  // ),
  // stageInBiologicalCycle: Yup.string().required('Required'),
  // biologicalAge: Yup.string().required('Required'),
  // usefulLife: Yup.string().required('Required'),
});

type FormValues = {
  gender: string;
  productionCapacity: string;
  purpose: string;
  stageInBiologicalCycle: string;
  biologicalAge: string;
  usefulLife: string;
};

export const BioData = () => {
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
    <FullPage title="PLANTS AND ANIMALS" hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <Formik
            initialValues={{
              gender: '',
              productionCapacity: '',
              purpose: '',
              stageInBiologicalCycle: '',
              biologicalAge: '',
              usefulLife: '',
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
                    touched.gender && errors.gender ? errors.gender : undefined
                  }
                  label="Gender"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Gender"
                  onBlur={() => setFieldTouched('gender')}
                  onChangeText={value => setFieldValue('gender', value)}
                  value={values.gender}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.productionCapacity && errors.productionCapacity
                      ? errors.productionCapacity
                      : undefined
                  }
                  label="Production Capacity"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Production Capacity"
                  onBlur={() => setFieldTouched('productionCapacity')}
                  onChangeText={value =>
                    setFieldValue('productionCapacity', value)
                  }
                  value={values.productionCapacity}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.purpose && errors.purpose
                      ? errors.purpose
                      : undefined
                  }
                  label="Purpose / Function"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Purpose"
                  onBlur={() => setFieldTouched('purpose')}
                  onChangeText={value => setFieldValue('purpose', value)}
                  value={values.purpose}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.stageInBiologicalCycle &&
                    errors.stageInBiologicalCycle
                      ? errors.stageInBiologicalCycle
                      : undefined
                  }
                  label="Stage In Biological Cycle"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Stage"
                  onBlur={() => setFieldTouched('stageInBiologicalCycle')}
                  onChangeText={value =>
                    setFieldValue('stageInBiologicalCycle', value)
                  }
                  value={values.stageInBiologicalCycle}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.biologicalAge && errors.biologicalAge
                      ? errors.biologicalAge
                      : undefined
                  }
                  label="Biological Age"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Age"
                  onBlur={() => setFieldTouched('biologicalAge')}
                  onChangeText={value => setFieldValue('biologicalAge', value)}
                  value={values.biologicalAge}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.usefulLife && errors.usefulLife
                      ? errors.usefulLife
                      : undefined
                  }
                  label="Useful Life"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Useful Life"
                  onBlur={() => setFieldTouched('usefulLife')}
                  onChangeText={value => setFieldValue('usefulLife', value)}
                  value={values.usefulLife}
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
});
