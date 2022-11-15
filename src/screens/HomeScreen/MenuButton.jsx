import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FAB, Portal } from 'react-native-paper';
import { ScreenName } from '../../constants';
export default function MenuButton() {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const { navigate } = useNavigation();
  return (
    <Portal>
      <FAB.Group
        open={open}
        icon={open ? 'minus' : 'plus'}
        actions={[
          {
            // 이미지 변경 예정
            icon: 'user-plus',
            label: 'Add Style',
            onPress: () => navigate(ScreenName.스타일_업로드),
          },
          {
            icon: 'shopping-bag',
            label: 'Add Shop',
            onPress: () => navigate(ScreenName.상점_업로드),
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
}
