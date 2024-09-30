import React, { useState } from 'react'
import { X } from 'lucide-react'
import { baseURL } from '../../lib/global'
import { generateOptions } from '../../lib/options'
import CustomSelect from '../ui/CustomDropdown'
import useFetchData from '../../lib/FetchData'
import Input from '../ui/Input'
import Label from '../ui/Label'
import Button from '../ui/Button'

function AddBuyerModal({ setShowBuyerForm, showBuyerForm }) {
    const token = localStorage.getItem('token')
    const [formData, setFormData] = useState({
        buyerId: '',
        buyerName: '',
        buyerEmail: '',
        buyerMobile: '',
        companyId: '',
    })

    const [errors, setErrors] = useState({
        buyerIdError: '',
        buyerNameError: '',
        buyerEmailError: '',
        buyerMobileError: '',
        companyIdError: '',
        apiError: '',
    })

    const { data: BuyerCompanies, isLoading: isLoading1 } = useFetchData(
        `${baseURL}Asset/GetStatus?statusType=buyercompany`,
        token
    )

    const BuyerCompanyOptions = generateOptions(
        BuyerCompanies?.data,
        isLoading1,
        'status',
        'status'
    )

    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors({
            buyerIdError: '',
            buyerNameError: '',
            buyerEmailError: '',
            buyerMobileError: '',
            companyIdError: '',
            apiError: '',
        })
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({
            buyerIdError: '',
            buyerNameError: '',
            buyerEmailError: '',
            buyerMobileError: '',
            companyIdError: '',
            apiError: '',
        })

        let hasError = false
        if (!formData.buyerId) {
            setErrors((prev) => ({
                ...prev,
                buyerIdError: 'Buyer Id is required',
            }))
            hasError = true
        }
        if (!formData.buyerName) {
            setErrors((prev) => ({
                ...prev,
                buyerNameError: 'Buyer name is required',
            }))
            hasError = true
        }

        if (!formData.buyerMobile) {
            setErrors((prev) => ({
                ...prev,
                buyerMobileError: 'Buyer mobile is required',
            }))
            hasError = true
        }

        if (!validateEmail(formData.buyerEmail)) {
            setErrors((prev) => ({
                ...prev,
                buyerEmailError: 'Enter email or Invalid email format',
            }))
            hasError = true
        }

        const selectedCompany = BuyerCompanies?.data.find(
            (company) => company.status === formData.companyId
        )

        if (!selectedCompany) {
            setErrors((prev) => ({
                ...prev,
                companyIdError: 'Please select a  company',
            }))
            hasError = true
        }

        if (hasError) return

        const newBuyer = {
            ...formData,
            id: null,
            companyId: selectedCompany.id,
        }

        try {
            const response = await fetch(`${baseURL}Land/UpsertBuyerDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newBuyer),
            })

            if (response.status === 200) {
                setFormData({
                    buyerId: '',
                    buyerName: '',
                    buyerEmail: '',
                    buyerMobile: '',
                    companyId: '',
                })
                setShowBuyerForm(false)
            } else {
                setErrors((prev) => ({
                    ...prev,
                    apiError: 'Failed to submit data. Please try again.',
                }))
            }
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                apiError:
                    error.response.data.responseException.exceptionMessage,
            }))
        }
    }

    return (
        <>
            <div
                onClick={() => setShowBuyerForm(!showBuyerForm)}
                className="fixed inset-0 w-full h-full bg-black/50 z-40"
            ></div>

            <div className="fixed w-1/3 bg-white rounded-lg z-50 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-7 py-6 space-y-8">
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
                        {errors.companyIdError && (
                            <span className="text-red-500 text-sm">
                                {errors.companyIdError}
                            </span>
                        )}
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

                    {/* Buyer Name */}
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
                        {errors.buyerNameError && (
                            <span className="text-red-500 text-sm">
                                {errors.buyerNameError}
                            </span>
                        )}
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
                        {errors.buyerEmailError && (
                            <span className="text-red-500 text-sm">
                                {errors.buyerEmailError}
                            </span>
                        )}
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
                        {errors.buyerMobileError && (
                            <span className="text-red-500 text-sm">
                                {errors.buyerMobileError}
                            </span>
                        )}
                    </div>

                    {errors.apiError && (
                        <div className="text-red-500 text-sm">
                            {errors.apiError}
                        </div>
                    )}

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
