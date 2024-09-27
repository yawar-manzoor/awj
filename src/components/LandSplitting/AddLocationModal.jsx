import { XCircleIcon } from 'lucide-react'
import React from 'react'

function AddLocationModal({ showModal, setShowModal }) {
    return (
        <>
            <div className="fixed inset-0 w-full h-full bg-black/50 z-10"></div>
            <div className="fixed w-1/2 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-lg z-20 px-8 py-9 flex flex-col gap-7">
                <div className="pb-7 border-b border-[#BEB395] relative">
                    <XCircleIcon
                        className="absolute -right-4 -top-4 text-[#837550] stroke-2 cursor-pointer"
                        onClick={() => setShowModal(false)}
                    />
                    <h3 className="text-[#7A7474] font-semibold text-[26px]">
                        Request Details
                    </h3>
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor=""
                        className="text-[#7b7b7b] font-medium text-base"
                    >
                        Google Map Link
                    </label>
                    <input
                        type="text"
                        placeholder="Google Map Link"
                        className="py-3 px-4 placeholder:text-[#AEA07A] placeholder:text-base placeholder:font-normal border border-[#BEB395] rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <div>
                        <h4 className="text-2xl font-semibold text-[#7A7474]">
                            Land Location
                        </h4>
                        <p className="text-[#858E93] text-base font-normal ">
                            Draw your mark or outline a specific land area on
                            the map
                        </p>
                    </div>
                    <div className="min-h-[200px] border rounded-lg"></div>
                    <div className="flex justify-end gap-8">
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-10 py-3 rounded-lg text-[#837550] font-medium text-base border border-[#837550]"
                        >
                            Cancel
                        </button>
                        <button className="px-10 py-3 rounded-lg text-white font-medium text-base bg-[#837550]">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddLocationModal
