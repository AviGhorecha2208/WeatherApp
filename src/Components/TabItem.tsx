import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Colors } from '../Utils/Colors';
import { moderateScale, scale, verticalScale } from '../Utils/Responsive';
import { CommonStylesFn } from '../Utils/CommonStyles';

const TabItem = ({ item, index, isSelected, onTabClickListener, tabWidth }) => {
  return (
    <Animated.View>
      <TouchableOpacity
        accessibilityLabel={`Tab-${index}`}
        activeOpacity={0.8}
        style={[styles.toTabContainer, { width: tabWidth }]}
        onPress={() => {
          onTabClickListener(item, index);
        }}
      >
        <View style={isSelected && styles.tItem}>
          <Image
            style={[styles.iIcon, isSelected && { tintColor: Colors.white }]}
            source={isSelected ? item.activeIcon : item.inActiveIcon}
          />
          {isSelected && <Text style={styles.tTitle}>{item.label}</Text>}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toTabContainer: {
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    tintColor: Colors.primary,
  },
  tItem: {
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    gap: scale(12),
    borderRadius: 100,
  },
  tTitle: {
    ...CommonStylesFn.text(2.75, Colors.white),
  },
});

export default TabItem;
