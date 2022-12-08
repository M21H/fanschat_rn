import React from 'react';
import { StyleProp, ViewProps } from 'react-native';

import { Skeleton } from '~/ui';

type Props = {
  height?: number;
  width: number;
  style?: StyleProp<ViewProps>;
};

export const AvatarSkeleton: React.VFC<Props> = ({ height, width, style }) => {
  return <Skeleton height={height} width={width} style={style} />;
};
