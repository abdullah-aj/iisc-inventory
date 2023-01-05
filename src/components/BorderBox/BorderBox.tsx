import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../assets/Theme';

type Props = {
  width: number;
  height: number;
  children?: JSX.Element;
};

export const BorderBox: FC<Props> = ({width, height, children}) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <View
          style={[
            styles.viewOne,
            {
              height: height + 10,
              width: width + 10,
            },
          ]}
        />
        <View
          style={[
            styles.viewTwo,
            {
              height: height + 12,
              width: width + 12,
            },
          ]}>
          <View style={[styles.contentArea, {height: height, width: width}]}>
            {children}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  viewContainer: {},
  viewOne: {
    position: 'absolute',
    top: 9,
    left: 9,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.primary_color_1,
  },
  viewTwo: {
    position: 'relative',
    top: -1,
    left: -1,
    backgroundColor: Colors.background,
    borderRadius: 25,
    marginTop: 9,
    marginLeft: 9,
  },
  contentArea: {
    backgroundColor: '#fff',
    marginTop: 6,
    marginLeft: 6,
  },
});
