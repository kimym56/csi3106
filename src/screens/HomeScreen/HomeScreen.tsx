import React from 'react';
import { Button, Text, View } from 'react-native';
import { useSetAtom } from 'jotai';
import { authAtom } from '../../atoms/auth';

export default function HomeScreen() {
  const update = useSetAtom(authAtom);

  return (
    <View>
      <Button
        title="reset"
        onPress={() => {
          update({ type: 'logout' });
        }}
      />
      <Text>home</Text>
    </View>
  );
}
