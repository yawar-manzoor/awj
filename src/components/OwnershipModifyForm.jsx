import React, { useState } from 'react'
import Cross from '../assets/Cross.svg'

const OwnershipForm = ({ showForm, toggleForm }) => {
    // State to store form input values
    const [formState, setFormState] = useState({
        refId: 'RUH-RBWA-SB01-0001', // This is a fixed value since the field is disabled
        assetName: '',
        subAssetName: '',
        area: '',
        landDescription: '',
        city: '',
        district: '',
        location: '',
    })

    // Function to handle changes to input fields
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormState((prev) => ({ ...prev, [name]: value }))
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault() // Prevent the form from actually submitting
        console.log(formState) // Log the current form state to the console
    }

    return (
        <>
            {showForm && (
                <div
                    className="fixed inset-0 bg-[#B0A68C] opacity-50 z-40"
                    onClick={toggleForm}
                ></div>
            )}
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-[32px] z-50 shadow-md absolute left-1/3 top-7">
                <div className="flex justify-between items-center mb-6 border-b-[1px] border-primary-500 pb-5">
                    <h2 className="text-2xl font-semibold text-primary-Main ">
                        Add/Modify Ownership Details
                    </h2>
                    <button onClick={toggleForm}>
                        <img src={Cross} alt="Close" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Ref ID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-neutral-400">
                                Ref Id
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full p-2 px-4 text-primary-500 placeholder-primary-500 border border-primary-400 rounded-lg bg-gray-100"
                                placeholder="RUH-RBWA-SB01-0001"
                                disabled
                                name="refId"
                                value={formState.refId}
                            />
                        </div>

                        {/* Asset Name */}
                        <div>
                            <label className="block text-neutral-400">
                                Asset Name
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full p-2 px-4 text-primary-500 placeholder-primary-500 border border-primary-400 rounded-lg"
                                placeholder="Asset Name"
                                name="assetName"
                                value={formState.assetName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* SUB-Asset Name & Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-neutral-400">
                                SUB-Asset Name
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full p-2 px-4 text-primary-500 placeholder-primary-500 border border-primary-400 rounded-lg"
                                placeholder="SUB-Asset Name"
                                name="subAssetName"
                                value={formState.subAssetName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-neutral-400">
                                Area M²
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full p-2 px-4 text-primary-500 placeholder-primary-500 border border-primary-400 rounded-lg"
                                placeholder="Enter Area"
                                name="area"
                                value={formState.area}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Land Description */}
                    <div className="mb-4">
                        <label className="block text-neutral-400">
                            Land Description
                        </label>
                        <textarea
                            className="mt-1 w-full p-2 px-4 text-primary-500 placeholder-primary-500 border border-primary-400 rounded-lg"
                            rows="3"
                            placeholder="Land Description"
                            name="landDescription"
                            value={formState.landDescription}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* City & District */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-neutral-400">
                                City
                            </label>
                            <select
                                className="mt-1 w-full p-2 px-4 text-primary-500 placeholder-primary-500 border border-primary-400 rounded-lg"
                                name="city"
                                value={formState.city}
                                onChange={handleChange}
                            >
                                <option value="">Select City</option>
                                <option value="City 1">City 1</option>
                                <option value="City 2">City 2</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-neutral-400">
                                District
                            </label>
                            <select
                                className="mt-1 w-full p-2 px-4 text-primary-500 placeholder-primary-500 border border-primary-400 rounded-lg"
                                name="district"
                                value={formState.district}
                                onChange={handleChange}
                            >
                                <option value="">Select District</option>
                                <option value="District 1">District 1</option>
                                <option value="District 2">District 2</option>
                            </select>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-neutral-400">
                            Location
                        </label>
                        <input
                            type="text"
                            className="mt-1 w-full p-2 px-4 text-primary-500 placeholder-primary-500 border border-primary-400 rounded-lg"
                            placeholder="Location"
                            name="location"
                            value={formState.location}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Update Button */}
                    <div className="ml-8">
                        <button
                            type="submit"
                            className="mt-5 px-6 py-3 text-white rounded-md bg-primary-Main"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default OwnershipForm
