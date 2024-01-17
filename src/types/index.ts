export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  onboarded: boolean;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  title: string;
  caption: string;
  file: File[];
  type: string,
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  title: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  type: string,
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  vote: string;
};

export type INewUser = {
  email: string;
  password: string;
};

export type INewCommunity = {
  name: string;
  bio: string;
};
