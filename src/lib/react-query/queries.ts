import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  signInAccount,
  getCurrentUser,
  signOutAccount,
  getCandidates,
  getUserById,
  vote
} from "@/lib/appwrite/api";
import { INewPost, INewUser, IUpdatePost, IUpdateUser, INewCommunity } from "@/types";

// ============================================================
// AUTH QUERIES
// ============================================================

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

// ============================================================
// USER QUERIES
// ============================================================

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetCandidates = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getCandidates(limit),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useVote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ voterId, candidateId }: { voterId: string; candidateId: string }) =>
      vote(voterId, candidateId),
  });
};
