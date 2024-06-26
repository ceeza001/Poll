export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type INewPoll = {
  userId: string;
  title: string;
};

export type IUpdateUser = {
  userId: string;
  isAdmin?: boolean;
  status?: 'verified' | 'blocked' | 'unverified';
};

export type IUpdatePoll = {
  pollId: string;
  title: string;
  description: string;
  isPublished: boolean;
};

export type INewCandidate = {
  pollId: string;
  name: string;
  file: File[];
  imageId: string;
  imageUrl: URL | string;
}

export type IUser = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  voterId: string;
  isAdmin: boolean;
  status?: string;
};

export type INewUser = {
  email: string;
  name: string;
  password: string;
  voterId: string;
};