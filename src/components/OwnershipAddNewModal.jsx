import { X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useStatusData } from '../lib/Statusapi'
import { useDispatch, useSelector } from 'react-redux'
import { generateOptions } from '../lib/options'
import { baseURL } from '../lib/global'
import PulseLoader from 'react-spinners/PulseLoader'
import { setEditable } from '../features/forms/formSlice'
import { gregorianToHijri } from '../lib/utils'

function OwnershipAddNewModal({
    showModal,
    setShowModal,
    landId,
    sequenceNumber,
    refetch,
}) {
    const [formDetails, setFormDetails] = useState({
        deedNumber: '',
        deedOwner: '',
        deedDate: '',
        deedType: '',
    })
    const [isUpdating, setIsUpdating] = useState(false)
    const uploadFileRef = useRef()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const isEditable = useSelector((state) => state.forms.isEditable)

    const { data: deedOwner, isLoading: isLoading2 } = useStatusData(
        'owner',
        isEditable
    )
    let OwnerOptions = isEditable
        ? generateOptions(deedOwner?.data, isLoading2, 'status', 'status')
        : []
    const { data: deedType, isLoading: isLoading4 } = useStatusData(
        'TDT',
        isEditable
    )
    let tdTypeOptions = isEditable
        ? generateOptions(deedType?.data, isLoading2, 'status', 'status')
        : []

    console.log(OwnerOptions, 'owneroptions')

    const handleFileUpload = () => {
        console.log('clicked')

        uploadFileRef.current.click()
    }

    console.log(gregorianToHijri('2024-09-09'), 'TTTTTTTTTTTTTTTTTTTT')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsUpdating(true)
        const hijriDate = gregorianToHijri(formDetails.deedDate)

        const payload = {
            landId: landId,
            titleDeedId: null,
            deedStatus: null,
            deedNumber: formDetails.deedNumber,
            deedDate: hijriDate,
            deedOwner: +formDetails.deedOwner,
            deedType: +formDetails.deedType,
            deedUrl: null,
            deedSequence: sequenceNumber,
        }
        console.log(payload)

        const response = await fetch(`${baseURL}Land/UpsertTitleDeed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        })
        const data = await response.json()
        if (response.ok) {
            setIsUpdating(false)
            setShowModal(false)
            // dispatch(setEditable(false))
            refetch()
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormDetails({ ...formDetails, [name]: value })
    }
    console.log(formDetails)

    return (
        <>
            <div
                onClick={() => setShowModal(!showModal)}
                className="fixed inset-0 w-full h-full bg-black/50 z-40"
            ></div>
            <div className="fixed w-1/2   bg-white  rounded-[32px] z-50 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-7 py-6 space-y-8">
                <div className="flex items-center justify-between border-b border-[#AEA07A] pb-8">
                    <h3 className="text-[#4E4949] font-bold text-[32px]">
                        Add New Ownership Details
                    </h3>
                    <button className="bg-[#837550] p-3 rounded-full flex items-center justify-center">
                        <X
                            onClick={() => setShowModal(!showModal)}
                            className="text-white "
                        />
                    </button>
                </div>
                <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[10px] text-[#7B7B7B] font-normal text-base placeholder:text-primary-[#AEA07A] placeholder:font-normal placeholder:text-base">
                        <label htmlFor="">TD Number</label>
                        <input
                            className="px-4 py-[6px] border border-[#BEB395] rounded-lg focus:outline-none"
                            type="text"
                            placeholder="Enter TD Number"
                            name="deedNumber"
                            required={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#7B7B7B] font-normal text-base placeholder:text-primary-[#AEA07A] placeholder:font-normal placeholder:text-base">
                        <label htmlFor="">TD Owner</label>
                        {/* <input
                            className="px-4 py-[6px] border border-[#BEB395] rounded-lg focus:outline-none"
                            type="text"
                            placeholder="Enter TD Owner"
                            name="deedOwner"
                            required={true}
                            onChange={handleChange}
                        /> */}
                        <select
                            onChange={handleChange}
                            name="deedOwner"
                            className="px-4 py-[6px] border border-[#BEB395] rounded-lg focus:outline-none"
                        >
                            {OwnerOptions.map((item) => (
                                <option value={item.id}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#7B7B7B] font-normal text-base placeholder:text-primary-[#AEA07A] placeholder:font-normal placeholder:text-base">
                        <label htmlFor="">TD Date</label>
                        <input
                            className="px-4 py-[6px] border border-[#BEB395] rounded-lg focus:outline-none"
                            type="date"
                            placeholder="Enter TD Date"
                            name="deedDate"
                            required={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#7B7B7B] font-normal text-base placeholder:text-primary-[#AEA07A] placeholder:font-normal placeholder:text-base">
                        <label htmlFor="">TD Type</label>

                        <select
                            onChange={handleChange}
                            name="deedType"
                            className="px-4 py-[6px] border border-[#BEB395] rounded-lg focus:outline-none"
                        >
                            {tdTypeOptions.map((item) => (
                                <option value={item.id}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="relative flex flex-col gap-[10px] my-4 text-[#7B7B7B] font-normal text-base placeholder:text-primary-[#AEA07A] placeholder:font-normal placeholder:text-base">
                        <div
                            onClick={handleFileUpload}
                            className="absolute inset-0 rounded-[4px] bg-[#DFD9CA] flex items-center justify-center text-[#837550] text-base font-semibold"
                        >
                            <span>Upload TD Document</span>
                        </div>
                        <input
                            ref={uploadFileRef}
                            className="px-4 py-[6px] border border-[#BEB395] rounded-lg"
                            type="file"
                            placeholder="Enter TD Date"
                            required={false}
                            name="deedDocument"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-center text-base font-bold text-white bg-[#837550] rounded-md px-6 py-[14px] mt-2 self-start min-w-[200px]"
                    >
                        {isUpdating ? (
                            <PulseLoader color="#FFFFFF" />
                        ) : (
                            'Add New Ownership'
                        )}
                    </button>
                </form>
            </div>
        </>
    )
}

export default OwnershipAddNewModal
