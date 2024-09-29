import APICall from '../Network/ApiCall';

export const getCityName = async (latitude: number, longitude: number) => {
  try {
    const response = await APICall({
      method: 'get',
      url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    });

    const data = response.data as { city?: string; locality?: string; countryName: string };
    return { name: data.city || data.locality || 'Unknown', country: data.countryName };
  } catch (error) {
    console.error('Error fetching city name:', error);
    throw error;
  }
};
