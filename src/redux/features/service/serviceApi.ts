import { TQueryParams } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item : TQueryParams) => {
            params.append(item.name, item.value as string);
          });
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
