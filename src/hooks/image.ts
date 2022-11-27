import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { Image } from 'react-native-image-crop-picker';
import { getRecommendedTags, GetRecommendedTagsParams, uploadImage, UploadImageResult } from '../remotes/image';

export function useImageUploadMutation(options?: UseMutationOptions<UploadImageResult, unknown, Image>) {
  return useMutation(({ path, mime, size, modificationDate }: Image) => {
    if (modificationDate == null) {
      throw new Error('invalid image asset');
    }

    return uploadImage({
      uri: path,
      fileName: modificationDate,
      contentType: mime,
      contentLength: size,
    });
  }, options);
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
