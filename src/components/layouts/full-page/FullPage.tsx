import React, {FC} from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import {Colors, Sizes} from '../../../assets/Theme';
import {Header as HeaderRNE, Icon} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

type Props = {
  children?: JSX.Element;
  title: string;
  hasBackBtn: boolean;
};

const FullPage: FC<Props> = ({children, title, hasBackBtn}) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <HeaderRNE
        backgroundColor={Colors.gray_7}
        centerComponent={{text: title, style: styles.heading}}
        rightComponent={{
          icon: 'menu',
          color: Colors.primary_color_1,
          onPress: () => navigation.toggleDrawer(),
        }}
        leftComponent={
          hasBackBtn ? (
            <TouchableOpacity>
              <Icon
                name="arrow-back-outline"
                type="ionicon"
                color={Colors.primary_color_1}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}>
        {children}
      </ScrollView>
    </>
  );
};

export default FullPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    // flex: 1,
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
