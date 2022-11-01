import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';

export default function MenuButton() {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

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
            onPress: () => console.log('Add Style'),
          },
          {
            icon: 'shopping-bag',
            label: 'Add Shop',
            onPress: () => console.log('Add Shop'),
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
}
