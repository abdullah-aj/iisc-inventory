import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button, Input} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validation = Yup.object().shape({
  // assetUtilization: '',
  // reasonForIndefinite: '',
  // licenseExpiration: '',
  // programLicense: '',
  // version: '',

  assetUtilization: Yup.string().required('Required'),
});

type FormValues = {
  assetUtilization: string;
  reasonForIndefinite: string;
  licenseExpiration: string;
  programLicense: string;
  version: string;
};

export const IntangibleData = () => {
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

  return (
    <FullPage title={'INTANGIBLE DATA'} hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <Formik
            initialValues={{
              assetUtilization: '',
              reasonForIndefinite: '',
              licenseExpiration: '',
              programLicense: '',
              version: '',
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
                    touched.assetUtilization && errors.assetUtilization
                      ? errors.assetUtilization
                      : undefined
                  }
                  label="Asset Utilization"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Asset Utilization"
                  onBlur={() => setFieldTouched('assetUtilization')}
                  onChangeText={value =>
                    setFieldValue('assetUtilization', value)
                  }
                  value={values.assetUtilization}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.reasonForIndefinite && errors.reasonForIndefinite
                      ? errors.reasonForIndefinite
                      : undefined
                  }
                  label="Reason For Indefinite"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Reason For Indefinite"
                  onBlur={() => setFieldTouched('reasonForIndefinite')}
                  onChangeText={value =>
                    setFieldValue('reasonForIndefinite', value)
                  }
                  value={values.reasonForIndefinite}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.licenseExpiration && errors.licenseExpiration
                      ? errors.licenseExpiration
                      : undefined
                  }
                  label="License Expiration Date"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="License Expiration Date"
                  onBlur={() => setFieldTouched('licenseExpiration')}
                  onChangeText={value =>
                    setFieldValue('licenseExpiration', value)
                  }
                  value={values.licenseExpiration}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.programLicense && errors.programLicense
                      ? errors.programLicense
                      : undefined
                  }
                  label="Program License"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Program License"
                  onBlur={() => setFieldTouched('programLicense')}
                  onChangeText={value => setFieldValue('programLicense', value)}
                  value={values.programLicense}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.version && errors.version
                      ? errors.version
                      : undefined
                  }
                  label="Version"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Version"
                  onBlur={() => setFieldTouched('version')}
                  onChangeText={value => setFieldValue('version', value)}
                  value={values.version}
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
