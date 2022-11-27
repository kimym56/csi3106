import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import ImageTagInput from '../../components/ImageTagInput';
import ImageUploadInput from '../../components/ImageUploadInput';
import { ScreenName } from '../../constants';
import { useStyleCreate } from '../../hooks/style';

export default function StyleUploadScreen() {
  const { navigate, goBack } = useNavigation();

  const [image, setImage] = useState();
  const [tags, setTags] = useState();

  const create = useStyleCreate({
    onSuccess(data) {
      goBack();
      navigate(ScreenName.스타일_상세, { styleId: data.id });
    },
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.leadcontainer}>
          <ImageUploadInput style={styles.imageContainer} onSuccess={setImage} />
          <ImageTagInput imagePath={image?.imagePath} values={tags} onChange={setTags} />
        </View>
        <Button
          style={styles.button}
          contentStyle={{ height: '100%' }}
          mode={tags ? 'contained' : 'outlined'}
          disabled={tags == null}
          onPress={() => {
            create.mutate({ imagePath: image?.imagePath, size: 'L', type: tags });
          }}
        >
          <Text style={{ fontSize: 18, height: '100%' }}>Style 등록하기</Text>
        </Button>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    flex: 1,
    justifyContent: 'space-between',
  },
  leadcontainer: {
    width: '100%',
    height: '60%',
  },
  imageContainer: {
    width: '100%',
    height: '80%',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: '5%',
  },
  button: {
    height: '10%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
