import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { Colors } from '../../constants';

export interface Props {
  onConfirm?: () => void;
}

export default function SignupResultCard({ onConfirm }: Props) {
  return (
    <Card style={styles.container} mode="elevated" elevation={5}>
      <Card.Content>
        <Text style={styles.titleText}>환영합니다!</Text>
        <Button style={styles.confirmButton} mode="contained-tonal" onPress={onConfirm}>
          로그인하러 가기
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ACCENT,
    paddingVertical: 30,
  },
  titleText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  confirmButton: {
    marginTop: 24,
  },
});
