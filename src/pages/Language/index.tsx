import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Colors, Sizes} from '../../assets/Theme';
import {Button} from '@rneui/themed';
import {CommonStyles} from '../../assets/CommonStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import {useTranslation} from 'react-i18next';
import {useLang} from '../../hooks/useLang';
import RNRestart from 'react-native-restart';

type LangType = 'en' | 'ar';

export const Language = () => {
  const {t} = useTranslation();

  const {getLang, setLang} = useLang();

  const [selectedLang, setSelectedLang] = useState<LangType>(() => getLang());
  const [open, setOpen] = useState(false);
  const [lngList, setLngList] = useState([
    {label: 'English', value: 'en'},
    {label: 'عربي', value: 'ar'},
  ]);

  const handleBtnPress = async () => {
    if (selectedLang) {
      setLang(selectedLang);
      Alert.alert('Info', 'App will restart to take effect', [
        {
          text: 'OK',
          onPress: () => RNRestart.Restart(),
        },
      ]);
    }
  };

  return (
    <FullPage title={t('language')} hasBackBtn={true} disableScroll={true}>
      <View style={styles.centerContainer}>
        <View style={styles.innerCircle}>
          <View>
            <DropDownPicker
              key={'language'}
              placeholder={t('select-language') as string}
              placeholderStyle={CommonStyles.ddPlaceholderStyle}
              containerStyle={CommonStyles.ddContainerStyle}
              style={[CommonStyles.ddStyle, styles.ddStyle]}
              dropDownContainerStyle={CommonStyles.dropDownContainerStyle}
              labelStyle={CommonStyles.ddLabelText}
              disabled={false}
              open={open}
              value={selectedLang}
              items={lngList}
              setOpen={setOpen}
              setValue={setSelectedLang}
              setItems={setLngList}
              maxHeight={250}
            />
          </View>
          <Button
            disabled={!selectedLang}
            buttonStyle={[CommonStyles.buttonStyle, styles.button]}
            disabledStyle={CommonStyles.buttonDisabledStyle}
            containerStyle={CommonStyles.buttonContainerStyle}
            onPress={handleBtnPress}
            title={t('ok') as string}
            titleStyle={CommonStyles.buttonTitleStyle}
          />
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
    width: Sizes.windowWidth * 0.6,
    alignSelf: 'center',
    marginTop: 10,
  },
  ddStyle: {
    width: Sizes.windowWidth * 0.6,
  },
});
