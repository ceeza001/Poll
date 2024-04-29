import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  signInAccount,
  getCurrentUser,
  signOutAccount,
  getCandidates,
  getVoters,
  vote,
  getUserById,
} from "@/lib/appwrite/api";

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
  return useMutation({
    mutationFn: ({ votes, candidateId }: { votes: []; candidateId: string }) =>
      vote(votes, candidateId),
  });
};

export const useGetVoters = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_VOTERS],
    queryFn: () => getVoters(limit),
  });
};