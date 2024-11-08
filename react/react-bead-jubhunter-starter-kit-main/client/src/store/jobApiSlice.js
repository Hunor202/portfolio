import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:3030';

export const jobApi = createApi({
    reducerPath: 'jobApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body,
            })
        }),
        loginUser: builder.mutation({
            query: (body) => ({
                url: 'authentication',
                method: 'POST',
                body: { ...body, strategy: 'local' },
            })
        }),
        addExperience: builder.mutation({
            query: (body) => ({
                url: 'experiences',
                method: 'POST',
                body,
            })
        }),
        getJobs: builder.query({
            query: () => 'jobs',
        }),
        getExperiences: builder.query({
            query: () => 'experiences',
        }),
        addJob: builder.mutation({
            query: (body) => ({
                url: 'jobs',
                method: 'POST',
                body,
            })
        }),
    }),
});

export const {
    useAddUserMutation,
    useLoginUserMutation,
    useAddExperienceMutation,
    useGetJobsQuery,
    useGetExperiencesQuery,
    useAddJobMutation,
} = jobApi