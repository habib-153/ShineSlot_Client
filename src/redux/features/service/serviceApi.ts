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
    }),
  }),
});

export const { useGetAllServicesQuery } = serviceApi;
