import { IContact } from "@/interfaces/contact.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
    reducerPath: "contacts/api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001",
    }),
    tagTypes: ["Contacts"],
    endpoints: (build) => ({
        getAllContacts: build.query<IContact[], void>({
            query: () => ({
                url: "/contacts",
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Contacts" as const,
                              id,
                          })),
                          { type: "Contacts", id: "LIST" },
                      ]
                    : [{ type: "Contacts", id: "LIST" }],
        }),
        getContact: build.query<IContact, string>({
            query: (id) => ({
                url: `/contacts/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: "Contacts", id }],
        }),
        addContact: build.mutation<IContact, Partial<IContact>>({
            query: (body) => ({
                url: "/contacts",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Contacts", id: "LIST" }],
        }),
        deleteContact: build.mutation<{ success: boolean; id: string }, string>(
            {
                query: (id) => ({
                    url: `/contacts/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: (result, error, id) => [
                    { type: "Contacts", id },
                    { type: "Contacts", id: "LIST" },
                ],
            }
        ),
        updateContact: build.mutation<IContact, Partial<IContact>>({
            query: (data) => {
                const { id, ...body } = data;
                return {
                    url: `/contacts/${id}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: (result, error, id) => [
                { type: "Contacts", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetAllContactsQuery,
    useGetContactQuery,
    useAddContactMutation,
    useDeleteContactMutation,
    useUpdateContactMutation,
} = contactsApi;
