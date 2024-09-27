import React, { useCallback, useEffect, useState } from 'react'
import Buyer from '../../assets/SalesCard/BuyerLogo.svg'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateLandAssetInfo,
    updateSalesData,
} from '../../features/forms/formSlice'
import axios from 'axios'
import { baseURL } from '../../lib/global'
import AddBuyerModal from '../Sales/AddBuyer'
import Loader from '../../components/ui/Loader'
import Label from '../../components/ui/Label'
import CustomSelect from '../../components/ui/CustomDropdown'
import { generateOptions } from '../../lib/options'
import { useStatusData } from '../../lib/Statusapi'
import {
    isRoleEditorApprover,
    isStatusDataNotSubmittedOrSentBack,
} from '../../lib/AcessCheck'
import SearchBuyerModal from './SearchBuyerModal'
import BuyerButton from './BuyerButton'

const BuyerCard = () => {
    const dispatch = useDispatch()
    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    const isEditable = useSelector((state) => state?.forms?.isEditable)
    const BuyerDetail =
        useSelector((state) => state.forms?.LandAssetInfo?.saleDetails) || {}
    const AssetInfo = useSelector((state) => state.forms?.LandAssetInfo) || {}
    const [SearchBuyer, setSearchBuyer] = useState('')
    const [showBuyerForm, setShowBuyerForm] = useState(false)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedBuyer, setSelectedBuyer] = useState(null)
    const [Emailerror, setEmailError] = useState('')

    const handleOnChange = useCallback((e) => {
        const value = e.target.value
        setSearchBuyer(value)
    }, [])

    const fetchBuyerData = async () => {
        if (SearchBuyer) {
            setIsLoading(true)
            setIsError(false)
            try {
                const response = await axios.get(
                    `${baseURL}Sales/GetBuyerDetails?search=${SearchBuyer}`
                )
                setData(response.data)
            } catch (err) {
                setIsError(true)
                console.log(
                    { err },
                    err.response.data.responseException.exceptionMessage[0]
                )
                setError(
                    err.response.data.responseException.exceptionMessage[0]
                )
            } finally {
                setIsLoading(false)
            }
        }
    }
    useEffect(() => {
        fetchBuyerData()
    }, [SearchBuyer])

    const getBuyerDetails = (id) => {
        const buyerData = data?.data.find((item) => item.buyerId === id)
        localStorage.setItem('buyerId', buyerData.id)
        setSelectedBuyer(buyerData)
        setIsOpen(false)
        setSearchBuyer('')
        // console.log(selectedBuyer?.id)
        setData(null)
    }
    const { data: BuyerCompanies, isLoading: isLoading1 } = useStatusData(
        'buyercompany',
        isEditable
    )
    const BuyerCompanyOptions = isEditable
        ? generateOptions(BuyerCompanies?.data, isLoading1, 'status', 'status')
        : []

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === 'companyNameEn') {
            const selectedField = BuyerCompanies?.data.find(
                (item) => item.status === value
            )
            dispatch(updateSalesData({ companyId: selectedField.id }))
        }
        dispatch(updateSalesData({ [name]: value }))
        dispatch(
            updateLandAssetInfo({
                saleDetails: {
                    ...BuyerDetail,
                    [name]: value,
                },
            })
        )
        if (selectedBuyer) {
            setSelectedBuyer({
                ...selectedBuyer,
                [name]: value,
            })
        }
    }
    const closeModal = () => {
        setIsOpen(false)
        setSearchBuyer('')
        setData(null)
        setError(null)
    }

    const hasPermissionToEditBuyer =
        isEditable &&
        department === 'Sales' &&
        isRoleEditorApprover(roleName) &&
        isStatusDataNotSubmittedOrSentBack(AssetInfo.status)

    return (
        <div className="px-6 py-6 grid gap-4">
            <div className="flex justify-between">
                <img src={Buyer} alt="buyer" />
                {isOpen && (
                    <SearchBuyerModal
                        SearchBuyer={SearchBuyer}
                        handleOnChange={handleOnChange}
                        data={data}
                        getBuyerDetails={getBuyerDetails}
                        closeModal={closeModal}
                        error={error}
                        isError={isError}
                        setShowBuyerForm={setShowBuyerForm}
                        showBuyerForm={showBuyerForm}
                        setSearchBuyer={setSearchBuyer}
                        setError={setError}
                        setData={setData}
                    />
                )}
            </div>
            <div className="flex gap-4 2xl:justify-between">
                <h2 className="text-2xl 2xl:text-[32px] leading-6 font-semibold text-primary-Main mb-4">
                    Buyer Details
                </h2>
                <BuyerButton setIsOpen={setIsOpen} />
            </div>

            {isLoading && <Loader />}
            <div className="grid gap-2 flex-wrap">
                <div className="grid grid-cols-2 gap-4">
                    <Label className="font-medium text-neutral-600 text-lg">
                        BuyerId
                    </Label>
                    {hasPermissionToEditBuyer && !selectedBuyer ? (
                        <input
                            name="buyerId"
                            type="text"
                            className="px-4 rounded-lg py-2 text-primary-600 outline-none border border-primary-400"
                            value={
                                (selectedBuyer && selectedBuyer?.buyerId) ||
                                BuyerDetail.buyerId
                            }
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span className="font-semibold flex gap-x-6 text-primary-600 text-lg overflow-hidden text-ellipsis whitespace-nowrap">
                            {BuyerDetail.buyerId ||
                                (selectedBuyer && selectedBuyer?.buyerId) ||
                                'NA'}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Label className="font-medium text-neutral-600 text-lg">
                        BuyerName
                    </Label>
                    {hasPermissionToEditBuyer && !selectedBuyer ? (
                        <input
                            name="buyerName"
                            type="text"
                            className="px-4 rounded-lg py-2 text-primary-600 outline-none border border-primary-400"
                            value={
                                (selectedBuyer && selectedBuyer?.buyerName) ||
                                BuyerDetail.buyerName
                            }
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span className="font-semibold text-primary-600 text-lg overflow-hidden text-ellipsis whitespace-nowrap">
                            {BuyerDetail.buyerName ||
                                (selectedBuyer && selectedBuyer?.buyerName) ||
                                'NA'}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Label className="font-medium text-neutral-600 text-lg">
                        BuyerEmail
                    </Label>
                    {hasPermissionToEditBuyer && !selectedBuyer ? (
                        <input
                            name="email"
                            type="text"
                            className="px-4 rounded-lg py-2 text-primary-600 outline-none border border-primary-400"
                            value={
                                (selectedBuyer && selectedBuyer?.email) ||
                                BuyerDetail.email
                            }
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span className="font-semibold text-primary-600 text-lg overflow-hidden text-ellipsis whitespace-nowrap">
                            {BuyerDetail.email ||
                                (selectedBuyer && selectedBuyer?.email) ||
                                'NA'}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Label className="font-medium text-neutral-600 text-lg">
                        BuyerMobile
                    </Label>
                    {hasPermissionToEditBuyer && !selectedBuyer ? (
                        <input
                            name="mobile"
                            type="text"
                            className="px-4 rounded-lg py-2 text-primary-600 outline-none border border-primary-400"
                            value={
                                (selectedBuyer && selectedBuyer?.mobile) ||
                                BuyerDetail.mobile
                            }
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span className="font-semibold text-primary-600 text-lg overflow-hidden text-ellipsis whitespace-nowrap">
                            {BuyerDetail.mobile ||
                                (selectedBuyer && selectedBuyer?.mobile) ||
                                'NA'}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Label className="font-medium text-neutral-600 text-lg">
                        BuyerCompany
                    </Label>
                    {hasPermissionToEditBuyer && !selectedBuyer ? (
                        <CustomSelect
                            name="companyNameEn"
                            options={BuyerCompanyOptions}
                            label="company"
                            onChange={handleInputChange}
                            value={
                                (selectedBuyer &&
                                    selectedBuyer?.companyNameEn) ||
                                BuyerDetail.companyNameEn
                            }
                        />
                    ) : (
                        <span className="font-semibold text-primary-600 text-lg overflow-hidden text-ellipsis whitespace-nowrap">
                            {BuyerDetail.companyNameEn ||
                                (selectedBuyer &&
                                    selectedBuyer?.companyNameEn) ||
                                'NA'}
                        </span>
                    )}
                </div>

                {showBuyerForm && (
                    <div>
                        <AddBuyerModal
                            setShowBuyerForm={setShowBuyerForm}
                            showBuyerForm={showBuyerForm}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default BuyerCard
