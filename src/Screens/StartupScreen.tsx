import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { replace } from '../Navigation/NavigationServices';
import { Colors } from '../Utils/Colors';
import { Screens } from '../Utils/Const';

const StartupScreen = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      replace(Screens.Drawer);
      clearTimeout(timeout);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Weather App'}</Text>
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
