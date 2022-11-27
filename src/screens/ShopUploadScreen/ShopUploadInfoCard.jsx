import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, TextInput } from 'react-native-paper';
import TextInputController from '../../components/TextInputController';
import { Colors } from '../../constants';

export default function ShopUploadInfoCard({ control, setFocus }) {
  return (
    <Card mode="elevated" elevation={4} style={styles.container}>
      <Card.Content>
        <Text style={styles.text}>Title</Text>
        <TextInputController
          as={TextInput}
          control={control}
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
        <Text style={styles.text}>Price</Text>
        <TextInputController
          as={TextInput}
          control={control}
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
        <Text style={styles.text}>Details</Text>
        <TextInputController
          style={styles.details}
          as={TextInput}
          control={control}
          mode="outlined"
          name="detail"
          rules={{ required: true }}
          placeholder="상품에 대해 설명헤주세요"
          returnKeyType="next"
          blurOnSubmit={false}
          dense={true}
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
    height: 100,
    paddingVertical: 2,
  },
});
