import { TQueryParams, TResponseRedux, TUser } from '../../../types/global';
import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    getAllUsers: builder.query({
      query:(args) =>{
        const params = new URLSearchParams()

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return{
          url:'/users',
          method:'GET',
          params: params
        }
      },
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags:['User']
    }),
    updateUser: builder.mutation({
      query: ({payload, id}) => {
        return {
          url: `/users/${id}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: (email) => {
        return {
          url: `/users/${email}`,
          method: "GET"
        };
      },
      providesTags: ["User"],
    }),
    getUserStats: builder.query({
      query: () => {
        return {
          url: `/stats`,
          method: "GET"
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const {useLoginMutation, useGetUserStatsQuery, useGetSingleUserQuery, useSignUpMutation, useGetAllUsersQuery, useUpdateUserMutation} = authApi