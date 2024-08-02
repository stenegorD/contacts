import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = import.meta.env.VITE_APP_CONTACTS_URL;
const token = import.meta.env.VITE_TOKEN;

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Contacts", "Contact"],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => ({
                url: `/contacts`,
                method: 'GET',
                params: { sort: 'created:desc' },
            }),

            transformResponse: (data: any) => data.resources,
            providesTags: ['Contacts']
        }),
        getContact: builder.query({
            query: (id) => ({
                url: `/contact/${id}`,
                method: 'GET',
            }),

            transformResponse: (data: any) => data.resources?.[0],
            providesTags: ['Contact']
        }),
        createContact: builder.mutation({
            query: (data) => ({
                url: `/contact`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Contacts']
        }),
        deleteContact: builder.mutation({
            query: (contactId) => ({
                url: `/contact/${contactId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contacts']
        }),
        addTags: builder.mutation({
            query: (data) => ({
                url: `/contacts/${data.id}/tags`,
                method: 'PUT',
                body: data.tags
            }),
            invalidatesTags: ['Contacts', 'Contact']
        }),
    }),

})

export const { useGetContactsQuery, useGetContactQuery, useCreateContactMutation, useDeleteContactMutation, useAddTagsMutation } = contactsApi