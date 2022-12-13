import React, { useMemo, useState } from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { IMAGE_URL_PREFIX } from '../../constants';

export type Props = OwnProps & ImageProps;

interface OwnProps {
  path: string;
}

const enum Status {
  INIT,
  LOADING,
  ERROR,
  SUCCESS,
}

export default function MarketImage({ style, path, ...props }: Props) {
  const [status, setStatus] = useState(Status.INIT);

  const source = useMemo(() => {
    return { uri: IMAGE_URL_PREFIX.replace(/\/$/, '') + '/' + path.replace(/^\//, '') };
  }, [path]);

  return (
    <>
      {status === Status.LOADING && <ActivityIndicator style={[styles.indicator, style]} />}
      {status === Status.ERROR && (
        <View style={[styles.indicator, style]}>
          <Icon name="alert-triangle" />
        </View>
      )}
      <Image
        style={style}
        source={source}
        onLoadStart={() => setStatus(Status.LOADING)}
        onLoadEnd={() => setStatus(Status.SUCCESS)}
        onError={() => setStatus(Status.ERROR)}
        {...props}
      />
    </>
  );
}

const styles = StyleSheet.create({
  indicator: {
    alignSelf: 'center',
  },
});
