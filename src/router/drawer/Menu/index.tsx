/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Linking, ImageBackground, View, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  //DrawerItemList,
} from '@react-navigation/drawer';

import {Text, Avatar, Divider} from '@rneui/themed';

type propsType = {
  navigation: any;
  state: any;
  descriptors: any;
  progress?: any;
};

const index: React.FC<propsType> = (props: propsType) => {
  const logoutAction: any = () => {
    console.log('Logging Out');
  };

  return (
    <>
      {/* <ImageBackground
        imageStyle={styles.imgBg}
        style={styles.imgBgStyle}
        source={mark}>
        <View style={styles.drawerContent}>
          <View style={styles.topView}>
            <View style={styles.profileBox}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('profile')}>
                <Avatar
                  size={64}
                  rounded
                  // icon={{name: 'heartbeat', type: 'font-awesome'}}
                  // containerStyle={{backgroundColor: '#eb1561'}}
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/36.jpg',
                  }}
                />
              </TouchableOpacity>
              <View style={styles.profileInfo}>
                <Text style={styles.nameText}>
                  {userData.user.first_name} {userData.user.last_name}
                </Text>
                <Text style={styles.usernameText}>{userData.user.email}</Text>
                <View style={styles.blueLine} />
              </View>
            </View>
            <Divider width={3} color={COLORS.primary_color_1} />
            <View style={styles.langArea}>
              <View style={styles.lang}>
                <View style={styles.language}>
                  <Language style={styles.langIcon} />
                  <Text style={styles.langText}>{texts.language}</Text>
                </View>
                <TouchableOpacity
                  style={styles.langBtn}
                  onPress={() => props.navigation.navigate('language')}>
                  <Text style={styles.langOptions}>
                    {language === 'arabic' ? 'عربية' : 'English'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <DrawerContentScrollView {...props}>
            <View
              style={[
                styles.menuSection,
                {paddingRight: language === 'arabic' ? 15 : undefined},
                {paddingLeft: language === 'english' ? 15 : undefined},
              ]}>
              <DrawerItem
                label={texts.help}
                onPress={() => Linking.openURL('https://cartrust.sa')}
              />
              <Divider
                width={1}
                color={COLORS.base_color_8}
                style={{marginLeft: -10}}
              />
              <DrawerItem label={texts.logout} onPress={() => logoutAction()} />
              <Divider
                width={1}
                color={COLORS.base_color_8}
                style={{marginLeft: -10}}
              />
            </View>
          </DrawerContentScrollView>
          <View style={styles.version}>
            <Text>v: 0.02</Text>
          </View>
        </View>
      </ImageBackground> */}
    </>
  );
};

export default index;
