import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FullPage from '../../components/layouts/full-page/FullPage';
import {Sizes} from '../../assets/Theme';
import {CommonStyles} from '../../assets/CommonStyle';
import {Button, Input} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {API_URL} from '../../utils/constants';
import {useTranslation} from 'react-i18next';

type FormValues = {
  entityCode: string;
  entity: string;
};

type EntityType = {
  label: string;
  value: string;
};

export const EntityData = () => {
  const navigation = useNavigation<any>();
  const [open, setOpen] = useState(false);
  const [entities, setEntities] = useState<EntityType[]>([]);

  const {t} = useTranslation();

  const validation = Yup.object().shape({
    entityCode: Yup.string().required(t('required') as string),
    entity: Yup.string().required(t('required') as string),
  });

  useEffect(() => {
    (async () => {
      const data = await getEntities();
      if (data.rows && data.total > 0) {
        const ent = data.rows.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
        setEntities(ent);
      }
    })();
  }, []);

  const getEntities = async (): Promise<any> => {
    try {
      const res = await axios.get(`${API_URL}/companies`);
      return res.data;
    } catch (e: any) {
      console.log('==== ERROR IN GET ENTITIES ====');
      console.log(e.message);
      return false;
    }
  };

  const handleSubmitForm = async (values: FormValues) => {
    const data = {...values};
    navigation.push('typeSelection', {
      prevData: data,
    });
  };

  return (
    <FullPage title={t('entity-data')} hasBackBtn={true}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <Formik
            initialValues={{
              entityCode: '',
              entity: '',
            }}
            validationSchema={validation}
            onSubmit={handleSubmitForm}>
            {({
              isSubmitting,
              handleSubmit,
              values,
              setFieldValue,
              setFieldTouched,
              errors,
              touched,
            }) => (
              <View>
                <View style={CommonStyles.ddContainer}>
                  <Text style={CommonStyles.ddTitleText}>
                    {t('entity-name')}
                  </Text>
                  <DropDownPicker
                    loading={entities.length === 0}
                    listMode="SCROLLVIEW"
                    //searchable={true}
                    key={'entity-name'}
                    placeholder={t('select-entity') as string}
                    placeholderStyle={CommonStyles.ddPlaceholderStyle}
                    containerStyle={CommonStyles.ddContainerStyle}
                    style={CommonStyles.ddStyle}
                    dropDownContainerStyle={CommonStyles.dropDownContainerStyle}
                    labelStyle={CommonStyles.ddLabelText}
                    disabled={false}
                    open={open}
                    value={values.entity}
                    items={entities}
                    setOpen={val => {
                      setOpen(val);
                      if (!val) {
                        setFieldTouched('entity');
                      }
                    }}
                    setValue={fn => {
                      const value = fn(values.entity);
                      setFieldValue('entity', value);
                      setFieldValue('entityCode', `${value}`);
                    }}
                    setItems={setEntities}
                  />
                  <Text style={CommonStyles.ddErrorText}>
                    {touched.entity && errors.entity
                      ? errors.entity
                      : undefined}
                  </Text>
                </View>

                <View style={styles.inputContainer}>
                  <Input
                    disabled={true}
                    disabledInputStyle={CommonStyles.disabledInputStyle}
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    errorMessage={
                      touched.entityCode && errors.entityCode
                        ? errors.entityCode
                        : undefined
                    }
                    label={t('entity-code')}
                    labelStyle={CommonStyles.labelStyle}
                    placeholder={t('entity-code') as string}
                    //onBlur={() => setFieldTouched('entityCode')}
                    //onChangeText={value => setFieldValue('entityCode', value)}
                    value={values.entityCode}
                    editable={false}
                    style={CommonStyles.inputStyle}
                  />
                </View>

                <View>
                  <Button
                    disabled={isSubmitting}
                    buttonStyle={[CommonStyles.buttonStyle, styles.button]}
                    disabledStyle={CommonStyles.buttonDisabledStyle}
                    containerStyle={CommonStyles.buttonContainerStyle}
                    onPress={handleSubmit}
                    title={t('next') as string}
                    titleStyle={CommonStyles.buttonTitleStyle}
                  />
                </View>
              </View>
            )}
          </Formik>
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
  inputContainer: {
    marginTop: 5,
  },
});
