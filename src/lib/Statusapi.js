import useFetchData from './FetchData'
import { baseURL } from './global'

// export const getStatus = (statusType) => {
//     const { data, isLoading, error, isError } = useFetchData(
//         `${baseURL}Asset/GetStatus?statusType=${statusType}`
//     )
//     return { data, isLoading, error, isError }
// }
export const useStatusData = (statusType, shouldFetch) => {
    const url = shouldFetch
        ? `${baseURL}Asset/GetStatus?statusType=${statusType}`
        : null
    const { data, isLoading, error, isError } = useFetchData(url)

    return { data, isLoading, error, isError }
}
