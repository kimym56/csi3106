import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSetAtom } from 'jotai';
import Toast from 'react-native-toast-message';
import { authAtom } from '../../atoms/auth';
import { client } from '../../utils/network';

export default function SignupScreen(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [height, setHeight] = useState();
  const [size, setSize] = useState();

  const checkBlank = () => {
    return email !== undefined && password !== undefined && height !== undefined && size !== undefined;
  };
  const update = useSetAtom(authAtom);

  const handleSignup = async () => {
    if (!checkBlank()) {
      Toast.show({
        type: 'error',
        text1: 'Blank fields!',
      });
    } else if (password !== rePassword) {
      Toast.show({
        type: 'error',
        text1: 'Password does not match RePassword.',
      });
    } else {
      try {
        const res = await client.post('api/v1/auth/signup', {
          json: {
            email,
            password,
          },
        });
        const { token } = await res.json();
        update({ type: 'login', token });
      } catch (error) {
        if (error.response.status === 500) {
          Toast.show({
            type: 'error',
            text1: 'Duplicate email.',
          });
        } else {
          throw new Error('Something went wrong on API server!');
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>회원가입</Text>
      </View>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.labelText}>이메일</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="이메일" value={email} onChangeText={(text) => setEmail(text)} />
        </View>
        <Text style={styles.labelText}>비밀번호</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="비밀번호"
            value={password}
            secureTextEntry={true}
            textContentType="password"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Text style={styles.labelText}>비밀번호 재확인</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="비밀번호 재확인"
            value={rePassword}
            secureTextEntry={true}
            onChangeText={(text) => setRePassword(text)}
          />
        </View>
        <Text style={styles.labelText}>키</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="키" value={height} onChangeText={(text) => setHeight(text)} />
        </View>
        <Text style={styles.labelText}>옷 사이즈</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="옷사이즈" value={size} onChangeText={(text) => setSize(text)} />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            handleSignup();
          }}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  topBar: {
    marginTop: 12, //  58
    paddingHorizontal: 25,
    // borderWidth: 1,
    // flexDirection: 'row',
    // backgroundColor: 'rgba(100,100,100,0.15)',
    // justifyContent: 'center',
    // alignItems:'center',
    // position: 'absolute',
    // height: 44,
    width: 30,
    // margin: 14,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // // borderWidth:1,
    // // backgroundColor:'black'
  },
  logoContainer: {
    // borderWidth:1,
    justifyContent: 'center',
    // alignSelf: 'center',
    paddingLeft: 26,
    marginTop: 40,
  },
  logo: {
    fontWeight: '600',
    fontSize: 24,
    color: 'black',
  },
  labelText: {
    // borderWidth: 1,
    // flex: 1,
    height: 30,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
  },
  inputContainer: {
    borderWidth: 1,
    // borderColor: '#BCBCBC',
    // borderRadius: 3,
    // marginTop: 4,
    // padding: 12,
    // width: 338,
    // height: 42,
    // alignSelf: 'center',
    // justifyContent: 'center',
  },
  serviceContainer: {
    flexDirection: 'column',
    marginTop: 22,
    // borderWidth:1
  },
  checkbox: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: 18,
    height: 18,
  },
  serviceText1: {
    marginLeft: 6,
    fontSize: 12,
    color: '#7E7E7E',
    fontWeight: '600',
  },
  serviceText2: {
    fontWeight: '500',
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#7E7E7E',
  },
  serviceText3: {
    marginTop: 10,
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontSize: 12,
    color: '#7E7E7E',
  },
  mainContainer: {
    marginTop: 20,
    // borderWidth: 1,
    height: 300,
    alignSelf: 'center',
    // alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#D5D5D5',
    width: 338,
    height: 42,
    marginTop: 24,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 15,
    color: 'white',
  },
  subLabelText: {
    fontWeight: '500',
    fontSize: 15,
    color: '#BCBCBC',
  },
});
