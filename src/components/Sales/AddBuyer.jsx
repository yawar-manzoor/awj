import React, { useState } from 'react'
import axios from 'axios'
import { X } from 'lucide-react'
import { baseURL } from '../../lib/global'
import { generateOptions } from '../../lib/options'
import { useSelector } from 'react-redux'
import CustomSelect from '../ui/CustomDropdown'
import useFetchData from '../../lib/FetchData'
import Input from '../ui/Input'
import Label from '../ui/Label'
import Button from '../ui/Button'

function AddBuyerModal({ setShowBuyerForm, showBuyerForm }) {
    const isEditable = useSelector((state) => state?.forms?.isEditable)
    const [formData, setFormData] = useState({
        buyerId: '',
        buyerName: '',
        buyerEmail: '',
        buyerMobile: '',
        companyId: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log({ name, value })
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const { data: BuyerCompanies, isLoading: isLoading1 } = useFetchData(
        `${baseURL}Asset/GetStatus?statusType=buyercompany`
    )

    const BuyerCompanyOptions = generateOptions(
        BuyerCompanies?.data,
        isLoading1,
        'status',
        'status'
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        const selectedCompany = BuyerCompanies?.data.find(
            (company) => company.status === formData.companyId
        )
        const newBuyer = {
            ...formData,
            id: null,
            companyId: selectedCompany.id,
        }
        console.log({ newBuyer })
        try {
            const response = await axios.post(
                `${baseURL}Land/UpsertBuyerDetails`,
                newBuyer
            )
            if (response.status === 200) {
                setFormData({
                    buyerId: '',
                    buyerName: '',
                    buyerEmail: '',
                    buyerMobile: '',
                    companyId: '',
                })
            }
            setShowBuyerForm(false)
        } catch (error) {
            setShowBuyerForm(false)
        }
    }

    return (
        <>
            <div
                onClick={() => setShowBuyerForm(!showBuyerForm)}
                className="fixed inset-0 w-full h-full bg-black/50 z-40"
            ></div>
            <div className="fixed w-1/2 bg-white rounded-lg z-50 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-7 py-6 space-y-8">
                <div className="flex items-center justify-between border-b border-[#AEA07A] pb-8">
                    <h3 className="text-[#4E4949] font-bold text-[32px]">
                        Add New Buyer Details
                    </h3>
                    <button className="bg-[#837550] p-3 rounded-full flex items-center justify-center">
                        <X
                            onClick={() => setShowBuyerForm(!showBuyerForm)}
                            className="text-white"
                        />
                    </button>
                </div>

                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[10px] text-[#7B7B7B] font-normal text-base">
                        <Label>Company</Label>
                        <CustomSelect
                            name="companyId"
                            value={formData.companyId}
                            onChange={handleChange}
                            label="Company"
                            options={BuyerCompanyOptions}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#7B7B7B] font-normal text-base">
                        <Label>BuyerId</Label>
                        <Input
                            className="px-4 py-3 border border-[#BEB395] rounded-lg focus:outline-none"
                            type="text"
                            name="buyerId"
                            placeholder="Enter BuyerId"
                            value={formData.buyerId}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col gap-[10px] text-[#7B7B7B] font-normal text-base">
                        <Label>BuyerName</Label>
                        <Input
                            className="px-4 py-3 border border-[#BEB395] rounded-lg focus:outline-none"
                            type="text"
                            name="buyerName"
                            placeholder="Enter BuyerName"
                            value={formData.buyerName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col gap-[10px] text-[#7B7B7B] font-normal text-base">
                        <Label>BuyerEmail</Label>
                        <Input
                            className="px-4 py-3 border border-[#BEB395] rounded-lg focus:outline-none"
                            type="text"
                            name="buyerEmail"
                            placeholder="Enter BuyerEmail"
                            value={formData.buyerEmail}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col gap-[10px] text-[#7B7B7B] font-normal text-base">
                        <Label>BuyerMobile</Label>
                        <Input
                            className="px-4 py-3 border border-[#BEB395] rounded-lg focus:outline-none"
                            type="text"
                            name="buyerMobile"
                            placeholder="Enter BuyerMobile"
                            value={formData.buyerMobile}
                            onChange={handleChange}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="text-center text-base font-bold text-white bg-[#837550] rounded-md px-6 py-[14px] mt-2 self-start"
                    >
                        Add New Buyer
                    </Button>
                </form>
            </div>
        </>
    )
}

export default AddBuyerModal
