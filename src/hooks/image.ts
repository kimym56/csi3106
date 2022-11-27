import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Image } from 'react-native-image-crop-picker';
import { uploadStyleImage, UploadStyleImageResult } from '../remotes/style';

export function useImageUploadMutation(options?: UseMutationOptions<UploadStyleImageResult, unknown, Image>) {
  return useMutation(({ path, mime, size, modificationDate }: Image) => {
    if (modificationDate == null) {
      throw new Error('invalid image asset');
    }

    return uploadStyleImage({
      uri: path,
      fileName: modificationDate,
      contentType: mime,
      contentLength: size,
    });
  }, options);
}
