import {HttpStatusCode} from 'axios'

export interface CommonApiResponse<T> {
  data: T;
  status_code: HttpStatusCode;
  message: string;
  status: 'success' | 'failure';
}
interface Address {
  village: string;
  municipality: string;
  county: string;
  state: string;
  ISO3166_2_lvl4: string;
  postcode: string;
  country: string;
  country_code: string;
}

export interface LocationData {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}

export interface SearchCitiesApiResponse {
  display_name: string;
  lat: string;
  lon: string;
  data: LocationData[];
  status: number;
  place_id: number;
}
