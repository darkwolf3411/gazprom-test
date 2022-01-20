import { IPerson } from './../models/Person';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type FetchPersonSizeType = 'bigger' | 'small'
const baseUrl = 'http://www.filltext.com'

export const personApi = createApi({
    reducerPath: 'personApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ['POST'],
    //**Когда заработает API из задания */
    endpoints: (builder) => ({
        getAllPerson: builder.query<IPerson[], FetchPersonSizeType>({
            query:(size: string)=>({
                url: '/',
                params: {
                    rows: size == 'bigger'?1000:32,
                    id: '{index}',
                    firstName: '{firstName}',
                    lastName: '{lastName}',
                    email: '{email}',
                    phone: '{phone|(xxx)xxx-xx-xx}',
                    address: '{addressObject}',
                    description: '{lorem|32}'
                }
            }),
            providesTags: ['POST']
        })        
    })
    // **Моковое API */
    // endpoints: (builder) => ({
    //     getAllPerson: builder.query<IPerson[], FetchPersonSizeType>({
    //         query:(size: string)=>({
    //             url: '/person',
    //             params: {
    //                 _limit: size == 'bigger'?1000:32,
    //             }
    //         }),
    //         providesTags: ['POST']
    //     })        
    // })
})