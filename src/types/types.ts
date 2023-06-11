export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  checkedBadge: string;
  postNum: number;
  tumblerNum: number;
  transportNum: number;
  basketNum: number;
  refreshToken: string;
  badges: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface QuestionPost {
  _id: string;
  id: string;
  name: string;
  profileImage: string;
  checkedBadge: string;
  title: string;
  content: string;
  likeIds?: string[];
  commentIds?: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  numComments: number;
  numLikes: number;
}

export interface CreateQuestionPost {
  _id?: string;
  title: string;
  content: string;
}

export type TFormData = {
  tag: string[];
  file: File | null;
  title: string;
  content: string;
  shareStatus: boolean;
};

export interface CheckboxesState {
  [key: string]: boolean;
}
