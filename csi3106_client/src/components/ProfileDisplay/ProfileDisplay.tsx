import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Colors } from '../../constants';
import { useFollowCreate, useFollowDelete } from '../../hooks/user';
import ProfileImage from '../ProfileImage';

export default function ProfileDisplay({ query, isMyself }: any) {
  const { isLoading: isLoading1, mutate: follow } = useFollowCreate();
  const { isLoading: isLoading2, mutate: unFollow } = useFollowDelete();

  const followAction = () => {
    if (query.data.isFollow) {
      unFollow(query.data.id);
    } else {
      follow(query.data.id);
    }
  };

  return query.isLoading ? (
    <ActivityIndicator />
  ) : query.isSuccess ? (
    <View>
      <View style={styles.item}>
        <View style={styles.reviewContainer}>
          <IconButton icon={'star'} iconColor={'#6600ff'} style={{ marginRight: 0 }} />
          <Text style={styles.reviewScoreText}>{/*(Math.random() * 2 + 3).toFixed(1)*/}4.7</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <ProfileImage />
        </View>
        <View style={styles.topRightIconsContainer}>
          <IconButton icon={'bell'} size={26} style={{ marginHorizontal: 0 }} />
          <IconButton icon={'message-circle'} size={26} />
        </View>
      </View>
      <Text style={styles.nameText}>{query.data?.name}</Text>
      {!isMyself && (
        <View style={styles.followButtonContainer}>
          <Pressable
            style={[styles.followButton, query.data.isFollow && styles.followTrue]}
            onPress={followAction}
            disabled={isLoading1 || isLoading2}
          >
            <Text style={[styles.followButtonText, query.data.isFollow && styles.followTrueText]}>
              {query.data?.isFollow ? '팔로우 취소' : '팔로우'}
            </Text>
          </Pressable>
        </View>
      )}
      <View style={styles.followContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.fontNumbers}>{query.data?.followerNum}</Text>
          <Text style={styles.fontText}>팔로워</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.fontNumbers}>{query.data?.followingNum}</Text>
          <Text style={styles.fontText}>팔로잉</Text>
        </View>
        {/* 리뷰 넘버 수정 */}
        <View style={styles.textContainer}>
          <Text style={styles.fontNumbers}>{/*Math.round(Math.random() * 100).toLocaleString()*/}32</Text>
          <Text style={styles.fontText}>리뷰</Text>
        </View>
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
  },
  header: {
    marginRight: 4,
    fontWeight: 'bold',
  },
  reviewContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  reviewScoreText: { fontSize: 14, fontWeight: '500', color: 'black' },
  topRightIconsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nameText: { fontWeight: '400', fontSize: 17, color: 'black', textAlign: 'center' },
  followContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 14, marginTop: 12 },
  followButtonContainer: { alignItems: 'center' },
  followButton: {
    width: 67,
    height: 24,
    backgroundColor: Colors.ACCENT,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  followButtonText: { fontSize: 14, fontWeight: '500', color: 'white' },
  followTrue: {
    width: 90,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.ACCENT,
  },
  followTrueText: {
    color: Colors.LIGHTGRAY,
  },
  fontNumbers: {
    fontWeight: '700',
    fontSize: 16,
    color: 'black',
  },
  fontText: {
    fontWeight: '400',
    fontSize: 12,
    color: 'black',
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
  },
});
