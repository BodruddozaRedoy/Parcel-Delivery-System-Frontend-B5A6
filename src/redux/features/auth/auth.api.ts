// Need to use the React-specific entry point to import createApi
import type { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, ToggleUserStatusRequest, UpdateProfileRequest, User } from '@/types/index.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define types for authentication requests and responses


// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/users' }),
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<User>, RegisterRequest>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query<ApiResponse<User>, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
    }),
    updateProfile: builder.mutation<ApiResponse<User>, UpdateProfileRequest>({
      query: (data) => ({
        url: '/me',
        method: 'PATCH',
        body: data,
      }),
    }),
    toggleUserStatus: builder.mutation<ApiResponse<User>, { userId: string; data: ToggleUserStatusRequest }>({
      query: ({ userId, data }) => ({
        url: `/${userId}/status`,
        method: 'PATCH',
        body: data,
      }),
    }),
    getAllUsers: builder.query<ApiResponse<User[]>, { page?: number; limit?: number; search?: string; role?: string }>({
      query: ({ page = 1, limit = 10, search, role }) => ({
        url: '/',
        method: 'GET',
        params: { page, limit, search, role },
      }),
    }),
    getUserStats: builder.query<ApiResponse<{ totalUsers: number; senderCount: number; receiverCount: number; adminCount: number }>, void>({
      query: () => ({
        url: '/stats',
        method: 'GET',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useToggleUserStatusMutation,
  useGetAllUsersQuery,
  useGetUserStatsQuery
} = authApi