import { ApiResponse, LoginResponse, SignupResponse, User } from "@/types";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      SignupResponse,
      Partial<User & { password: string }>
    >({
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
    getAllUsers: builder.query<ApiResponse<User[]>, any>({
      query: () => ({
        url: "/auth/users",
      }),
      providesTags: ["User"],
    }),
    getSignleUser: builder.query<ApiResponse<User>, string>({
      query: (id) => ({
        url: `/auth/user/${id}`,
      }),
    }),
    updateUser: builder.mutation<
      ApiResponse<User>,
      {
        id: string;
        payload: Partial<User>;
      }
    >({
      query: ({ id, payload }) => ({
        url: `/auth/update-user/${id}`,
        method: "PUT",

        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetSignleUserQuery,
  useGetAllUsersQuery,
} = authApi;
