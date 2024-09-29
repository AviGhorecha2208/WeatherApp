import React, {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'

import {Colors} from '../Utils/Colors'
import {WINDOW_WIDTH} from '../Utils/Responsive'

const CloudAnimation = () => {
  const cloud1 = useSharedValue(-50)
  const cloud2 = useSharedValue(-50)
  const cloud3 = useSharedValue(-50)

  useEffect(() => {
    const animateCloud = (cloudRef: SharedValue<number>, duration: number) => {
      cloudRef.value = withRepeat(
        withTiming(WINDOW_WIDTH, {duration, easing: Easing.linear}),
        -1,
        false
      )
    }

    animateCloud(cloud1, 60000)
    animateCloud(cloud2, 80000)
    animateCloud(cloud3, 100000)
  }, [])

  const useCloudStyle = (cloudRef: SharedValue<number>) => {
    return useAnimatedStyle(() => ({
      transform: [{translateX: cloudRef.value}]
    }))
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.cloud, styles.cloud1, useCloudStyle(cloud1)]}>
        <Icon name={'cloud-outline'} size={50} color={Colors.white} />
      </Animated.View>
      <Animated.View style={[styles.cloud, styles.cloud2, useCloudStyle(cloud2)]}>
        <Icon name={'cloud-outline'} size={40} color={Colors.white} />
      </Animated.View>
      <Animated.View style={[styles.cloud, styles.cloud3, useCloudStyle(cloud3)]}>
        <Icon name={'cloud-outline'} size={30} color={Colors.white} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: -1000
  },
  cloud: {
    position: 'absolute',
    opacity: 0.5
  },
  cloud1: {
    top: '10%'
  },
  cloud2: {
    top: '25%'
  },
  cloud3: {
    top: '40%'
  }
})

export default CloudAnimation
