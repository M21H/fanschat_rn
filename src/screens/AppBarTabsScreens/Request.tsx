import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { EmptyListView } from '~/ui';
import { sh } from '~/utils/scaler';

export const RequestsTab: React.VFC = () => (
  <FlatList
    data={[]}
    renderItem={() => null}
    contentContainerStyle={{ flexGrow: 1 }}
    ListEmptyComponent={<EmptyListView text="Not found users." containerStyle={styles.indicator} />}
  />
);

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    marginTop: -sh(50) - 1,
  },
});
