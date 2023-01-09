import {Button, Header as HeaderRNE, Input} from '@rneui/themed';
import React, {useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {Colors, Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';

// type User = {
//   username: string;
//   password: string;
// };

export const Login = () => {
  const {loginAction} = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      if (email.toUpperCase() === 'USER' && password.toUpperCase() === 'USER') {
        loginAction({username: 'Hello User'});
      } else {
        setErrorEmail('Email or user name is not valid');
        setErrorPassword('Password is not valid');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <HeaderRNE
        backgroundColor={Colors.gray_7}
        centerComponent={{text: 'SIGN IN', style: styles.heading}}
      />
      <View style={styles.container}>
        <View style={styles.formArea}>
          <View>
            <Input
              disabled={loading}
              disabledInputStyle={CommonStyles.disabledInputStyle}
              inputContainerStyle={CommonStyles.inputContainerStyle}
              errorMessage={errorEmail}
              errorStyle={{}}
              errorProps={{}}
              inputStyle={{}}
              label="Email"
              labelStyle={CommonStyles.labelStyle}
              labelProps={{}}
              placeholder="Enter Email"
              onChangeText={value => {
                setErrorEmail('');
                setEmail(value);
              }}
            />

            <Input
              disabled={loading}
              disabledInputStyle={CommonStyles.disabledInputStyle}
              inputContainerStyle={CommonStyles.inputContainerStyle}
              errorMessage={errorPassword}
              errorStyle={{}}
              errorProps={{}}
              inputStyle={{}}
              label="Password"
              labelStyle={CommonStyles.labelStyle}
              labelProps={{}}
              placeholder="Password"
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
                title="Login"
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
