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
} from 'types/types';

export const communityApiSlice = createApi({
  reducerPath: 'communityApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://34.64.216.86/api/' }),
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<User, void>({
      query: () => ({
        url: 'user',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        providesTags: ['User'],
      }),
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useGetAllCommunityPostsQuery,
  useGetCommunityPostQuery,
  useGetCommunityPostsQuery,
  useGetMostCommentsCommunityPostsQuery,
  useGetMostLikesCommunityPostsQuery,
  useCreateCommunityPostMutation,
  useEditCommunityPostMutation,
  useDeleteCommunityPostMutation,
  useGetBestLikesCommunityPostsQuery,
  useGetLatestCommentQuery,
  useGetNoCommentQuery,
  useGetAllCommentsQuery,
  useGetCommentQuery,
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = communityApiSlice;
