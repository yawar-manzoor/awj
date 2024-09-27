import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import axios from '../api/axios'

export default function useLogin() {
    const navigate = useNavigate()

    // fetchData();

    const mutation = useMutation({
        mutationFn: async (body) =>
            await axios.post(`/Account/Login/login`, {
                ...body,
            }),

        onSuccess: ({ data }) => {
            if (data && data.success) {
                if (data.data && data.data.token) {
                    const { roleName } = data.data
                    console.log(data)

                    localStorage.setItem('roleName', roleName)
                    localStorage.setItem('department', data.data.department)

                    localStorage.setItem('token', data.data.token)
                    localStorage.setItem('userId', data.data.userId)
                    localStorage.setItem('userName', data.data.displayname)
                    localStorage.setItem('id', data.data.id)
                    localStorage.setItem('email', data.data.email)

                    // switch (roleName.toLowerCase()) {
                    //     case 'viewer':
                    //         navigate('/landbank')
                    //         break

                    //     default:
                    //         navigate('/analytics')
                    //         break
                    // }
                    navigate('/landbank')
                }
            } else {
                toast.error('Something went wrong')
            }
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.responseException?.exceptionMessage[0]
            )
        },
    })

    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const userName = formData.get('email')
        const password = formData.get('password')
        console.log(userName, password)

        mutation.mutateAsync({
            email: userName,
            password: password,
        })
    }
    console.log(mutation)

    return {
        handleSubmit,
        mutation,
    }
}
