// Need to use the React-specific entry point to import createApi
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ToggleUserStatusRequest,
  UpdateProfileRequest,
  User,
} from "@/types/index.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define types for authentication requests and responses

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/v1/users`,
    credentials: "include", // Include cookies in requests
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<User>, RegisterRequest>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
        credentials: "include", // Include cookies in this request
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
        credentials: "include", // Include cookies in this request
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include", // Include cookies in this request
      }),
      invalidatesTags: ["User"],
    }),
    getProfile: builder.query<ApiResponse<User>, void>({
      query: () => ({
        url: "/me",
        method: "GET",
        credentials: "include", // Include cookies in this request
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<ApiResponse<User>, UpdateProfileRequest>({
      query: (data) => ({
        url: "/me",
        method: "PATCH",
        body: data,
        credentials: "include", // Include cookies in this request
      }),
      invalidatesTags: ["User"],
    }),
    toggleUserStatus: builder.mutation<
      ApiResponse<User>,
      { userId: string; data: ToggleUserStatusRequest }
    >({
      query: ({ userId, data }) => ({
        url: `/${userId}/status`,
        method: "PATCH",
        body: data,
        credentials: "include", // Include cookies in this request
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query<
      ApiResponse<User[]>,
      { page?: number; limit?: number; search?: string; role?: string }
    >({
      query: ({ page = 1, limit = 10, search, role }) => ({
        url: "/",
        method: "GET",
        params: { page, limit, search, role },
        credentials: "include", // Include cookies in this request
      }),
      providesTags: ["User"],
    }),
    getUserStats: builder.query<
      ApiResponse<{
        totalUsers: number;
        senderCount: number;
        receiverCount: number;
        adminCount: number;
      }>,
      void
    >({
      query: () => ({
        url: "/stats",
        method: "GET",
        credentials: "include", // Include cookies in this request
      }),
      providesTags: ["User"],
    }),
    toggleUserBlock: builder.mutation({
      query: (userId) => ({
        url: `/toggle/block/${userId}`,
        method: "PATCH",
        // body: data,
        credentials: "include", // Include cookies in this request
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useToggleUserStatusMutation,
  useGetAllUsersQuery,
  useGetUserStatsQuery,
  useToggleUserBlockMutation
} = authApi;
