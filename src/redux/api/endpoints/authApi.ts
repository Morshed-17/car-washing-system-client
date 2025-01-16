import { ApiResponse, LoginResponse, SignupResponse, User } from "@/types";
import { baseApi } from "../baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<SignupResponse, Partial<User & {password: string}> > ({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: "/auth/login",
          method: "POST",
          body: credentials,
        }),
      }
    ),
    getAllUsers: builder.query<ApiResponse<User>, any >({
      query: () => ({
        url: "/"
      })
    })
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
