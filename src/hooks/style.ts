import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { Style } from '../models/style';
import {
  createStyle,
  CreateStyleParams,
  deleteStyle,
  getMyStyleList,
  getRecommendedTags,
  GetRecommendedTagsParams,
  getStyle,
} from '../remotes/style';

export function useMyStyleListQuery() {
  return useQuery({
    queryKey: ['styles'],
    queryFn: () => getMyStyleList(),
  });
}

export function useStyleQuery(id: number) {
  return useQuery({
    queryKey: ['style', id],
    queryFn: () => getStyle(id),
  });
}

export function useStyleDelete(options?: UseMutationOptions<void, unknown, number>) {
  const client = useQueryClient();

  return useMutation(deleteStyle, {
    ...options,
    onSuccess(data, ...args) {
      client.invalidateQueries(['styles']);
      options?.onSuccess?.(data, ...args);
    },
  });
}

export function useRecommendedTagListQuery({ imagePath }: Partial<GetRecommendedTagsParams>) {
  return useQuery({
    enabled: imagePath != null,
    queryKey: ['recommended-tag-list', { imagePath }],
    queryFn: () => {
      if (imagePath == null) {
        throw new Error('invalid image path');
      }

      return getRecommendedTags({ imagePath });
    },
  });
}

export function useStyleCreate(options?: UseMutationOptions<Style, unknown, CreateStyleParams>) {
  const client = useQueryClient();

  return useMutation(createStyle, {
    ...options,
    onSuccess(...args) {
      client.invalidateQueries(['styles']);
      options?.onSuccess?.(...args);
    },
  });
}
