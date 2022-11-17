import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDelayedEffect } from './useDelayedEffect';

export interface Props {
  delay?: number;
}

export default function SplashScreen({ delay = 1000 }: Props) {
  const [visible, setVisible] = useState(false);

  useDelayedEffect(() => {
    setVisible(true);
  }, delay);

  return visible ? (
    <LinearGradient
      style={styles.container}
      colors={['#6600FF', '#A467FF', '#CFAFFF', '#F1E8FF', '#FFFFFF']}
      locations={[0.0386, 0.2648, 0.5177, 0.8405, 1]}
    >
      <Image style={styles.logo} source={require('./logo.png')} />
    </LinearGradient>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 215,
    height: 50,
  },
});
