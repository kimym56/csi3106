import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { Colors } from '../../constants';
import { TagName } from '../../constants';
import { useRecommendedTagListQuery } from '../../hooks/style';
import TagItem from '../Tag/TagItem';
import TagList from '../Tag/TagList';

export interface Props {
  imagePath: string | undefined;
  values?: String | null;
  onChange?: (tag: String) => void;
}

export default function ImageTagInput({ imagePath, values, onChange }: Props) {
  const { isLoading, isSuccess, data } = useRecommendedTagListQuery({ imagePath });

  const [extraTag, setExtraTag] = useState<null | String>(null);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <TagList style={{ flexWrap: 'wrap', padding: 20 }}>
            {Object.entries(TagName).map(([key, value]) => (
              <Pressable
                key={key}
                onPress={() => {
                  onChange?.(key);
                  setExtraTag(key);
                  hideModal();
                }}
              >
                <TagItem title={value.kor} style={{ margin: 5 }} />
              </Pressable>
            ))}
          </TagList>
        </Modal>
      </Portal>
      <TagList style={styles.tagContainer}>
        {isLoading ? (
          <ActivityIndicator color={Colors.ACCENT} size="large" />
        ) : isSuccess ? (
          <>
            {data.recommendedTags.map((ct, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  onChange?.(ct);
                }}
              >
                <TagItem style={values === ct && styles.selected} title={TagName[ct as keyof typeof TagName].kor} />
              </Pressable>
            ))}
            <Pressable onPress={showModal}>
              <TagItem
                style={values === extraTag && styles.selected}
                title={extraTag ? TagName[extraTag as keyof typeof TagName].kor : 'etc'}
              />
            </Pressable>
          </>
        ) : null}
      </TagList>
    </>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '100%',
    height: 36,
  },
  selected: {
    backgroundColor: Colors.ACCENT,
    color: Colors.WHITE,
  },
});
