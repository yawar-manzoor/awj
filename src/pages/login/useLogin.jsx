import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import axios from '../../api/axios'

export default function useLogin() {
    const navigate = useNavigate()

    // fetchData();

    const mutation = useMutation({
        // mutationFn: async (body) =>
        //     await axios.post(`/Account/Login/login`, {
        //         ...body,
        //     }),
        mutationFn: async (body) => {
            if (body.loginViaEmailPassword) {
                const response = await axios.post(`/Account/Login/login`, {
                    email: body.email,
                    password: body.password,
                })
                localStorage.setItem('regular-login', true)
                console.log(response, 'inside uselogin loginviaemailpasword')
                return response
            } else {
                // console.log(body, '....')

                const response = await axios.post(
                    `/Account/LoginWithMicrosoft?email=${body}`
                )
                // console.log(response, 'debunggggg')
                return response
            }
        },
        onSuccess: ({ data }) => {
            // console.log(data, 'daaatayyyy')

            if (data && data.success) {
                if (data.data && data.data.token) {
                    const { roleName, department } = data.data

                    // Storing the data in localStorage
                    localStorage.setItem('roleName', roleName)
                    localStorage.setItem('department', department)
                    localStorage.setItem('token', data.data.token)
                    localStorage.setItem('userId', data.data.userId)
                    localStorage.setItem('userName', data.data.displayname)
                    localStorage.setItem('id', data.data.id)
                    localStorage.setItem('email', data.data.email)

                    // Role and department-based navigation logic
                    if (
                        roleName.toLowerCase() === 'admin' &&
                        department.toLowerCase() === 'it'
                    ) {
                        navigate('/landadmin')
                    } else {
                        navigate('/landbank')
                    }
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
    const handleSubmitViaMS = (email) => {
        // console.log(email)
        if (!email) {
            toast.error('Email is required')
            return
        }
        mutation.mutateAsync(email)
    }
    function handleSubmitViaEmailPassword(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const email = formData.get('email')
        const password = formData.get('password')
        // console.log(email, password)

        mutation.mutateAsync({
            loginViaEmailPassword: true,
            email: email,
            password: password,
        })
    }
    // console.log(mutation)

    return {
        handleSubmitViaMS,
        handleSubmitViaEmailPassword,
        mutation,
    }
}
