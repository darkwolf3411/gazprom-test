import { IPerson } from './../models/Person';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type FetchPersonSizeType = 'bigger' | 'small'
const baseUrl = 'http://localhost:3004/'

export const personApi = createApi({
    reducerPath: 'personApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ['POST'],
    //**Когда заработает API из задания */
    // endpoints: (builder) => ({
    //     getAllPerson: builder.query<IPerson[], FetchPersonSizeType>({
    //         query:(size: string)=>({
    //             url: '/',
    //             params: {
    //                 rows: size == 'bigger'?1000:32,
    //                 id: '%7bnumber|1000%7d',
    //                 firstName: '7bfirstName%7d',
    //                 lastName: '%7blastName%7d',
    //                 email: '%7bemail%7d',
    //                 phone: '%7bphone|(xxx)xxx-xx-xx%7d',
    //                 address: '%7baddressObject%7d',
    //                 description: '%7blorem|32%7d'
    //             }
    //         }),
    //         providesTags: ['POST']
    //     })        
    // })
    //**Моковое API */
    endpoints: (builder) => ({
        getAllPerson: builder.query<IPerson[], FetchPersonSizeType>({
            query:(size: string)=>({
                url: '/person',
                params: {
                    _limit: size == 'bigger'?1000:32,
                }
            }),
            providesTags: ['POST']
        })        
    })
})