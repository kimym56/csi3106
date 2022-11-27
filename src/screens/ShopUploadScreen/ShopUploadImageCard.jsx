import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';
import ImageTagInput from '../../components/ImageTagInput';
import ImageUploadInput from '../../components/ImageUploadInput';
import { Colors } from '../../constants';

export default function ShopUploadImageCard({ setValue, watch }) {
  return (
    <Card mode="elevated" elevation={4} style={styles.container}>
      <Card.Content>
        <Text style={styles.text}>FRONT</Text>
        <ImageUploadInput
          style={styles.imageContainer}
          onSuccess={(path) => {
            setValue('frontImagePath', path.imagePath);
          }}
        />
        <ImageTagInput
          imagePath={watch('frontImagePath')}
          values={watch('type')}
          onChange={(type) => {
            setValue('type', type);
          }}
        />

        <Text style={styles.text}>BACK</Text>
        <ImageUploadInput
          style={styles.imageContainer}
          onSuccess={(path) => {
            setValue('backImagePath', path.imagePath);
          }}
        />

        <Text style={styles.text}>DETAIL</Text>
        <ImageUploadInput
          style={styles.imageContainer}
          onSuccess={(path) => {
            setValue('detailImagePath', path.imagePath);
          }}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    flex: 1,
  },
  text: {
    color: Colors.ACCENT,
    marginTop: 16,
    marginBottom: 8,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
});
