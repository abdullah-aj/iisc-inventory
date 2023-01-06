import {Text} from '@rneui/base';
import {Icon} from '@rneui/themed';
import React, {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors, Sizes} from '../../assets/Theme';

type Props = {
  id: number;
  onPress: (id: number) => void;
  text: string;
  path: string;
};

export const CameraButton: FC<Props> = ({id, onPress, text, path}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
      <View style={styles.whiteBox}>
        {path !== '' ? (
          <Image
            source={{uri: path}}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        ) : (
          <Icon
            name="camera"
            type="material-community"
            color={Colors.gray_8}
            size={45}
          />
        )}
      </View>
      <View style={styles.textArea}>
        <Text style={styles.textStyle}>
          {text} {id}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const dm = Sizes.windowWidth / 4;

const styles = StyleSheet.create({
  container: {
    height: dm + 25,
    width: dm,
  },
  whiteBox: {
    width: dm,
    height: dm,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  textArea: {
    width: dm,
    height: 25,
    justifyContent: 'flex-end',
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.primary_color_1,
  },
});
