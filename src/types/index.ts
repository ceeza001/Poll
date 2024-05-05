export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IOnboardUser = {
  userId: string;
  name: string;
  username: string;
  level: string;
  department: string;
  type: string;
  matricNo: string;
  bio: string;
  onboarded: boolean;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
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

export type INewPoll = {
  userId: string;
  title: string;
};

export type IUpdatePoll = {
  courseId: string;
  title: string;
  description: string;
  isPublished: boolean;
};

export type INewCandidate = {
  courseId: string;
  name: string;
  file: File[];
}

export type IUpdateChapter = {
  chapterId: string;
  title: string;
  description: string;
  imageId: string;
  imageUrl: URL | string;
  category: string;
  isPublished: boolean;
  file: File[];
};

export type INewAttachment = {
  courseId: string;
  name: string;
  file: File[];
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
  imageUrl: string;
  bio: string;
};

export type INewUser = {
  email: string;
  name: string;
  password: string;
};

export type INewCommunity = {
  file: File[];
  name: string;
  description: string;
  creator: string;
};
