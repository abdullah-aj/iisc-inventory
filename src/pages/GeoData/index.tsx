import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes, Colors} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button, Input} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useProduct, ProdType} from '../../hooks/useProduct';
import Geolocation from '@react-native-community/geolocation';
import {Text} from '@rneui/base';

const validation = Yup.object().shape({
  // zipCode: '',
  // roomNumber: '',
  // floorNumber: '',
  // buildingNumber: '',
  // city: '',
  // region: '',
  // country: '',

  zipCode: Yup.string().required('Required'),
});

type FormValues = {
  zipCode: string;
  roomNumber: string;
  floorNumber: string;
  buildingNumber: string;
  city: string;
  region: string;
  country: string;
};

type LocationType = {
  longitude: number;
  latitude: number;
};

export const GeoData = () => {
  const {getType} = useProduct();

  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const [code, setCode] = useState<string>('');
  const [prevData, setPrevData] = useState<any>(null);
  const [type, setType] = useState<ProdType | undefined>();
  const [geoPermission, setGeoPermission] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationType>();

  useEffect(() => {
    if (route?.params?.code) {
      setCode(route.params.code);
      setPrevData(route.params.prevData);
    }
  }, [route.params]);

  useEffect(() => {
    if (code !== '') {
      getLocationPermission();
      (async () => {
        const t = await getType(code);
        setType(t);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (geoPermission) {
      Geolocation.getCurrentPosition(info => {
        setLocation({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      });
    }
  }, [geoPermission]);

  const handleSubmitForm = async (values: FormValues) => {
    if (location?.longitude) {
      const data = {...prevData, ...values};
      if (type === 'BIO') {
        delete data.floorNumber;
        delete data.buildingNumber;
        delete data.roomNumber;
        navigation.push('bioData', {
          code: code,
          prevData: data,
        });
      } else if (type === 'FURNITURE') {
        navigation.push('finishScreen', {
          code: code,
          prevData: data,
        });
      } else if (
        type === 'INFRASTRUCTURE' ||
        type === 'MACHINE' ||
        type === 'TRANSPORT'
      ) {
        navigation.push('machineData', {
          code: code,
          prevData: data,
        });
      } else {
        Alert.alert('ERROR', 'Invalid Asset Type');
      }
    } else {
      Alert.alert('ERROR', 'Device Location is Required to Continue');
    }
  };

  const getLocationPermission = () => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
      locationProvider: 'auto',
    });

    Geolocation.requestAuthorization(
      () => setGeoPermission(true),
      ({message}) => {
        console.log(message);
        Alert.alert(
          'ERROR',
          'Go to Settings and allow location permission for this app',
          [
            {
              text: 'Go to Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      },
    );
  };

  return (
    <FullPage title={'Geographical Data'} hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <Formik
            initialValues={{
              zipCode: '',
              roomNumber: '',
              floorNumber: '',
              buildingNumber: '',
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
                {location?.longitude ? (
                  <Text style={styles.locationText}>
                    Device Location Obtained
                  </Text>
                ) : (
                  <Button
                    buttonStyle={styles.locationButton}
                    title={'** Request Device Location **'}
                    type={'clear'}
                    onPress={getLocationPermission}
                    titleStyle={styles.locationButtonTitleStyle}
                    containerStyle={styles.locationContainer}
                  />
                )}

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.zipCode && errors.zipCode
                      ? errors.zipCode
                      : undefined
                  }
                  label="Zip Code"
                  labelStyle={CommonStyles.labelStyle}
                  placeholder="Zip Code"
                  onBlur={() => setFieldTouched('zipCode')}
                  onChangeText={value => setFieldValue('zipCode', value)}
                  value={values.zipCode}
                  keyboardType="number-pad"
                />

                {type !== 'BIO' && (
                  <>
                    <Input
                      disabled={false}
                      disabledInputStyle={CommonStyles.disabledInputStyle}
                      inputContainerStyle={CommonStyles.inputContainerStyle}
                      errorMessage={
                        touched.roomNumber && errors.roomNumber
                          ? errors.roomNumber
                          : undefined
                      }
                      label="Room / Office Number"
                      labelStyle={CommonStyles.labelStyle}
                      placeholder="Office Number"
                      onBlur={() => setFieldTouched('roomNumber')}
                      onChangeText={value => setFieldValue('roomNumber', value)}
                      value={values.roomNumber}
                    />
                    <Input
                      disabled={false}
                      disabledInputStyle={CommonStyles.disabledInputStyle}
                      inputContainerStyle={CommonStyles.inputContainerStyle}
                      errorMessage={
                        touched.floorNumber && errors.floorNumber
                          ? errors.floorNumber
                          : undefined
                      }
                      label="Floor Number"
                      labelStyle={CommonStyles.labelStyle}
                      placeholder="Floor Number"
                      onBlur={() => setFieldTouched('floorNumber')}
                      onChangeText={value =>
                        setFieldValue('floorNumber', value)
                      }
                      value={values.floorNumber}
                      keyboardType="number-pad"
                    />

                    <Input
                      disabled={false}
                      disabledInputStyle={CommonStyles.disabledInputStyle}
                      inputContainerStyle={CommonStyles.inputContainerStyle}
                      errorMessage={
                        touched.buildingNumber && errors.buildingNumber
                          ? errors.buildingNumber
                          : undefined
                      }
                      label="Building Number"
                      labelStyle={CommonStyles.labelStyle}
                      placeholder="Building Number"
                      onBlur={() => setFieldTouched('buildingNumber')}
                      onChangeText={value =>
                        setFieldValue('buildingNumber', value)
                      }
                      value={values.buildingNumber}
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
  },
  button: {
    width: Sizes.windowWidth * 0.87,
    alignSelf: 'center',
    marginTop: 10,
  },
  locationText: {
    paddingBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
    marginTop: -20,
    color: Colors.primary_color_2,
  },
  locationContainer: {
    // width: Sizes.windowWidth * 0.45,
    marginTop: -20,
  },
  locationButton: {},
  locationButtonTitleStyle: {
    color: Colors.primary_color_1,
    paddingBottom: 10,
  },
});
