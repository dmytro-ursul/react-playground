import { createApi } from '@reduxjs/toolkit/query/react';
import {
  GET_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  REMOVE_PROJECT,
  CREATE_TASK,
  UPDATE_TASK,
  REMOVE_TASK
} from '../queries/projects';
import { SIGN_IN } from '../queries/auth';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import type { RootState } from '../../../store';
import AppSettings from '../../../settings';

interface SignInResponse {
  signIn: {
    token: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: graphqlRequestBaseQuery({
    url: AppSettings.apiUrl ?? "http://localhost:3051/graphql",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    login: builder.mutation<SignInResponse, { username: string; password: string }>({
      query: ({ username, password }: { username: string; password: string }) => ({
        document: SIGN_IN,
        variables: { username, password },
      }),
      invalidatesTags: ['Project']
    }),
    getProjects: builder.query({
      query: () => ({
        document: GET_PROJECTS,
      }),
      providesTags: ['Project'],
    }),
    createProject: builder.mutation({
      query: (name: string) => ({
        document: CREATE_PROJECT,
        variables: { name },
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation({
      query: ({ id, name }: { id: number; name: string }) => ({
        document: UPDATE_PROJECT,
        variables: { id, name },
      }),
      invalidatesTags: ['Project'],
    }),
    removeProject: builder.mutation({
      query: (id: number) => ({
        document: REMOVE_PROJECT,
        variables: {id},
      }),
      invalidatesTags: ['Project'],
    }),
    createTask: builder.mutation({
      query: ({ name, projectId }: { name: string; projectId: number }) => ({
        document: CREATE_TASK,
        variables: { name, projectId },
      }),
      invalidatesTags: ['Project'],
    }),
    updateTask: builder.mutation({
      query: ({id, name, projectId, completed}: {id: number; name: string; projectId: number, completed: boolean}) => ({
        document: UPDATE_TASK,
        variables: {id, name, projectId, completed},
      }),
      invalidatesTags: ['Project'],
    }),
    removeTask: builder.mutation({
      query: (id: number) => ({
        document: REMOVE_TASK,
        variables: {id},
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProjectsQuery,
  useRemoveProjectMutation,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useRemoveTaskMutation,
} = apiSlice;
