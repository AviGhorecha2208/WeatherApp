import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../Utils/Colors';
import { moderateScale } from '../Utils/Responsive';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Fonts } from '../Assets/Fonts/Fonts';

const WeatherDetailItem = ({
  icon,
  text,
  subtext,
}: {
  icon: string;
  text: string;
  subtext: string;
}) => (
  <View style={styles.weatherDetailItem}>
    <Icon name={icon} size={moderateScale(20)} color={Colors.primaryDark} />
    <Text style={styles.weatherDetailText}>{text}</Text>
    <Text style={styles.weatherDetailSubtext}>{subtext}</Text>
  </View>
);

export default WeatherDetailItem;

const styles = StyleSheet.create({
  weatherDetailItem: {
    alignItems: 'center',
  },
  weatherDetailText: {
    ...CommonStylesFn.text(4, Colors.primaryDark, Fonts.bold),
  },
  weatherDetailSubtext: {
    ...CommonStylesFn.text(2.75, Colors.primaryDark, Fonts.regular),
    color: Colors.primaryDark,
    textAlign: 'center',
  },
});
