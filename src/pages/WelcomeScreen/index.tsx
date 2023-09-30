import {Button, Header as HeaderRNE, Input} from '@rneui/themed';
import React, {useState} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Colors, Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export const WelcomeScreen = () => {
  const navigation = useNavigation();

  const {t} = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('');

  const handleLogin = async () => {
    setLoading(true);
    if (!baseUrl) {
      setErrorEmail('Enter base url');
    } else if (!token) {
      setErrorPassword('Enter token');
    } else {
      await AsyncStorage.setItem('token', JSON.stringify(token));
      await AsyncStorage.setItem('baseUrl', JSON.stringify(baseUrl));
      navigation.navigate('login');
    }
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <HeaderRNE
        backgroundColor={Colors.gray_7}
        centerComponent={{
          text: t('enter-domain') as string,
          style: styles.heading,
        }}
      />
      <View style={styles.container}>
        <View style={styles.formArea}>
          <View>
            <Input
              disabled={loading}
              disabledInputStyle={CommonStyles.disabledInputStyle}
              inputContainerStyle={CommonStyles.inputContainerStyle}
              errorMessage={errorEmail}
              label={t('baseUrl')}
              labelStyle={CommonStyles.labelStyle}
              // @ts-expect-error
              placeholder={t('enter-baseurl') as string}
              onChangeText={(value: string) => {
                setErrorEmail('');
                setBaseUrl(value);
              }}
              keyboardType={
                Platform.OS === 'android' ? 'visible-password' : 'default'
              }
            />

            <Input
              //   secureTextEntry={true}
              disabled={loading}
              disabledInputStyle={CommonStyles.disabledInputStyle}
              inputContainerStyle={CommonStyles.inputContainerStyle}
              errorMessage={errorPassword}
              label={t('token')}
              labelStyle={CommonStyles.labelStyle}
              // @ts-expect-error
              placeholder={t('enter-token') as string}
              onChangeText={(value: string) => {
                setErrorPassword('');
                setToken(value);
              }}
            />

            <View style={styles.buttonContainer}>
              <Button
                disabled={loading || baseUrl === '' || token === ''}
                buttonStyle={CommonStyles.buttonStyle}
                disabledStyle={CommonStyles.buttonDisabledStyle}
                containerStyle={CommonStyles.buttonContainerStyle}
                onPress={handleLogin}
                title={t('next') as string}
                titleStyle={CommonStyles.buttonTitleStyle}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  formArea: {
    paddingHorizontal: 20,
    marginTop: Sizes.windowHeight * 0.2,
  },
  logoImage: {
    width: Sizes.windowWidth * 0.5,
    resizeMode: 'contain',
  },
  heading: {
    color: Colors.primary_color_1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 4,
    marginTop: Sizes.windowHeight * 0.07,
  },
});
