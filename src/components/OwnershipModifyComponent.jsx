import React, { useState } from 'react'
import OwnershipModifyForm from './OwnershipModifyForm'

const OwnershipModifyComponent = () => {
    const [showForm, setShowForm] = useState(false)

    function toggleForm() {
        setShowForm(!showForm)
    }
    return (
        <div className="px-9 py-7">
            <h1 className="text-[32px] leading-6 font-semibold mb-4 text-neutral-600">
                Land Overview
            </h1>
            <h2 className="text-base text-neutral-600 font-normal">
                Land Description
            </h2>
            <p className="text-neutral-400 text-base font-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                reprehenderit nesciunt eaque et praesentium nihil explicabo iste
                quod delectus possimus Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. In labore sit aliquid animi. Omnis nam
                cupiditate officiis placeat sunt iure?
            </p>
            <button
                onClick={toggleForm}
                className="mt-5 px-6 py-3 text-white rounded-md bg-primary-Main"
            >
                Update land Info
            </button>
            {showForm && (
                <OwnershipModifyForm
                    showForm={showForm}
                    toggleForm={toggleForm}
                />
            )}
        </div>
    )
}

export default OwnershipModifyComponent
