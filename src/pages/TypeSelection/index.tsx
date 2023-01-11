import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Colors, Sizes} from '../../assets/Theme';
import {ButtonGroup} from '@rneui/themed';
import {useProduct} from '../../hooks/useProduct';

export const TypeSelection = () => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const {addType} = useProduct();

  const handleBtnPress = async (index: number) => {
    if (route?.params?.code) {
      if (index === 0) {
        await addType(route.params.code, 'BIO');
      } else {
        await addType(route.params.code, 'MACHINE');
      }
      navigation.push('entityData', {code: route.params.code});
    } else {
      Alert.alert('ERROR', 'Barcode has not been set properly');
    }
  };

  const buttons = [
    {element: () => <Text>Plants and Animals</Text>},
    {element: () => <Text>Machinery and Equipment</Text>},
  ];

  return (
    <FullPage title="ADD DETAILS" hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <View>
            <ButtonGroup
              onPress={i => handleBtnPress(i)}
              selectedIndex={null}
              buttons={buttons}
              containerStyle={styles.btnContainerStyle}
              buttonContainerStyle={styles.buttonContainerStyle}
              selectedButtonStyle={styles.selectedButtonStyle}
            />
          </View>
        </View>
      </View>
    </FullPage>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  buttonContainerStyle: {
    backgroundColor: Colors.primary_color_1,
  },
  selectedButtonStyle: {
    backgroundColor: '#ad4040',
  },
  formArea: {
    paddingHorizontal: 20,
    marginTop: Sizes.windowHeight * 0.26,
  },
  btnContainerStyle: {
    height: 80,
  },
});
