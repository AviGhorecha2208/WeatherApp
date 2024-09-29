import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  searchParam: '',
  searchedLocations: [],
  selectedLocation: null
}

export const cityData = createSlice({
  name: 'CityData',
  initialState,
  reducers: {
    setSearchParam: (state, action) => {
      state.searchParam = action.payload
    },
    setSearchedLocations: (state, action) => {
      state.searchedLocations = action.payload
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload
    }
  }
})

export const {setSearchParam, setSearchedLocations, setSelectedLocation} = cityData.actions

export default cityData.reducer
