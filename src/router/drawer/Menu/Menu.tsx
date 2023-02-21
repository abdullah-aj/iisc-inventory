import React from 'react';
import {Linking, View, StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Text, Divider} from '@rneui/themed';
import {Colors} from '../../../assets/Theme';
import {useAuth} from '../../../hooks/useAuth';
import {useTranslation} from 'react-i18next';

type propsType = {
  navigation: any;
  state: any;
  descriptors: any;
  progress?: any;
};

const Menu: React.FC<propsType> = (props: propsType) => {
  const {logoutAction} = useAuth();
  const {t} = useTranslation();
  const handleLogout: any = () => {
    logoutAction();
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logoImg}
        />
        <View style={styles.menuHeader} />
        <View style={[styles.menuSection]}>
          <DrawerItem
            label={t('help') as string}
            onPress={() => Linking.openURL('https://sohoby.com')}
            style={styles.drawerItem}
          />
          <DrawerItem
            label={t('language') as string}
            onPress={() => props.navigation.navigate('language')}
            style={styles.drawerItem}
          />
          <Divider width={1} color={Colors.gray_9} style={styles.divider} />
          <DrawerItem label={t('logout') as string} onPress={handleLogout} />
          <Divider width={1} color={Colors.gray_9} style={styles.divider} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.version}>
        <Text style={styles.versionText}>v: 0.02</Text>
      </View>
    </>
  );
};

export default Menu;

const styles = StyleSheet.create({
  logoImg: {
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  menuHeader: {
    height: 2,
    backgroundColor: Colors.primary_color_1,
    marginVertical: 15,
  },

  menuSection: {
    marginTop: -20,
  },
  version: {
    position: 'absolute',
    left: 10,
    bottom: 5,
  },
  versionText: {
    color: Colors.gray_5,
  },
  drawerItem: {marginTop: 10},
  divider: {marginLeft: -10},
});
