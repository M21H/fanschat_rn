import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SIZES } from '~/constants/app';
import { IFeedSetup } from '~/modules/feed/types';
import { Text } from '~/ui';

type Props = {
  navigate: () => void;
  item: IFeedSetup;
  activeFilters: number[];
  addToFilters: (index: number) => void;
  containerStyles?: StyleProp<ViewStyle>;
};

export const Section: React.VFC<Props> = ({
  navigate,
  item,
  activeFilters,
  addToFilters,
  containerStyles,
}) => {
  return (
    <View style={containerStyles}>
      <View style={styles.title}>
        <Text font="BOLD" size={18} color={item.titleColor}>
          {item.title}
        </Text>
        <TouchableOpacity onPress={navigate}>
          <Text font="SEMIBOLD" size={14} color={item.seeAllColor}>
            SEE ALL
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filtering}>
        {item.filters.map((filter, index) => (
          <TouchableOpacity key={`${filter}_${index}`} onPress={() => addToFilters(index)}>
            <Text
              font="SEMIBOLD"
              color={activeFilters.includes(index) ? item.filterSelectedColor : item.filterColor}
              style={{ marginRight: SIZES.padding / 2 }}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filtering: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});
