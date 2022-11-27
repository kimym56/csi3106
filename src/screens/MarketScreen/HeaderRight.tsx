import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function HeaderRight() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={{ marginRight: 16, marginVertical: 16 }}>
        <Icon name={'bell'} size={24} color={'D9D9D9'} />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginRight: 16, marginVertical: 16 }}>
        <Icon name={'message-circle'} size={24} />
      </TouchableOpacity>
    </View>
  );
}
