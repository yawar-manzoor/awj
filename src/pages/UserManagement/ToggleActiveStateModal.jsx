import React from 'react'
import Button from '../../components/ui/Button'
// import { t } from 'i18next'
import { baseURL } from '../../lib/global'
import { useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'

function ToggleActiveStateModal({
    isActive,
    setShowActiveStateModal,
    fetchUpdatedUsers,
    userId,
}) {
    const [isLoading, setIsLoading] = useState(false)
    const changeActiveState = async () => {
        setIsLoading(true)
        const url = `${baseURL}Users/ActiveInActiveUser?UserId=${userId}`

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error(data.messages[0])
            } else {
                setShowActiveStateModal(null)
                setIsLoading(false)
                fetchUpdatedUsers('')
                // toast.success(data.messages[0])
            }

            console.log(data, 'data')
        } catch (error) {
            setIsLoading(false)
            console.error(
                'There was a problem with the fetch operation:',
                error
            )
        }
    }
    return (
        <>
            <div className="black-overlay"></div>
            <div className="border rounded-lg  py-6 px-6 bg-white shadow-lg grid gap-2 z-50 fixed top-[50%] left-1/2 transform -translate-x-1/2  -translate-y-1/2">
                <div className="flex justify-center ">
                    <span className="text-sm sm:text-lg text-center text-black/80 font-medium">
                        Do you really want to{' '}
                        {isActive ? 'deactivate ' : 'activate'} this user?
                    </span>
                </div>
                <div className=" pt-4 flex gap-4   items-center justify-end">
                    <Button
                        type="button"
                        className="bg-gray-200 px-4 py-2 rounded"
                        translationKey={'Cancel'}
                        onClick={() => setShowActiveStateModal(null)}
                    />
                    <Button
                        type="button"
                        className="btn-submit"
                        onClick={changeActiveState}
                    >
                        {isLoading ? (
                            <PulseLoader color="#FFFFFF" />
                        ) : isActive ? (
                            'Deactivate'
                        ) : (
                            'Activate'
                        )}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ToggleActiveStateModal
