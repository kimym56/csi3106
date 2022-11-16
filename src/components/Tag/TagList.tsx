import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export type Props = ViewProps;

export default function TagList({ style, children, ...props }: Props) {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: -4,
  },
});
