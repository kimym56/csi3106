import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button, Dialog, IconButton, Paragraph, Portal } from 'react-native-paper';
import { ParamList, ScreenName } from '../../constants';
import { useStyleDelete } from '../../hooks/style';

export interface Props {
  tintColor?: string;
  canGoBack: boolean;
}

export default function HeaderRight({ tintColor }: Props) {
  const navigate = useNavigation();
  const { params } = useRoute<RouteProp<ParamList, ScreenName.스타일_상세>>();
  const [isModalVisible, setModalVisible] = useState(false);

  const { isLoading, mutate } = useStyleDelete({
    onSuccess() {
      navigate.goBack();
    },
    onError() {
      ToastAndroid.show('오류가 발생했습니다.', ToastAndroid.SHORT);
    },
  });

  return (
    <>
      <IconButton icon="trash" iconColor={tintColor} size={20} onPress={() => setModalVisible(true)} />
      <Portal>
        <Dialog visible={isModalVisible} onDismiss={() => setModalVisible(false)}>
          <Dialog.Title>style 삭제</Dialog.Title>
          <Dialog.Content>
            <Paragraph>정말로 이 style을 삭제하시겠어요?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button disabled={isLoading} onPress={() => setModalVisible(false)}>
              아니오
            </Button>
            <Button loading={isLoading} disabled={isLoading} onPress={() => mutate(params.styleId)}>
              네
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
