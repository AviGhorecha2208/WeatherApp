import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import { Colors } from '../../Utils/Colors';
import { moderateScale, scale, verticalScale } from '../../Utils/Responsive';

const HomeScreenShimmer = () => {
  return (
    <View style={styles.shimmerContainer}>
      <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.temperatureShimmer} />
      <View style={styles.minMaxContainer}>
        <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.minMaxShimmer} />
        <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.minMaxShimmer} />
      </View>
      <View style={styles.weatherDetailsContainer}>
        {[1, 2, 3].map((_, index) => (
          <ShimmerPlaceholder
            key={index}
            LinearGradient={LinearGradient}
            style={styles.weatherDetailShimmer}
          />
        ))}
      </View>
      <View style={styles.whiteContainer}>
        <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.forecastTitleShimmer} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.slForecastContainer}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
            <ShimmerPlaceholder
              key={index}
              LinearGradient={LinearGradient}
              style={styles.forecastItemShimmer}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreenShimmer;

const styles = StyleSheet.create({
  shimmerContainer: {
    marginTop: verticalScale(20),
  },
  temperatureShimmer: {
    width: scale(150),
    height: verticalScale(80),
    borderRadius: moderateScale(8),
    alignSelf: 'center',
    marginBottom: verticalScale(10),
  },
  minMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  weatherDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.overlayWhite40,
    borderRadius: moderateScale(15),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    marginTop: verticalScale(20),
  },
  whiteContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(15),
    marginTop: verticalScale(20),
    padding: verticalScale(20),
    gap: scale(20),
  },
  minMaxShimmer: {
    width: scale(60),
    height: verticalScale(20),
    borderRadius: moderateScale(4),
    marginHorizontal: scale(10),
  },
  weatherDetailShimmer: {
    width: scale(100),
    height: verticalScale(60),
    borderRadius: moderateScale(8),
  },
  forecastTitleShimmer: {
    width: scale(120),
    height: verticalScale(24),
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(10),
  },
  forecastItemShimmer: {
    width: scale(60),
    height: verticalScale(100),
    borderRadius: moderateScale(8),
    marginRight: scale(10),
  },
  slForecastContainer: {
    flexGrow: 1,
  },
});
