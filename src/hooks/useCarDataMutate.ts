import axios, { AxiosPromise } from "axios"
import { CarData } from "../interface/CarData"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const API_URL = 'http://localhost:8081'

const fetchData = async (data: CarData): AxiosPromise<any> => {
    return axios.post(API_URL + '/car', data)}

export function useCarDataMutate() {
    const queryClient = useQueryClient()
    const mutate = useMutation({
        mutationFn: fetchData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ exact: true, predicate: (query) => query.queryKey[0] === 'car-data' })
        }
    })

    return mutate
}





