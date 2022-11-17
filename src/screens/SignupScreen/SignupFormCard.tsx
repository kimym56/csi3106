import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';
import TextInputController from '../../components/TextInputController';
import { Colors } from '../../constants';

export interface Props {
  loading?: boolean;
  defaultValues?: Partial<Values>;
  onConfirm?: (values: Values) => void;
}

export interface Values {
  email: string;
  name: string;
  password: string;
}

export default function SignupFormCard({ loading, defaultValues, onConfirm }: Props) {
  const navigation = useNavigation();
  const { control, setFocus, handleSubmit } = useForm<Values>({ defaultValues });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleConfirm = handleSubmit(
    (values: Values) => {
      onConfirm?.(values);
    },
    () => {
      ToastAndroid.show('올바른 정보를 입력해주세요.', ToastAndroid.SHORT);
    },
  );

  return (
    <Card mode="elevated" elevation={5}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <IconButton icon="arrow-left" iconColor={Colors.ACCENT} onPress={() => navigation.goBack()} />
          <Text style={styles.titleText}>회원가입</Text>
          <View style={styles.headerPlaceholder} />
        </View>
        <View style={styles.inputContainer}>
          <TextInputController
            as={TextInput}
            control={control}
            mode="outlined"
            name="email"
            rules={{ required: true }}
            placeholder="이메일 또는 전화번호를 입력해주세요."
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              setFocus('name');
            }}
          />
          <TextInputController
            as={TextInput}
            control={control}
            mode="outlined"
            name="name"
            rules={{ required: true }}
            placeholder="아이디를 입력해주세요."
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
            rules={{ required: true }}
            secureTextEntry={secureTextEntry}
            returnKeyType="done"
            placeholder="비밀번호를 입력해주세요."
            right={
              <TextInput.Icon
                icon={secureTextEntry ? 'eye' : 'eye-off'}
                onPress={() => setSecureTextEntry((prevState) => !prevState)}
              />
            }
            onSubmitEditing={handleConfirm}
          />
        </View>
        <Button
          style={styles.confirmButton}
          mode="contained"
          loading={loading}
          disabled={loading}
          onPress={handleConfirm}
        >
          다음
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    marginTop: 28,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.ACCENT,
  },
  headerPlaceholder: {
    width: 56,
    alignSelf: 'stretch',
  },
  inputContainer: {
    marginTop: 56,
    marginHorizontal: 16,
  },
  confirmButton: {
    marginTop: 64,
    marginHorizontal: 16,
  },
});
