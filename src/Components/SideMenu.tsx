import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../Utils/Colors';

const SideMenu = () => {
  return (
    <View style={styles.container}>
      <Text>{'Demo App'}</Text>
    </View>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryDark,
  },
});
