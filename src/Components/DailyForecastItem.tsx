import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../Utils/Colors';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { moderateScale, verticalScale } from '../Utils/Responsive';

const DailyForecastItem = ({
  date,
  icon,
  maxTemp,
  minTemp,
  onPressForecastItem,
}: {
  date: string;
  icon: string;
  maxTemp: string;
  minTemp: string;
  onPressForecastItem: () => void;
}) => (
  <TouchableOpacity style={styles.dailyForecastItem} onPress={onPressForecastItem}>
    <Text style={styles.forecastDate}>{date}</Text>
    <Icon name={icon} size={moderateScale(24)} color={Colors.primaryDark} />
    <Text style={styles.forecastTemp}>{maxTemp}</Text>
    <Text style={styles.forecastTemp}>{minTemp}</Text>
  </TouchableOpacity>
);

export default DailyForecastItem;

const styles = StyleSheet.create({
  dailyForecastItem: {
    backgroundColor: Colors.overlayWhite70,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    alignItems: 'center',
    flex: 1,
    marginHorizontal: moderateScale(5),
  },
  forecastDate: {
    ...CommonStylesFn.text(3.5, Colors.primaryDark),
    marginBottom: verticalScale(4),
  },
  forecastTemp: {
    ...CommonStylesFn.text(3.5, Colors.primaryDark),
  },
});
