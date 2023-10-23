import axios, { AxiosPromise } from "axios"
import { CarData } from "../interface/CarData"
import { useQuery } from "@tanstack/react-query"

const API_URL = 'http://localhost:8081'

const fetchData = async (): AxiosPromise<CarData[]> => {
    return axios.get(API_URL + '/car')}

export function useCarData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['car-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}

