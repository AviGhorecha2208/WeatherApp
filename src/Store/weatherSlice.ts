import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {City} from '../ApiCalls/CityData'
import {WeatherResponse} from '../ApiCalls/WeatherData'

interface WeatherState {
  weatherData: WeatherResponse | null;
  selectedLocation: City | null;
}

const initialState: WeatherState = {
  weatherData: null,
  selectedLocation: null
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherResponse>) => {
      state.weatherData = action.payload
    },
    setSelectedLocation: (state, action: PayloadAction<City>) => {
      state.selectedLocation = action.payload
    }
  }
})

export const {setWeatherData, setSelectedLocation} = weatherSlice.actions
export default weatherSlice.reducer
