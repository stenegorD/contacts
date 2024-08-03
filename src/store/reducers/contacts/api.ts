import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_APP_CONTACTS_URL;
const token = import.meta.env.VITE_TOKEN;

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.DEV ? "/" : `https://api.allorigins.win/get?`,
        mode: "cors",
        prepareHeaders: (headers) => {
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
        fetchFn: async (input, init) => {
            const response = await fetch(input, init);
            if (response.ok && import.meta.env.DEV === false) {
                const data = await response.json();
                const decodedData = JSON.parse(data.contents);
                return new Response(JSON.stringify(decodedData), {
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText,
                });
            }
            return response;
        },
    }),
    tagTypes: ["Contacts", "Contact"],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => ({
                url: import.meta.env.DEV ? `/api/v1/contacts` : `${baseUrl}/api/v1/contacts?sort=created:desc`,
                method: 'GET',
                params: import.meta.env.DEV ? { sort: 'created:desc' } : {},
            }),

            transformResponse: (data: any) => data.resources,
            providesTags: ['Contacts']
        }),
        getContact: builder.query({
            query: (id) => ({
                url: `/api/v1/contact/${id}`,
                method: 'GET',
            }),

            transformResponse: (data: any) => data.resources?.[0],
            providesTags: ['Contact']
        }),
        createContact: builder.mutation({
            query: (data) => ({
                url: `/api/v1/contact`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Contacts']
        }),
        deleteContact: builder.mutation({
            query: (contactId) => ({
                url: `/api/v1/contact/${contactId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contacts']
        }),
        addTags: builder.mutation({
            query: (data) => ({
                url: `/api/v1/contacts/${data.id}/tags`,
                method: 'PUT',
                body: data.tags
            }),
            invalidatesTags: ['Contacts', 'Contact']
        }),
    }),

})

export const { useGetContactsQuery, useGetContactQuery, useCreateContactMutation, useDeleteContactMutation, useAddTagsMutation } = contactsApi