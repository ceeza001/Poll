import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  createUserAccount,
  signInAccount,
  getCurrentUser,
  signOutAccount,
  getUsers,
  getUserById,
  updateUser,
  createPoll,
  deletePoll,
  getPollById,
  updatePoll,
  createCandidate,
  deleteCandidate,
  getChapterById,
  getPolls,
  vote
} from "@/lib/appwrite/api";
import { INewPoll, INewCandidate, IUpdateChapter, INewUser, IUpdatePoll, IUpdateUser } from "@/types";

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

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

export const useGetUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};

 // ============================================================
// COURSE QUERIES
// ============================================================

export const useCreatePoll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (poll: INewPoll) => createPoll(poll),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POLLS],
      });
    },
  });
};

export const useDeletePoll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pollId, fileId }: { pollId?: string; fileId: string }) =>
      deletePoll(pollId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POLLS],
      });
    },
  });
};

export const useGetPollById = (pollId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POLL_BY_ID, pollId],
    queryFn: () => getPollById(pollId),
    enabled: !!pollId,
  });
};

export const useGetChapterById = (chapterId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CHAPTER_BY_ID, chapterId],
    queryFn: () => getChapterById(chapterId),
    enabled: !!chapterId,
  });
};

export const useUpdatePoll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (poll: IUpdatePoll) => updatePoll(poll),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_POLL],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POLL_BY_ID, data?.$id],
      });
    },
  });
};

export const useCreateCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (candidate: INewCandidate) => createCandidate(candidate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POLLS],
      });
    },
  });
};

export const useDeleteCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ candidateId, fileId }: { candidateId?: string; fileId: string }) =>
      deleteCandidate(candidateId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POLL_BY_ID],
      });
    },
  });
};
export const useGetPolls = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POLLS],
    queryFn: () => getPolls(),
  });
};

export const useVote = () => {
  return useMutation({
    mutationFn: ({ votes, candidateId }: { votes: string[]; candidateId: string }) =>
      vote(votes, candidateId),
  });
};