import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card } from 'react-native-paper';
import { ScreenName } from '../../constants';
import { useShopCreate } from '../../hooks/shop';
import ShopUploadColorCard from './ShopUploadColorCard';
import ShopUploadImageCard from './ShopUploadImageCard';
import ShopUploadInfoCard from './ShopUploadInfoCard';

export default function StyleRegisterScreen() {
  const { navigate, goBack } = useNavigation();

  const form = useForm();
  const { handleSubmit } = form;

  const create = useShopCreate({
    onSuccess(data) {
      goBack();
      navigate(ScreenName.상점_상세, { clothesId: data.id });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <FormProvider {...form}>
          <ShopUploadInfoCard />
          <ShopUploadColorCard />
          <ShopUploadImageCard />
          <Card>
            <Button
              style={styles.button}
              contentStyle={{ height: '100%' }}
              mode={'contained'}
              onPress={handleSubmit(
                (values) => {
                  values.price = parseInt(values.price);
                  create.mutate(values);
                },
                () => {
                  console.log('error');
                },
              )}
            >
              <Text style={{ fontSize: 18, height: '100%' }}>Shop 등록하기</Text>
            </Button>
          </Card>
        </FormProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    marginHorizontal: 20,
    marginVertical: 10,
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
