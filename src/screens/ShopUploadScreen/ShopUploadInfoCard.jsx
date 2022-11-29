import React from 'react';
import { StyleSheet } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { Card, Text, TextInput } from 'react-native-paper';
import TextInputController from '../../components/TextInputController';
import { Colors } from '../../constants';

export default function ShopUploadInfoCard() {
  const { setFocus } = useFormContext();

  return (
    <Card mode="elevated" elevation={4} style={styles.container}>
      <Card.Content>
        <Text style={styles.text}>TITLE</Text>
        <TextInputController
          style={{ height: 30, fontSize: 12, lineHeight: 18 }}
          as={TextInput}
          mode="outlined"
          name="title"
          rules={{ required: true }}
          placeholder="상품의 제목을 입력해주세요"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            setFocus('price');
          }}
        />
        <Text style={styles.text}>PRICE</Text>
        <TextInputController
          style={{ height: 30, fontSize: 12, lineHeight: 18 }}
          as={TextInput}
          mode="outlined"
          name="price"
          keyboardType="numeric"
          rules={{ required: true }}
          placeholder="가격을 입력해주세요"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            setFocus('detail');
          }}
        />
        <Text style={styles.text}>DETAILS</Text>
        <TextInputController
          style={styles.details}
          as={TextInput}
          mode="outlined"
          name="detail"
          rules={{ required: true }}
          placeholder="상품에 대해 설명해주세요"
          blurOnSubmit={false}
          dense={true}
          multiline
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    color: Colors.ACCENT,
    marginTop: 5,
  },
  textinput: {},
  details: {
    height: 72,
    fontSize: 12,
    lineHeight: 18,
    paddingVertical: 2,
  },
});
