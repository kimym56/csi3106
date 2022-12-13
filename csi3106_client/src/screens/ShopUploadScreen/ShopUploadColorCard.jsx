import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { Card } from 'react-native-paper';
import { Colors } from '../../constants';

export default function ShopUploadColorCard() {
  const { field } = useController({ name: 'color' });

  return (
    <Card mode="elevated" elevation={4} style={styles.container}>
      <Card.Content>
        <Text style={styles.text}>COLOR PICK</Text>
        <View style={styles.colorContainer}>
          {Object.entries(palette).map(([key, color]) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                field.onChange(key);
              }}
              style={[styles.color, { backgroundColor: color }, field.value === key && styles.selected]}
            />
          ))}
        </View>
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
  colorContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  color: {
    height: 30,
    width: 30,
    borderRadius: 15,
    margin: 10,
  },
  selected: {
    borderColor: Colors.ACCENT,
    borderWidth: 4,
  },
});

const palette = {
  red: '#C84B47',
  orange: '#E38B4B',
  yellow: '#FDF390',
  brown: '#6E4217',
  ibory: '#F4ECC7',
  green: '#54A440',
  blue: '#516DC6',
  purple: '#A466AA',
  pink: '#DD91B8',
  black: '#000000',
  gray: '#B0B0B0',
  white: '#FFFFFF',
};
