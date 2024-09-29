import { Images } from '../Assets/Images/Images';

export const mobileRegex = /^([0-9]{10})$/;
export const REFRESH_TOKEN_ATTEMPT = 3;
export const BUNDLE_ID = 'com.weatherapp';
// export const AccuweatherApiKey = '5ek1hXsVQRUbeHjKOGV3oaubTk2lMSqa'
export const MeteoUrl = 'https://api.open-meteo.com/v1/forecast';
export const NominatimUrl = 'https://nominatim.openstreetmap.org/search';

export enum Screens {
  Home = 'Home',
  StartupScreen = 'StartupScreen',
  About = 'About',
  Drawer = 'Drawer',
  BottomTab = 'BottomTab',
}

export enum ToastType {
  success = 'success',
  error = 'error',
  info = 'info',
}

export const BottomTabs = [
  {
    index: 0,
    label: 'Home',
    screen: Screens.Home,
    activeIcon: Images.home,
    inActiveIcon: Images.home,
  },
  {
    index: 1,
    label: 'About',
    screen: Screens.About,
    activeIcon: Images.about,
    inActiveIcon: Images.about,
  },
];

export const LondonCords = { latitude: 51.5074, longitude: -0.1278, name: 'London, UK' };
