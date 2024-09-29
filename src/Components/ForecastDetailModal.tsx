import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import { moderateScale, scale, SCREEN_HEIGHT, verticalScale } from '../Utils/Responsive';
import { Colors } from '../Utils/Colors';
import { WeatherResponse } from '../ApiCalls/WeatherData';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Fonts } from '../Assets/Fonts/Fonts';
import moment from 'moment';

interface ForecastDetailModalProps {
  showModal: boolean;
  closeModal: () => void;
  backdropColor?: string;
  modalContainerStyle?: ViewStyle;
  forecastData?: WeatherResponse | null;
  selectedForecastIndex: number;
}

const ForecastDetailModal = ({
  showModal,
  closeModal,
  backdropColor,
  modalContainerStyle,
  forecastData,
  selectedForecastIndex,
}: ForecastDetailModalProps) => {
  console.log(selectedForecastIndex, 'selectedForecastIndex');
  console.log(forecastData, 'forecastData');
  const precipitation_sum = forecastData?.daily.precipitation_sum[selectedForecastIndex];
  const temperature_2m_max = forecastData?.daily.temperature_2m_max[selectedForecastIndex];
  const temperature_2m_min = forecastData?.daily.temperature_2m_min[selectedForecastIndex];
  const time = forecastData?.daily.time[selectedForecastIndex];
  const windspeed_10m_max = forecastData?.daily.windspeed_10m_max[selectedForecastIndex];
  const daily_units = forecastData?.daily_units;
  console.log(daily_units, 'daily_units');
  return (
    <ReactNativeModal
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      isVisible={showModal}
      style={[styles.modalContainer, modalContainerStyle]}
      onBackdropPress={closeModal}
      backdropColor={backdropColor}
      useNativeDriverForBackdrop={true}
      deviceHeight={SCREEN_HEIGHT}
    >
      <View style={styles.modalChildContainer}>
        <Text style={CommonStylesFn.text(3.5, Colors.primaryDark, Fonts.medium)}>
          {'Date :-'}
          {moment(time).format('DD/MM/YYYY')}
        </Text>
        <Text style={CommonStylesFn.text(3.5, Colors.primaryDark, Fonts.medium)}>
          {'Rain Precipitation :- '}
          {precipitation_sum}
          {daily_units?.precipitation_sum}
        </Text>
        <Text style={CommonStylesFn.text(3.5, Colors.primaryDark, Fonts.medium)}>
          {'Max Temp :- '}
          {temperature_2m_max}
          {daily_units?.temperature_2m_max}
        </Text>
        <Text style={CommonStylesFn.text(3.5, Colors.primaryDark, Fonts.medium)}>
          {'Min Temp :- '}
          {temperature_2m_min}
          {daily_units?.temperature_2m_min}
        </Text>
      </View>
    </ReactNativeModal>
  );
};

export default ForecastDetailModal;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
  },
  modalChildContainer: {
    alignItems: 'center',
    gap: verticalScale(5),
    backgroundColor: Colors.white,
    marginHorizontal: scale(15),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(15),
  },
});
