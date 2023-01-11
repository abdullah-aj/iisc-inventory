import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes, Colors} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button} from '@rneui/themed';

import {useProduct} from '../../hooks/useProduct';

export const FinishScreen = () => {
  const {products, addData} = useProduct();

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
    console.log('===== SAVING DATA TO SERVER =====');
    console.log(products);
    navigation.push('home');
  };

  const handleSymmetricalFinish = async () => {
    // Symmetrical Finish will not save data to server
    navigation.push('barcode', {
      symmetricalTo: code,
    });
  };

  return (
    <FullPage title="FINISH" hasBackBtn={false}>
      <View style={styles.centerContainer}>
        <View style={styles.innerCircle}>
          <View>
            <Button
              disabled={loading}
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
              disabled={loading}
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
