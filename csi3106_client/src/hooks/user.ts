import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createFollow,
  deleteFollow,
  getCurrentUser,
  getCurrentUserFollow,
  getIsFollow,
  getOtherUser,
  getOtherUserFollow,
} from '../remotes/user';

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () =>
      (async () => {
        //동시에 request하고 둘 다 응답이오면 반환되게 짜고 싶습니다.
        const userInfo = await getCurrentUser();
        const userFollow = await getCurrentUserFollow();
        return { ...userInfo, ...userFollow };
      })(),
  });
}

export function useOtherUserQuery(id: number) {
  return useQuery({
    queryKey: ['other-user'],
    queryFn: () =>
      (async () => {
        const userInfo = await getOtherUser(id);
        const userFollow = await getOtherUserFollow(id);
        const isFollow = await getIsFollow(id);
        return { ...userInfo, ...userFollow, isFollow };
      })(),
  });
}

export function useFollowCreate(options?: UseMutationOptions<void, unknown, number>) {
  const client = useQueryClient();

  return useMutation(createFollow, {
    ...options,
    onSuccess(...args) {
      client.invalidateQueries(['current-user']);
      client.invalidateQueries(['other-user']);
      options?.onSuccess?.(...args);
    },
  });
}

export function useFollowDelete(options?: UseMutationOptions<void, unknown, number>) {
  const client = useQueryClient();

  return useMutation(deleteFollow, {
    ...options,
    onSuccess(...args) {
      client.invalidateQueries(['current-user']);
      client.invalidateQueries(['other-user']);
      options?.onSuccess?.(...args);
    },
  });
}
