import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: ({ searchTerm, filters, sort }) => {
        const params = new URLSearchParams();
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (filters) {
          params.append("filters", filters);
        }
        if (sort) {
          params.append("sort", sort.sort);
        }
        return {
          url: "/services",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Service"],
    }),
    getSingleService: builder.query({
      query: (id) => {
        return {
          url: `/services/${id}`,
          method: "GET",
        };
      },
    }),
    addService: builder.mutation({
      query: (serviceInfo) => {
        return {
          url: "/services",
          method: "POST",
          body: serviceInfo,
        };
      },
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/services/${id}`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetSingleServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
