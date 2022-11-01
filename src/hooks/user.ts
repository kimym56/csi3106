import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../remotes/user';

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => getCurrentUser(),
  });
}
