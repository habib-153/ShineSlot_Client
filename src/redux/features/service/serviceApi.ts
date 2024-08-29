import { TQueryParams, TResponseRedux } from "../../../types/global";
import { TService } from "../../../types/service";
import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: ({searchTerm, filters, sort}) => {
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
      transformResponse: (response: TResponseRedux<TService[]>) => {
        return {
          data: response.data, 
        };
      },
      providesTags: ["Service"],
    }),
    getAllServicesForAdmin: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        // console.log(params)
        return {
          url: "/services",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TService[]>) => {
        return {
          data: response.data, 
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
          body: payload,
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
  useGetAllServicesForAdminQuery
} = serviceApi;
