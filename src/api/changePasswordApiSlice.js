import { apiSlice } from "./apiSlice";

export const changePasswordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/change-password",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = changePasswordApiSlice;
