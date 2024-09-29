import {store} from '../Store/Store'

export const getAccessToken = () => {
  return store.getState().GeneralData.data || ''
}
