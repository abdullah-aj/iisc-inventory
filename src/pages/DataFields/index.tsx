import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes, Colors} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button, Input, Icon, Dialog} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Geolocation from '@react-native-community/geolocation';
import {Text} from '@rneui/base';
import DropDownPicker from 'react-native-dropdown-picker';
import {API_URL} from '../../utils/constants';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {useDescription} from '../../hooks/useDescription';
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormValues = {
  assetDescription: string;
  roomNumber: string;
  floorNumber: string;
  buildingNumber: string;
  city: string;
  manufacturer: string;
};

type LocationType = {
  longitude: number;
  latitude: number;
};

type ListType = {
  label: string;
  value: string;
};

export const DataFields = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const {addDescription, description} = useDescription();

  const [code, setCode] = useState<string>('');
  const [prevData, setPrevData] = useState<any>(null);
  const [geoPermission, setGeoPermission] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationType>();
  const [assetDdOpen, setAssetDdOpen] = useState<boolean>(false);
  const [assetList, setAssetList] = useState<ListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const validation = Yup.object().shape({
    assetDescription: Yup.string().required(t('required') as string),
    city: Yup.string().required(t('required') as string),
    buildingNumber: Yup.string().required(t('required') as string),
    floorNumber: Yup.string().required(t('required') as string),
  });

  useEffect(() => {
    if (route?.params?.code) {
      setCode(route.params.code);
      setPrevData(route.params.prevData);
      (async () => {
        if (description.length === 0) {
          await handleDescriptionLoad();
        } else {
          setAssetList(description);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  useEffect(() => {
    if (code !== '') {
      getLocationPermission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (geoPermission) {
      Geolocation.getCurrentPosition(
        info => {
          setLocation({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        },
        error => {
          Alert.alert(
            'Error',
            `${error.message}\n\nPlease enable device location.`,
          );
        },
      );
    }
  }, [geoPermission]);

  const handleSubmitForm = async (values: FormValues) => {
    if (location?.longitude) {
      const data = {
        ...prevData,
        ...values,
        longitude: location?.longitude,
        latitude: location?.latitude,
      };

      navigation.push('finishScreen', {
        code: code,
        prevData: data,
      });
    } else {
      Alert.alert(t('error'), 'Device Location is Required to Continue');
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
        Alert.alert(t('error'), t('location-permission-msg') as string, [
          {
            text: t('go-to-settings') as string,
            onPress: () => Linking.openSettings(),
          },
        ]);
      },
    );
  };

  const getAssetList = async () => {
    let BaseUrl;
    const  url = await AsyncStorage.getItem(
      'baseUrl'
    )
    BaseUrl = JSON.parse(url)
  
    try {
      const res = await axios.get(`${BaseUrl}/asset/descriptions`);
      return res.data;
    } catch (e: any) {
      console.log('==== ERROR IN GET ASSET DESCRIPTION ====');
      console.log(e.message);
      setIsLoading(false);
      setAssetList([]);
      return false;
    }
  };

  const handleDescriptionLoad = async () => {
    setIsLoading(true);
    const data = await getAssetList();
    if (data.payload) {
      const dt = data.payload.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      setAssetList(dt);
      addDescription(dt);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      Alert.alert('Error', 'Asset Description could not bbe fetched');
    }
  };

  return (
    <FullPage title={t('asset-data')} hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <Formik
            initialValues={{
              assetDescription: '',
              roomNumber: '',
              floorNumber: '',
              buildingNumber: '',
              city: '',
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
                {location?.longitude ? (
                  <Text style={styles.locationText}>
                    {t('device-location-obtained')}
                  </Text>
                ) : (
                  <Button
                    buttonStyle={styles.locationButton}
                    title={`** ${t('request-device-location')} **`}
                    type={'clear'}
                    onPress={getLocationPermission}
                    titleStyle={styles.locationButtonTitleStyle}
                    containerStyle={styles.locationContainer}
                  />
                )}

                <View>
                  <Text style={CommonStyles.ddTitleText}>
                    {t('asset-description')}
                  </Text>
                  <View style={styles.descriptionDdContainer}>
                    <DropDownPicker
                      listMode="MODAL"
                      loading={true}
                      searchable={true}
                      key={'asset-description'}
                      placeholder={t('asset-description') as string}
                      placeholderStyle={CommonStyles.ddPlaceholderStyle}
                      containerStyle={[
                        CommonStyles.ddContainerStyle,
                        {
                          width: Sizes.windowWidth * 0.76,
                        },
                      ]}
                      style={CommonStyles.ddStyle}
                      dropDownContainerStyle={
                        CommonStyles.dropDownContainerStyle
                      }
                      labelStyle={CommonStyles.ddLabelText}
                      disabled={false}
                      open={assetDdOpen}
                      value={values.assetDescription}
                      items={assetList}
                      setOpen={val => {
                        setAssetDdOpen(val);
                        if (!val) {
                          setFieldTouched('assetDescription');
                        }
                      }}
                      setValue={fn => {
                        const value = fn(values.assetDescription);
                        setFieldValue('assetDescription', value);
                      }}
                    />
                    <Button
                      disabled={isSubmitting}
                      buttonStyle={[CommonStyles.buttonStyle]}
                      onPress={handleDescriptionLoad}
                      titleStyle={CommonStyles.buttonTitleStyle}>
                      <Icon
                        name="cloud-refresh"
                        color="white"
                        type="material-community"
                      />
                    </Button>
                  </View>

                  <Text style={CommonStyles.ddErrorText}>
                    {touched.assetDescription && errors.assetDescription
                      ? errors.assetDescription
                      : undefined}
                  </Text>
                </View>

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.city && errors.city ? errors.city : undefined
                  }
                  label={t('city')}
                  labelStyle={CommonStyles.labelStyle}
                  placeholder={t('city') as string}
                  onBlur={() => setFieldTouched('city')}
                  onChangeText={value => setFieldValue('city', value)}
                  value={values.city}
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
                  label={t('building-number')}
                  labelStyle={CommonStyles.labelStyle}
                  placeholder={t('building-number') as string}
                  onBlur={() => setFieldTouched('buildingNumber')}
                  onChangeText={value => setFieldValue('buildingNumber', value)}
                  value={values.buildingNumber}
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
                  label={t('floor-number')}
                  labelStyle={CommonStyles.labelStyle}
                  placeholder={t('floor-number') as string}
                  onBlur={() => setFieldTouched('floorNumber')}
                  onChangeText={value => setFieldValue('floorNumber', value)}
                  value={values.floorNumber}
                  keyboardType="number-pad"
                />

                <Input
                  disabled={false}
                  disabledInputStyle={CommonStyles.disabledInputStyle}
                  inputContainerStyle={CommonStyles.inputContainerStyle}
                  errorMessage={
                    touched.roomNumber && errors.roomNumber
                      ? errors.roomNumber
                      : undefined
                  }
                  label={t('room-office-number')}
                  labelStyle={CommonStyles.labelStyle}
                  placeholder={t('room-office-number') as string}
                  onBlur={() => setFieldTouched('roomNumber')}
                  onChangeText={value => setFieldValue('roomNumber', value)}
                  value={values.roomNumber}
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
                  label={t('manufacturer')}
                  labelStyle={CommonStyles.labelStyle}
                  placeholder={t('manufacturer') as string}
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
                    title={t('next') as string}
                    titleStyle={CommonStyles.buttonTitleStyle}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
        <Dialog isVisible={isLoading}>
          <Dialog.Loading
            loadingProps={{size: 'large', color: Colors.primary_color_1}}
          />
          <Text style={styles.loaderText}>
            {t('loading-asset-description')}
          </Text>
        </Dialog>
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
  descriptionDdContainer: {
    flexDirection: 'row',
  },
  loaderText: {
    alignSelf: 'center',
  },
});
