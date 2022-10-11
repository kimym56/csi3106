import React from 'react';
import { Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <TextInput placeholder="email" />
      <TextInput placeholder="password" secureTextEntry={true} textContentType="password" />
      <Button title="로그인" />
    </SafeAreaView>
  );
}
