import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, IconButton } from 'react-native-paper';
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
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topText}>추천 정확도를 올리기 위해 한 가지 상품만 올려주세요.</Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.frontText}>FRONT</Text>
            <View style={styles.leadcontainer}>
              <ImageUploadInput
                style={image ? { ...styles.imageContainer, marginBottom: 10 } : styles.imageContainer}
                onSuccess={setImage}
              />
              {image ? (
                <ImageTagInput imagePath={image?.imagePath} values={tags} onChange={setTags} />
              ) : (
                <IconButton icon={'plus'} size={22} iconColor={'#6600ff'} style={styles.plus} />
              )}
            </View>
          </View>
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
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    width: 328,
    height: 420,
    alignContent: 'center',
  },
  topContainer: {
    height: 48,
    backgroundColor: 'rgba(182, 0, 255, 0.2)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  topText: {
    color: '#6600ff',
    fontWeight: '400',
    fontSize: 12,
    fontFamily: 'Noto-Sans',
    marginTop: 10,
  },
  bottomContainer: {
    height: 386,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 12,
    shadowOpacity: 1,
    elevation: 5,
    top: -12,
  },
  frontText: {
    color: '#6600ff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 22,
    marginTop: 40,
  },
  leadcontainer: {
    marginHorizontal: 20,
    marginVertical: 12,
  },
  imageContainer: {
    width: '100%',
    height: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  plus: {
    alignSelf: 'center',
  },
  button: {
    height: 48,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(102, 0, 255, 0.8)',
  },
});
