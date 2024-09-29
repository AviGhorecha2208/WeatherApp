import _ from 'lodash';

import { SearchCitiesApiResponse } from '../Interfaces/Network.d';
import APICall from '../Network/ApiCall';
import { NominatimUrl } from '../Utils/Const';

export interface City {
  name: string;
  latitude: number;
  longitude: number;
  place_id: number;
  country?: string;
}

const searchCities = async (cityName: string): Promise<City[] | null> => {
  try {
    const response = await APICall<SearchCitiesApiResponse[]>({
      method: 'get',
      url: NominatimUrl,
      payload: {
        q: cityName,
        format: 'json',
        limit: 100,
        addressdetails: 1,
      },
    });
    console.log('searchCities response', response.data);
    const cities: City[] = _.map(response?.data, (city) => {
      return {
        name: city.display_name,
        latitude: parseFloat(city.lat),
        longitude: parseFloat(city.lon),
        display_name: city.display_name,
        place_id: city.place_id,
      };
    });

    return cities;
  } catch (error) {
    console.error('Error searching for city:', error);
    return null;
  }
};

// const getCitiesLocation = async (cityNames: string[]): Promise<City[] | null> => {
//   try {
//     const cities: City[] = []

//     for (const cityName of cityNames) {
//       const response = await axios.get('https://nominatim.openstreetmap.org/search', {
//         params: {
//           q: cityName,
//           format: 'json',
//           limit: 1
//         },
//         headers: {
//           'User-Agent': 'React-Native-App' // Add a user-agent as recommended by the Nominatim API
//         }
//       })
//       console.log(response, 'responseresponse')
//       // Extract data from the response
//       if (response.data && response.data.length > 0) {
//         const cityData = response.data[0]
//         cities.push({
//           name: cityName,
//           latitude: parseFloat(cityData.lat),
//           longitude: parseFloat(cityData.lon)
//         })
//       }
//     }

//     return cities
//   } catch (error) {
//     console.error('Error fetching city data:', error)
//     return null
//   }
// }

export { searchCities };
