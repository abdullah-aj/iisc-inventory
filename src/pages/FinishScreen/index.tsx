import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button} from '@rneui/themed';

import {useProduct} from '../../hooks/useProduct';

type ProdType = 'BIO' | 'MACHINE' | '';

export const FinishScreen = () => {
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

  const handleFinish = async () => {
    const data = {...prevData};

    console.log(data);

    Alert.alert('INFO', 'Coming Soon');

    // navigation.push('entityData', {
    //   code: code,
    //   prevData: data,
    // });
  };

  const handleSymmetricalFinish = async () => {
    const data = {...prevData};

    console.log(data);

    Alert.alert('INFO', 'Coming Soon');

    // navigation.push('entityData', {
    //   code: code,
    //   prevData: data,
    // });
  };

  return (
    <FullPage
      title={type === 'BIO' ? 'PLANTS AND ANIMALS' : 'Machinery and Equipment'}
      hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <View>
            <Button
              disabled={false}
              buttonStyle={[CommonStyles.buttonStyle, styles.button]}
              disabledStyle={CommonStyles.buttonDisabledStyle}
              containerStyle={CommonStyles.buttonContainerStyle}
              onPress={handleFinish}
              title="FINISH"
              titleStyle={CommonStyles.buttonTitleStyle}
            />
            <Text>OR</Text>
            <Button
              type="clear"
              disabled={false}
              buttonStyle={[CommonStyles.outLineButtonStyle, styles.button]}
              disabledStyle={CommonStyles.buttonDisabledStyle}
              containerStyle={CommonStyles.buttonContainerStyle}
              onPress={handleSymmetricalFinish}
              title="ADD SYMMETRICAL ASSET"
              titleStyle={CommonStyles.outlineBtnTextStyle}
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
