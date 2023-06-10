import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, QuestionPost, CreateQuestionPost } from 'types/types';

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
    // 커뮤니티 게시판 게시글 최신순 get Api
    getCommunityPosts: builder.query<QuestionPost[], number | void>({
      query: (page = 1) => `community/questions?page=${page}&sort=latest`,
      providesTags: ['Post'],
    }),
    // 커뮤니티 게시판 게시글 댓글순 get Api
    getMostCommentsCommunityPosts: builder.query<QuestionPost[], number | void>({
      query: (page = 1) => `community/questions?page=${page}&sort=mostComments`,
    }),
    // 커뮤니티 게시판 게시글 추천순 get Api
    getMostLikesCommunityPosts: builder.query<QuestionPost[], number | void>({
      query: (page = 1) => `community/questions?page=${page}&sort=mostLikes`,
    }),
    // 커뮤니티 게시글 등록 post Api
    createCommunityPost: builder.mutation<CreateQuestionPost, Partial<CreateQuestionPost>>({
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
    editCommunityPost: builder.mutation<CreateQuestionPost, Partial<CreateQuestionPost> & { id: string }>({
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
    deleteCommunityPost: builder.mutation<CreateQuestionPost, Partial<CreateQuestionPost> & { id: string }>({
      query: ({ id }) => ({
        url: `community/questions/${id}`,
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
  useGetCommunityPostsQuery,
  useGetMostCommentsCommunityPostsQuery,
  useGetMostLikesCommunityPostsQuery,
  useCreateCommunityPostMutation,
  useEditCommunityPostMutation,
  useDeleteCommunityPostMutation,
} = communityApiSlice;
