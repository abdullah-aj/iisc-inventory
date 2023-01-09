import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Colors, Sizes} from '../../assets/Theme';
import {ButtonGroup} from '@rneui/themed';
import {useProduct} from '../../hooks/useProduct';

export const TypeSelection = () => {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const {addType} = useProduct();

  useEffect(() => {
    if (selected !== null) {
      selected === 0 ? navigateBio() : navigateMachine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const navigateBio = async () => {
    if (route?.params?.code) {
      await addType(route.params.code, 'BIO');
      navigation.push('bioData', {code: route.params.code});
    }
  };

  const navigateMachine = async () => {
    if (route?.params?.code) {
      await addType(route.params.code, 'MACHINE');
      navigation.push('machineData', {code: route.params.code});
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
              onPress={i => setSelected(i)}
              selectedIndex={selected}
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
