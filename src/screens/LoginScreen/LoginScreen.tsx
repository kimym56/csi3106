import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import TextInputController from '../../components/TextInputController';
import { ScreenName } from '../../constants';
import { useLogin } from './useLogin';

interface Values {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const { navigate } = useNavigation();

  const { control, handleSubmit } = useForm<Values>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isLoading, mutate } = useLogin({
    onError() {
      Toast.show({
        type: 'error',
        text1: '로그인에 실패했습니다.',
        text2: '이메일과 비밀번호를 다시 확인해주세요.',
      });
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <TextInputController control={control} name="email" placeholder="email" />
      <TextInputController
        control={control}
        name="password"
        placeholder="password"
        secureTextEntry={true}
        textContentType="password"
      />
      <Button
        title="로그인"
        disabled={isLoading}
        onPress={handleSubmit((values) => {
          mutate(values);
        })}
      />
      <Button
        title="회원가입"
        onPress={() => {
          navigate(ScreenName.회원가입);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
