import { PlusCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import Modal from './Modal'

function SingleUserCard({ user }) {
    const [showModal, setShowModal] = useState(false)

    console.log(user, 'logginside single user card')
    const payload = {
        Id: user.id,
        DisplayName: user.displayName,
        GivenName: user.givenName,
        Surname: user.surname,
        UserPrincipalName: user.userPrincipalName,
        Mail: user.mail,
        JobTitle: user.jobTitle,
        MobilePhone: user.mobilePhone,
    }

    return (
        <>
            {showModal && (
                <div
                    onClick={() => setShowModal(!showModal)}
                    className="fixed w-screen h-dvh bg-black/50 z-20 inset-0 "
                ></div>
            )}
            <div className="flex border">
                <div className="flex-1 px-4 py-4 ">
                    <h1 className="text-[16px] font-semibold">
                        {user.displayName}
                    </h1>
                </div>
                <div className="flex-1 px-4 py-4 ">
                    <span className="text-xs">{user.mail}</span>
                </div>
                <div className="flex-1 px-4 py-4 ">
                    <span className="text-xs">{user.jobTitle}</span>
                </div>
                <div className="flex-1 px-4 py-4">
                    <button
                        onClick={() => setShowModal(!showModal)}
                        className="flex gap-2 items-center text-sm font-semibold border rounded-lg py-2 px-4"
                    >
                        Add User
                    </button>
                </div>
                {showModal && (
                    <Modal setShowModal={setShowModal} showModal={showModal} />
                )}
            </div>
        </>
    )
}

export default SingleUserCard
