// Need to use the React-specific entry point to import createApi
import type { ApiResponse, CreateParcelRequest, PaginatedApiResponse, Parcel, ParcelStats, UpdateParcelStatusRequest } from '@/types/index.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define types for parcel management


// Define a service using a base URL and expected endpoints
export const parcelApi = createApi({
  reducerPath: 'parcelApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/v1/parcels',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Sender endpoints
    createParcel: builder.mutation<ApiResponse<Parcel>, CreateParcelRequest>({
      query: (parcelData) => ({
        url: '/',
        method: 'POST',
        body: parcelData,
      }),
    }),
    getMyParcels: builder.query<PaginatedApiResponse<Parcel>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/my-parcels',
        method: 'GET',
        // params: { page, limit },
      }),
    }),
    
    // Receiver endpoints
    getIncomingParcels: builder.query<PaginatedApiResponse<Parcel>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/incoming',
        method: 'GET',
        params: { page, limit },
      }),
    }),
    
    // Public endpoints
    trackParcel: builder.query<ApiResponse<Parcel>, string>({
      query: (trackingId) => ({
        url: `/track/${trackingId}`,
        method: 'GET',
      }),
    }),
    
    // Parcel actions
    cancelParcel: builder.mutation<ApiResponse<Parcel>, string>({
      query: (parcelId) => ({
        url: `/cancel/${parcelId}`,
        method: 'PATCH',
      }),
    }),
    confirmDelivery: builder.mutation<ApiResponse<Parcel>, string>({
      query: (parcelId) => ({
        url: `/confirm/${parcelId}`,
        method: 'PATCH',
      }),
    }),
    
    // Admin endpoints
    getAllParcels: builder.query<PaginatedApiResponse<Parcel>, { page?: number; limit?: number; search?: string }>({
      query: ({ page = 1, limit = 10, search }) => ({
        url: '/',
        method: 'GET',
        params: { page, limit, search },
      }),
    }),
    getParcelStats: builder.query<ApiResponse<ParcelStats>, void>({
      query: () => ({
        url: '/stats',
        method: 'GET',
      }),
    }),
    getParcelById: builder.query<ApiResponse<Parcel>, string>({
      query: (parcelId) => ({
        url: `/${parcelId}`,
        method: 'GET',
      }),
    }),
    updateParcelStatus: builder.mutation<ApiResponse<Parcel>, { parcelId: string; data: UpdateParcelStatusRequest }>({
      query: ({ parcelId, data }) => ({
        url: `/status/${parcelId}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    toggleParcelStatus: builder.mutation<ApiResponse<Parcel>, string>({
      query: (parcelId) => ({
        url: `/toggle/${parcelId}`,
        method: 'PATCH',
      }),
    }),
    deleteParcel: builder.mutation<ApiResponse<Parcel>, string>({
      query: (parcelId) => ({
        url: `/${parcelId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateParcelMutation,
  useGetMyParcelsQuery,
  useGetIncomingParcelsQuery,
  useTrackParcelQuery,
  useCancelParcelMutation,
  useConfirmDeliveryMutation,
  useGetAllParcelsQuery,
  useGetParcelStatsQuery,
  useGetParcelByIdQuery,
  useUpdateParcelStatusMutation,
  useToggleParcelStatusMutation,
  useDeleteParcelMutation,
} = parcelApi