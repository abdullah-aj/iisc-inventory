import {Button, Header as HeaderRNE, Input} from '@rneui/themed';
import React, {useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {Colors, Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {useTranslation} from 'react-i18next';

export const Login = () => {
  const {loginAction} = useAuth();

  const {t} = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    setLoading(true);

    if ((await loginAction({username: email, password: password})) === false) {
      setLoading(false);
      setErrorPassword(t('invalid-username-or-password') as string);
    }
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <HeaderRNE
        backgroundColor={Colors.gray_7}
        centerComponent={{text: t('sign-in') as string, style: styles.heading}}
      />
      <View style={styles.container}>
        <View style={styles.formArea}>
          <View>
            <Input
              disabled={loading}
              disabledInputStyle={CommonStyles.disabledInputStyle}
              inputContainerStyle={CommonStyles.inputContainerStyle}
              errorMessage={errorEmail}
              label={t('username')}
              labelStyle={CommonStyles.labelStyle}
              placeholder={t('enter-username') as string}
              onChangeText={value => {
                setErrorEmail('');
                setEmail(value);
              }}
              keyboardType={'visible-password'}
            />

            <Input
              secureTextEntry={true}
              disabled={loading}
              disabledInputStyle={CommonStyles.disabledInputStyle}
              inputContainerStyle={CommonStyles.inputContainerStyle}
              errorMessage={errorPassword}
              label={t('password')}
              labelStyle={CommonStyles.labelStyle}
              placeholder={t('enter-password') as string}
              onChangeText={value => {
                setErrorPassword('');
                setPassword(value);
              }}
            />

            <View style={styles.buttonContainer}>
              <Button
                disabled={loading || email === '' || password === ''}
                buttonStyle={CommonStyles.buttonStyle}
                disabledStyle={CommonStyles.buttonDisabledStyle}
                containerStyle={CommonStyles.buttonContainerStyle}
                onPress={handleLogin}
                title={t('login') as string}
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
