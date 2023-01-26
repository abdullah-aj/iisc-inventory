/* eslint-disable curly */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes, Colors} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button} from '@rneui/themed';

import {useProduct} from '../../hooks/useProduct';
import axios from 'axios';
import {API_URL} from '../../utils/constants';

export const FinishScreen = () => {
  const {addData, products, updateAfterSubmit} = useProduct();

  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (route?.params?.code) {
      (async () => {
        setCode(route.params.code);
        if (route.params.prevData) {
          await addData(route.params.code, route.params.prevData);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  const handleFinish = async () => {
    console.log(products);
    setLoading(true);
    const res = await saveData();
    let toUpdate = [...products];
    let failedCodes = [];
    for (let i = res.length - 1; i >= 0; i--) {
      if (res[i] === true) {
        toUpdate.splice(i, 1);
      } else {
        failedCodes.push(toUpdate[i].barcode);
      }
    }

    //updateAfterSubmit([...toUpdate]);
    updateAfterSubmit([]);
    const fail = res.filter(item => item === false);
    if (fail.length) {
      Alert.alert(
        'ERROR',
        `There were ${res.length} assets to save, and ${
          fail.length
        } assets encountered errors
        \n\nFollowing Bar-Codes encountered an error while saving
        \n${failedCodes.join('\n')}
        \nData of Failed bar-Codes have been deleted. You can try again with fresh data
        \nIf the error persists, then contact Administrator`,
        [
          {
            text: 'OK',
            onPress: () => navigation.push('home'),
          },
        ],
      );
    } else {
      Alert.alert('SUCCESS', `${res.length} assets saved successfully`, [
        {
          text: 'OK',
          onPress: () => navigation.push('home'),
        },
      ]);
    }
  };

  const handleSymmetricalFinish = async () => {
    // Symmetrical Finish will not save data to server
    navigation.push('barcode', {
      symmetricalTo: code,
    });
  };

  const saveData = async () => {
    return await Promise.all(
      await products.map(async product => {
        const formData = new FormData();
        product.image?.map(async (img, i) => {
          formData.append(`image${i === 0 ? '' : i + 1}`, {
            uri: img.path,
            type: 'image/jpeg',
            name: `image-${img.id}-${i + 1}.jpg`,
          });
        });
        if (product.barcode) formData.append('asset_tag', product.barcode);
        // Entity
        if (product.data?.entityCode)
          formData.append('company_id', product.data.entityCode);

        // Asset Identification
        if (product.data?.custodian)
          formData.append('custodian', product.data.custodian);
        if (product.data?.uniqueFactoryId)
          formData.append('unique_factory_id', product.data.uniqueFactoryId);
        if (product.data?.quantity)
          formData.append('quantity', product.data.quantity);
        if (product.data?.baseUnitOfMeasure)
          formData.append('base_unit', product.data.baseUnitOfMeasure);
        if (product.data?.assetDescription)
          formData.append('name', product.data.assetDescription);
        if (product.data?.uniqueAssetNumber)
          formData.append(
            'unique_asset_number_entity',
            product.data.uniqueAssetNumber,
          );
        if (product.data?.assetCondition)
          formData.append(
            'asset_condition_upon_inspection',
            product.data.assetCondition,
          );

        // Geological Data

        if (product.data?.latitude)
          formData.append('lat', product.data?.latitude);

        if (product.data?.longitude)
          formData.append('lng', product.data?.longitude);
        if (product.data?.zipCode)
          formData.append('ZIP_code', product.data.zipCode);
        if (product.data?.roomNumber)
          formData.append('room_number', product.data.roomNumber);
        if (product.data?.floorNumber)
          formData.append('floors_number', product.data.floorNumber);
        if (product.data?.buildingNumber)
          formData.append('building_number', product.data.buildingNumber);
        if (product.data?.city) formData.append('city', product.data.city);
        if (product.data?.region)
          formData.append('region', product.data.region);
        if (product.data?.country)
          formData.append('country', product.data.country);

        // Biological Data
        if (product.data?.gender)
          formData.append('gender', product.data.gender);
        if (product.data?.productionCapacity)
          formData.append(
            'production_capacity',
            product.data?.productionCapacity,
          );
        if (product.data?.purpose)
          formData.append('purpose', product.data.purpose);
        if (product.data?.stageInBiologicalCycle)
          formData.append(
            'stage_biological_cycle',
            product.data?.stageInBiologicalCycle,
          );
        if (product.data?.biologicalAge)
          formData.append('biological_age', product.data.biologicalAge);
        if (product.data?.usefulLife)
          formData.append('useful_life', product.data.usefulLife);

        // Machine, infrastructure and transport
        if (product.data?.material)
          formData.append('material', product.data.material);
        if (product.data?.plateNumber)
          formData.append('plate_number', product.data.plateNumber);
        if (product.data?.registrationNumber)
          formData.append(
            'registration_number',
            product.data.registrationNumber,
          );
        if (product.data?.yearOfManufacture)
          formData.append(
            'year_of_manufacture',
            product.data.yearOfManufacture,
          );
        if (product.data?.manufactureSerialNumber)
          formData.append(
            'manufacturer_serial_number',
            product.data.manufactureSerialNumber,
          );
        if (product.data?.serialNumber)
          formData.append('serial_number', product.data.serialNumber);

        if (product.data?.countryOfOrigin)
          formData.append('country_of_origin', product.data.countryOfOrigin);
        if (product.data?.model) formData.append('modell', product.data.model);
        if (product.data?.manufacturer)
          formData.append('manufacturer', product.data.manufacturer);

        // Intangible Data

        if (product.data?.assetUtilization)
          formData.append('asset_Utilization', product.data.assetUtilization);
        if (product.data?.reasonForIndefinite)
          formData.append(
            'reasons_for_indefinite',
            product.data.reasonForIndefinite,
          );
        if (product.data?.licenseExpiration)
          formData.append(
            'license_expiration_date',
            product.data.licenseExpiration,
          );

        if (product.data?.programLicense)
          formData.append('programme_license', product.data.programLicense);

        if (product.data?.version)
          formData.append('version', product.data.version);

        if (product.type === 'INFRASTRUCTURE') {
          formData.append('asset_type', '1');
        } else if (product.type === 'MACHINE') {
          formData.append('asset_type', '2');
        } else if (product.type === 'TRANSPORT') {
          formData.append('asset_type', '3');
        } else if (product.type === 'FURNITURE') {
          formData.append('asset_type', '4');
        } else if (product.type === 'BIO') {
          formData.append('asset_type', '5');
        } else if (product.type === 'INTANGIBLE') {
          formData.append('asset_type', '6');
        }
        // Extra: removing this crashes the api
        formData.append('accounting_id', 1);

        console.log('------------');
        for (const part of formData.getParts()) {
          console.log(part);
        }
        console.log('------------');

        try {
          const response = await axios.post(`${API_URL}/hardware`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.data.status === 'error') {
            console.log(response.data);
            console.log('=== ERROR FROM SERVER ===');
            return false;
          } else {
            console.log(response.data);
            console.log('=== SUCCESS ===');
            return true;
          }
        } catch (error: any) {
          console.log('=== ERROR IN CATCH ===');
          console.log('ERROR RESPONSE: ', error.response);
          console.log('ERROR MESSAGE: ', error.message);
          return false;
        }
      }),
    );
  };

  return (
    <FullPage title="FINISH" hasBackBtn={false}>
      <View style={styles.centerContainer}>
        <View style={styles.innerCircle}>
          <View>
            {loading ? (
              <ActivityIndicator
                color={Colors.primary_color_1}
                size={'large'}
              />
            ) : (
              <>
                <Button
                  buttonStyle={[CommonStyles.buttonStyle, styles.button]}
                  disabledStyle={CommonStyles.buttonDisabledStyle}
                  containerStyle={CommonStyles.buttonContainerStyle}
                  onPress={handleFinish}
                  title="FINISH"
                  titleStyle={CommonStyles.buttonTitleStyle}
                />
                <Text style={styles.textStyle}>OR</Text>
                <Button
                  type="clear"
                  buttonStyle={[CommonStyles.outLineButtonStyle, styles.button]}
                  disabledStyle={CommonStyles.buttonDisabledStyle}
                  containerStyle={CommonStyles.buttonContainerStyle}
                  onPress={handleSymmetricalFinish}
                  title="ADD SYMMETRICAL ASSET"
                  titleStyle={CommonStyles.outlineBtnTextStyle}
                />
              </>
            )}
          </View>
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
    width: Sizes.windowWidth * 0.5,
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.gray_1,
    paddingTop: 15,
  },
});
