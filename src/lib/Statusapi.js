import useFetchData from './FetchData'
import { baseURL } from './global'

const token = localStorage.getItem('token')
export const useStatusData = (statusType, shouldFetch) => {
    const url = shouldFetch
        ? `${baseURL}Asset/GetStatus?statusType=${statusType}`
        : null
    const { data, isLoading, error, isError } = useFetchData(url, token)

    return { data, isLoading, error, isError }
}
