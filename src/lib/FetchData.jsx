import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchData = async ({ queryKey }) => {
    const url = queryKey[1]
    const token = queryKey[2]
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}
const useFetchData = (url, token) => {
    const { data, error, isLoading, isError, refetch } = useQuery({
        queryKey: ['fetchData', url, token],
        queryFn: fetchData,
        enabled: true,
        cacheTime: 0,
        keepPreviousData: true,
    })
    const totalCount = data?.totalCount ?? null
    return { data, totalCount, error, isLoading, isError, refetch }
}

export default useFetchData
