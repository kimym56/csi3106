import React from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputController from '../../components/TextInputController';
import { ScreenName } from '../../constants';
import { useLogin } from '../../hooks/auth';

interface Values {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit: _handleSubmit,
    setFocus,
  } = useForm<Values>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isLoading, mutate } = useLogin({
    onError() {
      ToastAndroid.show('이메일과 비밀번호를 다시 확인해주세요.', ToastAndroid.SHORT);
    },
  });

  const handleSubmit = _handleSubmit((values) => {
    mutate(values);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leadContainer}>
        <View style={styles.leadParagraph}>
          <Text style={styles.leadText}>오늘의 </Text>
          <Text style={[styles.leadText, styles.leadHighlight1]}>현명한 </Text>
          <Text style={styles.leadText}>소비자,</Text>
        </View>
        <View style={styles.leadParagraph}>
          <Text style={styles.leadText}>내일의 </Text>
          <Text style={[styles.leadText, styles.leadHighlight2]}>똑똑한 </Text>
          <Text style={styles.leadText}>판매자.</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInputController
          as={TextInput}
          control={control}
          mode="outlined"
          name="email"
          placeholder="이메일을 입력해주세요."
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            setFocus('password');
          }}
        />
        <TextInputController
          as={TextInput}
          control={control}
          mode="outlined"
          name="password"
          secureTextEntry={true}
          returnKeyType="done"
          placeholder="비밀번호를 입력해주세요."
          onSubmitEditing={handleSubmit}
        />
      </View>
      <Button
        style={styles.signupButton}
        onPress={() => {
          navigate(ScreenName.회원가입);
        }}
      >
        회원가입하기
      </Button>
      <Button style={styles.loginButton} mode="contained" disabled={isLoading} onPress={handleSubmit}>
        로그인
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  leadContainer: {
    marginTop: 100,
  },
  leadParagraph: {
    flexDirection: 'row',
  },
  leadText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  leadHighlight1: {
    color: '#6600FF',
  },
  leadHighlight2: {
    color: '#ED74CC',
  },
  inputContainer: {
    marginTop: 64,
  },
  signupButton: {
    marginTop: 80,
  },
  loginButton: {
    marginTop: 24,
  },
});
