import { useQuery } from '@tanstack/react-query';
import { getStyle } from '../remotes/clothes';

export function useStyleQuery(id: number) {
  return useQuery({
    queryKey: ['style', id],
    queryFn: () => getStyle(id),
  });
}
