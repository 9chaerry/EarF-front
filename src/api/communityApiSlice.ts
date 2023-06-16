import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  User,
  QuestionPost,
  DeletePost,
  CreateQuestionPost,
  Comment,
  CommentPath,
  CommentPost,
  LastComment,
  BoastPost,
} from 'types/types';

import { getToken, isTokenExpired, refreshAccessToken } from './token';

// 코치님이 말하신 방법으로 사용을 했는데 403 에러가 반환되어서 오류를 잡고있습니다..ㅠㅠ
const addHeaders = () => {
  let token = getToken();

  if (isTokenExpired()) {
    refreshAccessToken();
    token = `${getToken()}`;
  }

  return token;
};

export const communityApiSlice = createApi({
  reducerPath: 'communityApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://34.64.216.86/api/' }),
  tagTypes: ['Post', 'Boast'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<User, void>({
      query: () => ({
        url: 'user',
        headers: {
          Authorization: `Bearer ${addHeaders()}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
    // 커뮤니티 자기 게시글 get Api
    getMyQuestion: builder.query<QuestionPost[], void>({
      query: () => ({
        url: 'community/questions/user',
        headers: {
          Authorization: `Bearer ${addHeaders()}`,
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Post'],
    }),
    // 커뮤니티 게시판 질문 검색 get Api
    getSearch: builder.query<QuestionPost[], string>({
      query: (q) => `community/questions/search?page=1&keyword=${q}`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 게시판 단일 게시글 전체 get Api
    getAllCommunityPosts: builder.query<QuestionPost[], void>({
      query: () => `community/questions-all`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 게시판 단일 게시글 조회 get Api
    getCommunityPost: builder.query<QuestionPost, string>({
      query: (postId) => `community/questions/${postId}`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 게시판 게시글 최신순 get Api
    getCommunityPosts: builder.query<QuestionPost[], number | void>({
      query: (page = 1) => `community/questions?page=${page}&sort=latest`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 게시판 게시글 댓글순 get Api
    getMostCommentsCommunityPosts: builder.query<QuestionPost[], number | void>({
      query: (page = 1) => `community/questions?page=${page}&sort=mostComments`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 게시판 게시글 추천순 get Api
    getMostLikesCommunityPosts: builder.query<QuestionPost[], number | void>({
      query: (page = 1) => `community/questions?page=${page}&sort=mostLikes`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 질문 BEST 추천 5개 조회 get Api
    getBestLikesCommunityPosts: builder.query<QuestionPost[], void>({
      query: () => `community/questions/most-liked`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 질문 최신 댓글 1개 조회 get Api
    getLatestComment: builder.query<LastComment, void>({
      query: () => `community/questions/latest-commented`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 질문 댓글 0 게시글 조회 get Api
    getNoComment: builder.query<QuestionPost[], void>({
      query: () => `community/questions/no-comments`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 게시글 등록 post Api
    createCommunityPost: builder.mutation<Comment, Partial<CreateQuestionPost>>({
      query: (post) => ({
        url: 'community/questions',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${addHeaders()}`,
          'Content-Type': 'application/json',
        },
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    // 커뮤니티 게시글 수정 patch Api
    editCommunityPost: builder.mutation<CreateQuestionPost, Partial<QuestionPost> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `community/questions/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${addHeaders()}`,
          'Content-Type': 'application/json',
        },
        body: patch,
      }),
      invalidatesTags: ['Post'],
    }),
    // 커뮤니티 게시글 삭제 delete Api
    deleteCommunityPost: builder.mutation<CreateQuestionPost, Partial<DeletePost> & { id: string }>({
      query: ({ id }) => ({
        url: `community/questions/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${addHeaders()}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    // 커뮤니티 댓글 전체 조회 get Api
    getAllComments: builder.query<Comment[], string>({
      query: (postId) => `community/questions/comments/${postId}`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 댓글 단일 조회 get Api
    getComment: builder.query<Comment, CommentPath>({
      query: ({ postId, commentId }) => `community/questions/comments/${postId}/${commentId}`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 댓글 생성 post Api
    createComment: builder.mutation<Comment, CommentPost & { id: string }>({
      query: ({ id, ...post }) => ({
        url: `community/questions/comments/${id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${addHeaders()}`,
          'Content-Type': 'application/json',
        },
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    // 커뮤니티 댓글 수정 patch Api
    editComment: builder.mutation<CommentPost, CommentPost & CommentPath>({
      query: ({ postId, commentId, ...patch }) => ({
        url: `community/questions/comments/${postId}/${commentId}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${addHeaders()}`,
          'Content-Type': 'application/json',
        },
        body: patch,
      }),
      invalidatesTags: ['Post'],
    }),
    // 커뮤니티 댓글 삭제 delete Api
    deleteComment: builder.mutation<CommentPost, CommentPath>({
      query: ({ postId, commentId }) => ({
        url: `community/questions/comments/${postId}/${commentId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${addHeaders()}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    // 작성글 좋아요 patch Api
    toggleLikePost: builder.mutation<QuestionPost, { postId: string }>({
      query: ({ postId }) => ({
        url: `community/questions/like/${postId}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${addHeaders()}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    // 댓글 좋아요 patch Api
    toggleLikeComment: builder.mutation<Omit<Comment, 'numLikes'>, CommentPath>({
      query: ({ postId, commentId }) => ({
        url: `community/questions/comments/like/${postId}/${commentId}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${addHeaders()}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    // 자랑하기 전체 get Api
    getAllBoastPosts: builder.query<BoastPost[], void>({
      query: () => 'community/boasts',
      providesTags: ['Boast'],
    }),
    // 자랑하기 텀블러 get Api
    getSortedTumPosts: builder.query<BoastPost[], void>({
      query: () => 'community/boasts?tag=텀블러',
      providesTags: ['Boast'],
    }),
    // 자랑하기 대중교통 get Api
    getSortedTransPosts: builder.query<BoastPost[], void>({
      query: () => 'community/boasts?tag=대중교통',
      providesTags: ['Boast'],
    }),
    // 자랑하기 장바구니 get Api
    getSortedBasketPosts: builder.query<BoastPost[], void>({
      query: () => 'community/boasts?tag=장바구니',
      providesTags: ['Boast'],
    }),
    // 자랑하기 좋아요 patch Api
    toggleLikeBoast: builder.mutation<BoastPost[], { postId: string }>({
      query: ({ postId }) => ({
        url: `community/boasts/like/${postId}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${addHeaders()}`,
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Boast'],
    }),
  }),
});

export const {
  useGetMyQuestionQuery,
  useGetSearchQuery,
  useGetAllCommunityPostsQuery,
  useGetCommunityPostQuery,
  useGetCommunityPostsQuery,
  useGetMostCommentsCommunityPostsQuery,
  useGetMostLikesCommunityPostsQuery,
  useGetBestLikesCommunityPostsQuery,
  useGetLatestCommentQuery,
  useGetNoCommentQuery,
  useGetAllCommentsQuery,
  useGetCommentQuery,
  useGetUserInfoQuery,
  useCreateCommunityPostMutation,
  useEditCommunityPostMutation,
  useDeleteCommunityPostMutation,
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useToggleLikePostMutation,
  useToggleLikeCommentMutation,
  useGetAllBoastPostsQuery,
  useGetSortedTumPostsQuery,
  useGetSortedTransPostsQuery,
  useGetSortedBasketPostsQuery,
  useToggleLikeBoastMutation,
} = communityApiSlice;
