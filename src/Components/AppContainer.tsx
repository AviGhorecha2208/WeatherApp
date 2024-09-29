import React from 'react'
import {StyleSheet, View} from 'react-native'

import {Colors} from '../Utils/Colors'

const AppContainer = ({children}: {children: React.ReactNode}) => {
  return <View style={styles.container}>{children}</View>
}

export default AppContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  }
})
