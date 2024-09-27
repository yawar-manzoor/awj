import React, { useState, useRef } from 'react'
import chevron from '../../assets/chevron-down.svg'
import DownloadIcon from '../../assets/download-icon.svg'
import CloseIcon from '../../assets/close-icon.svg'
import CustomSelect from '../ui/CustomDropdown'
import useFetchData from '../../lib/FetchData'
import { baseURL } from '../../lib/global'
import { generateOptions } from '../../lib/options'

function AddLandTDDetails({ setCurrentStage }) {
    // Fields state
    const [tdNumber, setTdNumber] = useState('')
    const [tdOwner, setTdOwner] = useState('')
    const [tdDate, setTdDate] = useState('')
    const [tdStatus, setTdStatus] = useState('')
    const [fileName, setFileName] = useState('')

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0]
            if (
                ['image/jpeg', 'image/png', 'application/pdf'].includes(
                    file.type
                )
            ) {
                setFileName(file.name)
            } else {
                alert('Please upload a JPEG, PNG, or PDF file.')
                e.target.value = '' // Clear the file input
            }
        }
    }

    const handleFileRemove = () => {
        setFileName('')
        // Optionally clear the file input
        document.querySelector('input[type="file"]').value = ''
    }
    const { data: LandType, isLoading: isLoadingLandType } = useFetchData(
        `${baseURL}Asset/GetStatus?statusType=LandType`
    )
    const LandTypeOptions = generateOptions(
        LandType?.data,
        isLoadingLandType,
        'status',
        'status'
    )
    return (
        <>
            <div className="grid gap-4">
                <div className="border-b  space-y-2">
                    <h1 className="text-[24px] font-semibold text-neutral-600">
                        TD Details
                    </h1>
                    <p className="text-base font-normal py-4  text-neutral-400   max-w-3xl">
                        A title deed is a legal document that serves as evidence
                        of ownership of a property or land. It provides a
                        detailed description of the property and outlines the
                        rights and responsibilities of the owner.
                    </p>
                </div>

                {/* ------GRID 1 ----- */}
                <div className="grid grid-cols-6 grid-rows-1 gap-4">
                    {/* ---TD Number--- */}
                    <div className="col-span-2 flex flex-col">
                        <span className="mb-2 text-base font-medium text-neutral-400">
                            TD Number
                        </span>
                        <input
                            type="text"
                            name="TD Number"
                            placeholder="TD Number"
                            className={`py-2 px-2 rounded-lg border outline-none  text-primary-Main placeholder:text-primary-500`}
                            value={tdNumber}
                            onChange={(e) => setTdNumber(e.target.value)}
                        />
                    </div>
                    {/* ---TD Owner--- */}
                    <div className="col-span-2 flex flex-col">
                        <span className="mb-2 text-neutral-400 text-base font-medium">
                            TD Owner
                        </span>
                        <input
                            type="text"
                            name="TD Owner"
                            placeholder="Enter TD Owner Name"
                            className={`py-2 px-2 rounded-lg border outline-none  text-primary-Main placeholder:text-primary-500`}
                            value={tdOwner}
                            onChange={(e) => setTdOwner(e.target.value)}
                        />
                    </div>
                    {/* ---TD Date--- */}
                    <div className="col-span-2 flex flex-col">
                        <span className="mb-2 text-base font-medium text-neutral-400">
                            TD Date
                        </span>
                        <input
                            type="date"
                            name="TD Date"
                            className={`py-2 px-2 rounded-lg border outline-none border-primary-input
                             text-primary-Main placeholder:text-primary-500`}
                            value={tdDate}
                            onChange={(e) => setTdDate(e.target.value)}
                        />
                    </div>
                </div>
                {/* ------GRID 2 ----- */}
                <div className="grid grid-cols-6 grid-rows-1  gap-4">
                    {/* --Type-- */}
                    <div className="relative col-span-2 flex flex-col w-full">
                        <span className="mb-2 text-neutral-400 text-base font-medium">
                            Type
                        </span>
                        {/* <button
                            onClick={() => setIsTypeOpen(!isTypeOpen)}
                            className="w-full flex items-center justify-between p-3 rounded-lg text-primary-Main border border-primary-input bg-white text-sm text-left"
                            aria-expanded={isTypeOpen}
                        >
                            {selectedType?.typeName || 'Select Type'}
                            <img
                                src={chevron}
                                alt="Chevron Down"
                                className={`transform transition duration-200 ease-in-out ${
                                    isTypeOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {isTypeOpen && (
                            <ul
                                className={`absolute w-full bg-white border border-primary-input rounded-lg global-scroll mt-[33%] z-10 ${
                                    types?.data?.length > 0
                                        ? 'max-h-[200px] overflow-y-auto'
                                        : 'h-auto'
                                }`}
                                ref={typeRef}
                                role="listbox"
                            >
                                {types?.data?.length > 0 ? (
                                    types.data.map((type) => (
                                        <li
                                            key={type.id}
                                            onClick={() =>
                                                handleTypeClick(type)
                                            }
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            role="option"
                                        >
                                            {type.typeName}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-center text-gray-500 p-2">
                                        No Data Found
                                    </li>
                                )}
                            </ul>
                        )}
                        {errors.selectedType && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.selectedType}
                            </p>
                        )} */}
                        <CustomSelect
                            name="LandType"
                            value={''}
                            onChange={''}
                            label="Land Type"
                            options={LandTypeOptions}
                        />
                    </div>
                    {/* TD Status */}
                    <div className="col-span-2">
                        <p className="mt-2 text-neutral-400 text-base font-medium">
                            TD Status
                        </p>
                        <div className="flex  items-center mt-2 space-x-4 accent-primary-Main">
                            <label className=" flex ">
                                <input
                                    type="radio"
                                    name="tdStatus"
                                    value="active"
                                    className="form-radio"
                                    checked={tdStatus === 'active'}
                                    onChange={() => setTdStatus('active')}
                                />
                                <span className="ml-2 text-neutral-600 text-base font-semibold">
                                    Active
                                </span>
                            </label>
                            <label className=" flex">
                                <input
                                    type="radio"
                                    name="tdStatus"
                                    value="nonActive"
                                    className="form-radio"
                                    checked={tdStatus === 'nonActive'}
                                    onChange={() => setTdStatus('nonActive')}
                                />
                                <span className="ml-2 text-neutral-600 text-base font-semibold">
                                    In-Active
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                {/* TD Document Upload Section */}
                <div className="flex gap-4">
                    <div className="relative col-span-2 flex flex-col ">
                        <p className="text-neutral-600 font-medium text-base">
                            TD Document
                        </p>
                        <div className="border-dashed border-2 border-primary-400 bg-[#F6F5F1] rounded-lg px-6 py-2 mt-2 text-neutral-400 cursor-pointer relative flex items-center justify-between">
                            {/* Icon on the left */}
                            <div className="flex items-center">
                                <img
                                    src={DownloadIcon}
                                    alt="Download Icon"
                                    className="mr-4 w-14 h-20"
                                />
                            </div>

                            {/* Text on the right */}
                            <div className="text-left">
                                <p>
                                    Drag & drop files or{' '}
                                    <span className="text-primary-500">
                                        Browse
                                    </span>
                                </p>
                                <p className="mt-2 text-sm text-primary-500">
                                    Supported formats: JPEG, PNG, PDF
                                </p>
                            </div>

                            {/* Invisible file input */}
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                                accept=".jpeg,.jpg,.png,.pdf" // Restricts file types
                            />
                        </div>

                        {/* Show file name after upload */}
                        {fileName && (
                            <p className="mt-2 text-primary-Main flex bg-primary-200 rounded-md p-2 text-base font-normal gap-2 max-w-max">
                                {fileName}
                                <img
                                    src={CloseIcon}
                                    alt="close-icon"
                                    className="cursor-pointer"
                                    onClick={handleFileRemove}
                                />
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddLandTDDetails
