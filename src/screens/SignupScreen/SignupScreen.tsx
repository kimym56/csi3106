import React from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { useSetAtom } from 'jotai';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authAtom } from '../../atoms/auth';
import { useSignup } from '../../hooks/auth';
import SignupFormCard from './SignupFormCard';
import SignupResultCard from './SignupResultCard';

export default function SignupScreen() {
  const updateAuth = useSetAtom(authAtom);

  const { isLoading, data, mutate } = useSignup({
    onError: () => {
      ToastAndroid.show('이미 가입된 이메일이에요.', ToastAndroid.SHORT);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {data == null ? (
        <SignupFormCard
          loading={isLoading}
          onConfirm={(values) => {
            mutate({ ...values, weight: 0, height: 0 });
          }}
        />
      ) : (
        <SignupResultCard
          onConfirm={() => {
            updateAuth({ type: 'login', token: data.token });
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
});
