import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.query({
      query: () => "/auth/login",
    }),
    registerUser: builder.mutation({
      query: () => "/auth/signup",
    }),
  }),
});

export const { useLoginUserQuery, useRegisterUserMutation } = authApi;
