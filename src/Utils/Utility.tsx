import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import _ from 'lodash';
import moment from 'moment';

import { Fonts } from '../Assets/Fonts/Fonts';
import { ErrorWithMessage } from '../Interfaces/CommonTypes';
import { Colors } from './Colors';
import { CommonStylesFn } from './CommonStyles';
import { ToastType } from './Const';
import { scale, verticalScale, widthPx } from './Responsive';

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={{ borderLeftColor: Colors.success, height: verticalScale(70), width: widthPx(80) }}
      contentContainerStyle={{ paddingHorizontal: scale(10) }}
      text1Style={[
        CommonStylesFn.text(3, Colors.black, Fonts.bold),
        Platform.OS === 'ios' && { marginBottom: verticalScale(5) },
      ]}
      text2Style={CommonStylesFn.text(3.5, Colors.success)}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={{ borderLeftColor: Colors.error, height: verticalScale(70), width: widthPx(80) }}
      contentContainerStyle={{
        paddingHorizontal: scale(10),
      }}
      text1Style={[
        CommonStylesFn.text(3, Colors.black, Fonts.bold),
        Platform.OS === 'ios' && { marginBottom: verticalScale(5) },
      ]}
      text2Style={CommonStylesFn.text(3.5, Colors.error)}
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text2NumberOfLines={2}
      style={{ borderLeftColor: Colors.black, height: verticalScale(70) }}
      contentContainerStyle={{ paddingHorizontal: scale(10) }}
      text1Style={[
        CommonStylesFn.text(3, Colors.black, Fonts.bold),
        Platform.OS === 'ios' && { marginBottom: verticalScale(5) },
      ]}
      text2Style={CommonStylesFn.text(3, Colors.black, Fonts.bold)}
    />
  ),
};

export const showToast = (type: ToastType, title: string, subTitle?: string) => {
  return Toast.show({
    type,
    text1: title ?? 'Something went wrong',
    ...(subTitle && { text2: subTitle }),
  });
};

const getWeatherIcon = (temperature: number, precipitation: number, windSpeed: number) => {
  if (precipitation > 20) return 'thunderstorm-outline';
  if (precipitation > 5) return 'rainy-outline';
  if (precipitation > 0) return 'rainy-outline';
  if (windSpeed > 30) return 'wind-outline';

  if (temperature >= 30) return 'sunny-outline';
  if (temperature >= 20) return 'partly-sunny-outline';
  if (temperature >= 15) return 'cloudy-outline';
  if (temperature >= 10) return 'cloud-outline';
  if (temperature >= 5) return 'partly-sunny-outline';
  if (temperature >= 0) return 'snow-outline';
  return 'thermometer-outline';
};

export const Utility = {
  toastConfig,
  showToast,
  getWeatherIcon,
};
