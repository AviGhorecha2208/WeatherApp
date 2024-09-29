import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import debounce from 'lodash/debounce';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';

import { City, searchCities } from '../../ApiCalls/CityData';
import { FetchWeatherData } from '../../ApiCalls/WeatherData';
import { Fonts } from '../../Assets/Fonts/Fonts';
import CityItem from '../../Components/CityItem';
import CloudAnimation from '../../Components/CloudAnimation';
import DailyForecastItem from '../../Components/DailyForecastItem';
import HomeScreenShimmer from '../../Components/Shimmers/HomeScreenShimmer';
import WeatherDetailItem from '../../Components/WeatherDetailItem';
import { useAppSelector } from '../../Hooks/StoreHooks';
import { setSelectedLocation, setWeatherData } from '../../Store/weatherSlice';
import { Colors } from '../../Utils/Colors';
import { CommonStylesFn } from '../../Utils/CommonStyles';
import { heightPx, moderateScale, scale, verticalScale, widthPx } from '../../Utils/Responsive';
import { Utility } from '../../Utils/Utility';
import { toggleDrawer } from '../../Navigation/NavigationServices';
import { getCityName } from '../../ApiCalls/CityName';
import ForecastDetailModal from '../../Components/ForecastDetailModal';
import { LondonCords } from '../../Utils/Const';

const Home = () => {
  const dispatch = useDispatch();
  const { weatherData, selectedLocation } = useAppSelector((state) => state.Weather);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<City | null>(null);
  const [selectedForecastIndex, setSelectedForecastIndex] = useState<number>(0);
  const [showForecastDetailModal, setShowForecastDetailModal] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    fetchWeatherData(userLocation || (LondonCords as City));
  }, [userLocation]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Weather App Location Permission',
            message: 'Weather App needs access to your location to show accurate weather data.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          console.log('Location permission denied');
          fetchWeatherData(LondonCords as City);
        }
      } catch (err) {
        console.warn(err);
        fetchWeatherData(LondonCords as City);
      }
    }
  };

  const getLocation = () => {
    console.log('Getting location');
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const cityData = await getCityName(latitude, longitude);
        const userCity: City = {
          place_id: 0,
          latitude,
          longitude,
          name: cityData.name,
          country: cityData.country,
        };
        setUserLocation(userCity);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const toggleLocationModal = () => {
    bottomSheetRef.current?.expand();
  };

  const fetchWeatherData = async (city: City) => {
    setIsLoading(true);
    try {
      const data = await FetchWeatherData(city.latitude, city.longitude);
      if (data) {
        dispatch(setWeatherData(data));
        dispatch(setSelectedLocation(city));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length > 2) {
        setIsSearching(true);
        const results = await searchCities(query);
        if (results) {
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300),
    [],
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleCitySelect = async (city: City) => {
    bottomSheetRef.current?.close();
    await fetchWeatherData(city);
  };

  const toggleForecastDetailModal = () => {
    setShowForecastDetailModal(!showForecastDetailModal);
  };

  const renderCityItem = ({ item }: { item: any }) => {
    return <CityItem item={item} handleCitySelect={handleCitySelect} />;
  };

  const renderSearchResults = () => {
    if (isSearching) {
      return (
        <View style={styles.searchResultsShimmerContainer}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <ShimmerPlaceholder
              key={index}
              LinearGradient={LinearGradient}
              style={styles.searchResultShimmer}
            />
          ))}
        </View>
      );
    }

    return (
      <BottomSheetFlatList
        data={searchResults}
        keyExtractor={(item) => `${item.place_id}`}
        renderItem={renderCityItem}
        contentContainerStyle={styles.cityList}
      />
    );
  };

  const renderWeatherContent = () => {
    if (isLoading) {
      return <HomeScreenShimmer />;
    }

    if (!weatherData) {
      return (
        <View style={styles.loaderContainer}>
          <Text style={styles.loaderText}>{'No data found'}</Text>
        </View>
      );
    }

    return (
      <View>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>{`${Math.round(
            weatherData.daily?.temperature_2m_max[0],
          )}°C`}</Text>
          <View style={styles.minMaxContainer}>
            <Text style={styles.minMaxText}>{`↑ ${Math.round(
              weatherData.daily?.temperature_2m_max[0],
            )}°`}</Text>
            <Text style={styles.minMaxText}>{`↓ ${Math.round(
              weatherData.daily?.temperature_2m_min[0],
            )}°`}</Text>
          </View>
        </View>
        <View style={styles.weatherDetailsContainer}>
          <WeatherDetailItem
            icon={'rainy'}
            text={`${weatherData.daily?.precipitation_sum[0]} mm`}
            subtext={'Precipitation'}
          />
          <WeatherDetailItem
            icon={'speedometer'}
            text={`${Math.round(weatherData.daily?.windspeed_10m_max[0])} km/h`}
            subtext={'Max Wind Speed'}
          />
          <WeatherDetailItem
            icon={'thermometer'}
            text={`${weatherData.elevation} m`}
            subtext={'Elevation'}
          />
        </View>
        <View style={styles.whiteContainer}>
          <Text style={styles.forecastTitle}>{'7-Day Forecast'}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.slForecastContainer}
          >
            {weatherData.daily.time.slice(1, 6).map((time, index) => (
              <DailyForecastItem
                key={index}
                onPressForecastItem={() => {
                  setSelectedForecastIndex(index);
                  toggleForecastDetailModal();
                }}
                date={moment(time).format('ddd')}
                icon={Utility.getWeatherIcon(
                  Math.round(weatherData.daily.temperature_2m_max[index]),
                  weatherData.daily.precipitation_sum[index],
                  weatherData.daily.windspeed_10m_max[index],
                )}
                maxTemp={`${Math.round(weatherData.daily.temperature_2m_max[index])}°`}
                minTemp={`${Math.round(weatherData.daily.temperature_2m_min[index])}°`}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  const renderMainContent = () => (
    <LinearGradient
      colors={[Colors.primaryLight, Colors.primary, Colors.primaryDark]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps={'always'}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Icon name={'menu'} size={24} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationContainer} onPress={toggleLocationModal}>
            <Icon name={'location-outline'} size={20} color={Colors.white} />
            <Text style={styles.locationText}>
              {selectedLocation ? selectedLocation?.name : 'London, UK'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.dateText}>{moment().format('ddd, MMM D h:mm:ss A')}</Text>
        <CloudAnimation />
        {renderWeatherContent()}
      </ScrollView>
    </LinearGradient>
  );

  const renderBottomSheet = () => (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['25%', '50%', '75%']}
      enablePanDownToClose={true}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}
      style={styles.bottomSheet}
    >
      <View style={styles.bottomSheetContent}>
        <Text style={styles.bottomSheetTitle}>{'Search Cities'}</Text>
        <View style={styles.searchInputContainer}>
          <Icon name={'search-outline'} size={20} color={Colors.grey} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={'Enter city name'}
            placeholderTextColor={Colors.grey}
            value={searchQuery}
            keyboardType='default'
            onChangeText={handleSearch}
          />
        </View>
        <LinearGradient
          colors={[Colors.background, Colors.primary]}
          style={styles.bottomGradient}
        />
        {renderSearchResults()}
      </View>
    </BottomSheet>
  );

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        {renderMainContent()}
        {renderBottomSheet()}
        {showForecastDetailModal && (
          <ForecastDetailModal
            forecastData={weatherData}
            selectedForecastIndex={selectedForecastIndex}
            showModal={showForecastDetailModal}
            closeModal={toggleForecastDetailModal}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    height: heightPx(100),
    width: widthPx(100),
    backgroundColor: Colors.primary,
  },
  safeArea: {
    height: heightPx(100),
    width: widthPx(100),
  },
  container: {
    height: heightPx(100),
    width: widthPx(100),
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    maxWidth: widthPx(70),
    ...CommonStylesFn.text(4, Colors.white, Fonts.medium),
    marginLeft: scale(5),
  },
  dateText: {
    textAlign: 'right',
    ...CommonStylesFn.text(3, Colors.white, Fonts.medium),
    marginTop: verticalScale(10),
  },
  temperatureContainer: {
    backgroundColor: Colors.white,
    marginTop: verticalScale(20),
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },
  temperatureText: {
    ...CommonStylesFn.text(7.2, Colors.primaryDark, Fonts.medium),
  },
  weatherCondition: {
    ...CommonStylesFn.text(1.8, Colors.primaryDark, Fonts.medium),
  },
  minMaxContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },
  minMaxText: {
    ...CommonStylesFn.text(3.5, Colors.primaryDark, Fonts.medium),
    marginHorizontal: scale(10),
  },
  weatherDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.overlayWhite70,
    borderRadius: moderateScale(15),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(20),
  },
  whiteContainer: {
    backgroundColor: Colors.overlayWhite40,
    alignItems: 'center',
    borderRadius: moderateScale(15),
    marginTop: verticalScale(20),
    padding: moderateScale(20),
    gap: moderateScale(20),
  },
  forecastTitle: {
    ...CommonStylesFn.text(3.5, Colors.white, Fonts.medium),
    marginBottom: verticalScale(5),
  },
  slForecastContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  bottomSheetBackground: {
    backgroundColor: Colors.background,
  },
  bottomSheetContent: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: Colors.background,
  },
  bottomSheetTitle: {
    ...CommonStylesFn.text(4, Colors.black, Fonts.medium),
    marginBottom: verticalScale(16),
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(12),
    marginBottom: verticalScale(16),
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: verticalScale(48),
    fontSize: 16,
    color: Colors.black,
  },
  cityList: {
    paddingBottom: verticalScale(30),
  },
  temperatureShimmer: {
    width: 150,
    height: 80,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: verticalScale(10),
  },
  searchResultsShimmerContainer: {
    paddingHorizontal: scale(16),
  },
  searchResultShimmer: {
    width: '100%',
    height: verticalScale(50),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(10),
  },
  bottomSheet: {
    elevation: 10,
  },
  bottomSheetIndicator: {
    backgroundColor: Colors.grey,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: Colors.white,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(80),
  },
});
