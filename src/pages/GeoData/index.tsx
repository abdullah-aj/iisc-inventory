import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button, Input} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useProduct} from '../../hooks/useProduct';

const validation = Yup.object().shape({
  // coordinates: '',
  // zip: '',
  // room: '',
  // floor: '',
  // building: '',
  // city: '',
  // region: '',
  // country: '',

  coordinates: Yup.string().required('Required'),
  zip: Yup.string().required('Required'),
});

type FormValues = {
  coordinates: string;
  zip: string;
  room: string;
  floor: string;
  building: string;
  city: string;
  region: string;
  country: string;
};

type ProdType = 'BIO' | 'MACHINE' | '';

export const GeoData = () => {
  const {getType} = useProduct();

  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const [code, setCode] = useState<string>('');
  const [prevData, setPrevData] = useState<any>(null);
  const [type, setType] = useState<ProdType>('');

  useEffect(() => {
    if (route?.params?.code) {
      setCode(route.params.code);
      setPrevData(route.params.prevData);
    }
  }, [route.params]);

  useEffect(() => {
    if (code !== '') {
      (async () => {
        const t = await getType(code);
        setType(t || '');
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const handleSubmitForm = async (values: FormValues) => {
    const data = {...prevData, ...values};
    if (type === 'BIO') {
      delete data.floor;
      delete data.building;
      delete data.room;
    }

    navigation.push('assetData', {
      code: code,
      prevData: data,
    });
  };

  return (
    <FullPage
      title={type === 'BIO' ? 'PLANTS AND ANIMALS' : 'Machinery and Equipment'}
      hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <Formik
            initialValues={{
              coordinates: '',
              zip: '',
              room: '',
              floor: '',
              building: '',
              city: '',
              region: '',
              country: '',
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
                    touched.coordinates && errors.coordinates
                      ? errors.coordinates
                      : undefined
                  }
                  label="Geographical Coordinates"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Geographical Coordinates"
                  onBlur={() => setFieldTouched('coordinates')}
                  onChangeText={value => setFieldValue('coordinates', value)}
                  value={values.coordinates}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.zip && errors.zip ? errors.zip : undefined
                  }
                  label="Zip Code"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Zip Code"
                  onBlur={() => setFieldTouched('zip')}
                  onChangeText={value => setFieldValue('zip', value)}
                  value={values.zip}
                />

                {type === 'MACHINE' && (
                  <>
                    <Input
                      disabled={false}
                      disabledInputStyle={CommonStyles.disabledInputStyle}
                      inputContainerStyle={CommonStyles.inputContainerStyle}
                      errorMessage={
                        touched.room && errors.room ? errors.room : undefined
                      }
                      label="Room / Office Number"
                      labelStyle={CommonStyles.labelStyle}
                      placeholder="Office Number"
                      onBlur={() => setFieldTouched('room')}
                      onChangeText={value => setFieldValue('room', value)}
                      value={values.room}
                    />
                    <Input
                      disabled={false}
                      disabledInputStyle={CommonStyles.disabledInputStyle}
                      inputContainerStyle={CommonStyles.inputContainerStyle}
                      errorMessage={
                        touched.floor && errors.floor ? errors.floor : undefined
                      }
                      label="Floor Number"
                      labelStyle={CommonStyles.labelStyle}
                      placeholder="Floor Number"
                      onBlur={() => setFieldTouched('floor')}
                      onChangeText={value => setFieldValue('floor', value)}
                      value={values.floor}
                    />

                    <Input
                      disabled={false}
                      disabledInputStyle={CommonStyles.disabledInputStyle}
                      inputContainerStyle={CommonStyles.inputContainerStyle}
                      errorMessage={
                        touched.building && errors.building
                          ? errors.building
                          : undefined
                      }
                      label="Building Number"
                      labelStyle={CommonStyles.labelStyle}
                      placeholder="Building Number"
                      onBlur={() => setFieldTouched('building')}
                      onChangeText={value => setFieldValue('building', value)}
                      value={values.building}
                    />
                  </>
                )}

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.city && errors.city ? errors.city : undefined
                  }
                  label="City"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="City"
                  onBlur={() => setFieldTouched('city')}
                  onChangeText={value => setFieldValue('city', value)}
                  value={values.city}
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.region && errors.region ? errors.region : undefined
                  }
                  label="Region"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Region"
                  onBlur={() => setFieldTouched('region')}
                  onChangeText={value => setFieldValue('region', value)}
                  value={values.region}
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
                  label="Country"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Country"
                  onBlur={() => setFieldTouched('country')}
                  onChangeText={value => setFieldValue('country', value)}
                  value={values.country}
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
