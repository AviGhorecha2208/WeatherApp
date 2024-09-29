import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Colors } from '../Utils/Colors';
import { CommonStylesFn } from '../Utils/CommonStyles';

const CityItem = ({
  item,
  handleCitySelect,
}: {
  item: any;
  handleCitySelect: (item: any) => void;
}) => {
  return (
    <TouchableOpacity style={styles.cityItem} onPress={() => handleCitySelect(item)}>
      <Text style={CommonStylesFn.text()}>{item.display_name}</Text>
      <Text style={CommonStylesFn.text()}>{item.country}</Text>
    </TouchableOpacity>
  );
};

export default CityItem;

const styles = StyleSheet.create({
  cityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cityCountry: {
    fontSize: 14,
    color: Colors.grey,
  },
});
