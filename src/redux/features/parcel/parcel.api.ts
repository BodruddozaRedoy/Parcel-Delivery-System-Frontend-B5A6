import type { ApiResponse, Parcel, ParcelStats, UpdateParcelStatusRequest } from "@/types/index.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const parcelApi = createApi({
  reducerPath: "parcelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/v1/parcels`,
    credentials: "include",
  }),
  tagTypes: ["Parcel"],
  endpoints: (builder) => ({
    // Sender endpoints
    createParcel: builder.mutation({
      query: (parcelData) => ({
        url: "",
        method: "POST",
        body: parcelData,
      }),
      invalidatesTags: ["Parcel"],
    }),

    getMyParcels: builder.query({
      query: () => ({ url: "/my-parcels", method: "GET" }),
      // providesTags: (result) =>
      //   result
      //     ? [...result.data.map(({ _id }) => ({ type: 'Parcel' as const, id: _id })), 'Parcel']
      //     : ['Parcel'],
      providesTags: ["Parcel"],
    }),

    // Receiver endpoints
    getIncomingParcels: builder.query({
      query: () => ({
        url: "/incoming",
        method: "GET",
        // params: { page, limit },
      }),
      // providesTags: (result) =>
      //   result
      //     ? [...result.data.map(({ _id }) => ({ type: 'Parcel' as const, id: _id })), 'Parcel']
      //     : ['Parcel'],
      providesTags: ["Parcel"],
    }),

    // Public endpoints
    trackParcel: builder.query<ApiResponse<Parcel>, string>({
      query: (trackingId) => ({ url: `/track/${trackingId}`, method: "GET" }),
      // providesTags: (result) =>
      //   result ? [{ type: "Parcel", id: result.data._id }] : [],
      providesTags: ["Parcel"]
    }),

    // Parcel actions
    cancelParcel: builder.mutation<ApiResponse<Parcel>, string>({
      query: (parcelId) => ({ url: `/cancel/${parcelId}`, method: "PATCH" }),
      // invalidatesTags: (result, error, parcelId) => [{ type: 'Parcel', id: parcelId }],
      invalidatesTags: ["Parcel"],
    }),

    confirmDelivery: builder.mutation<ApiResponse<Parcel>, string>({
      query: (parcelId) => ({ url: `/confirm/${parcelId}`, method: "PATCH" }),
      // invalidatesTags: (result, error, parcelId) => [{ type: 'Parcel', id: parcelId }],
      invalidatesTags: ["Parcel"],
    }),

    // Admin endpoints
    getAllParcels: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    getParcelStats: builder.query<ApiResponse<ParcelStats>, void>({
      query: () => ({ url: "/stats", method: "GET" }),
    }),

    getParcelById: builder.query<ApiResponse<Parcel>, string>({
      query: (parcelId) => ({ url: `/${parcelId}`, method: "GET" }),
      providesTags: (result) =>
        result ? [{ type: "Parcel", id: result.data._id }] : [],
    }),
    getReceiverUsers: builder.query({
      query: () => ({ url: `/receivers`, method: "GET" }),
    }),

    updateParcelStatus: builder.mutation<
      ApiResponse<Parcel>,
      { parcelId: string; data: UpdateParcelStatusRequest }
    >({
      query: ({ parcelId, data }) => ({
        url: `/status/${parcelId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Parcel"],
    }),

    toggleParcelStatus: builder.mutation<ApiResponse<Parcel>, string>({
      query: (parcelId) => ({ url: `/toggle/${parcelId}`, method: "PATCH" }),
      // invalidatesTags: (result, error, parcelId) => [{ type: 'Parcel', id: parcelId }],
      invalidatesTags: ["Parcel"],
    }),

    deleteParcel: builder.mutation<ApiResponse<Parcel>, string>({
      query: (parcelId) => ({ url: `/${parcelId}`, method: "DELETE" }),
      // invalidatesTags: (result, error, parcelId) => [{ type: 'Parcel', id: parcelId }],
      invalidatesTags: ["Parcel"],
    }),
    toggleParcelBlock: builder.mutation({
      query: (parcelId) => ({
        url: `/toggle/block/${parcelId}`,
        method: "PATCH",
      }),
      // invalidatesTags: (result, error, parcelId) => [{ type: 'Parcel', id: parcelId }],
      invalidatesTags: ["Parcel"],
    }),
  }),
});

// Export hooks
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
  useToggleParcelBlockMutation,
  useGetReceiverUsersQuery,
} = parcelApi;
