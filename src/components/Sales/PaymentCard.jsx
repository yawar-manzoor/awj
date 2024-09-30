import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/ui/Button'
import PaymentLogo from '../../assets/SalesCard/PaymentLogo.svg'
import eyeview from '../../assets/SalesCard/EyeView.svg.svg'
import downloadIcon from '../../assets/download-icon.svg'
import {
    setEditable,
    updateLandAssetInfo,
    updateSalesData,
} from '../../features/forms/formSlice'
import CustomSelect from '../../components/ui/CustomDropdown'
import {
    isRoleEditorApprover,
    isStatusDataNotSubmittedOrSentBack,
} from '../../lib/AcessCheck'
import { useStatusData } from '../../lib/Statusapi'
import { generateOptions } from '../../lib/options'
import { baseURL } from '../../lib/global'
import { useState } from 'react'
import FileUpload from './FileUpload'

const PaymentCard = () => {
    const department = localStorage.getItem('department')
    const roleName = localStorage.getItem('roleName')
    const dispatch = useDispatch()
    const isEditable = useSelector((state) => state.forms?.isEditable)
    const payment =
        useSelector((state) => state.forms?.LandAssetInfo?.saleDetails) || {}
    const AssetInfo = useSelector((state) => state.forms?.LandAssetInfo) || {}
    const [fileError, setFileError] = useState('')
    const [Attachment, setAttachments] = useState()
    const [openDropdown, setOpenDropdown] = useState(null)
    const LandId = AssetInfo.landId
    const TitleDeedId = AssetInfo.titleDeed.titleDeedId

    const hasPermissionToEditPayment =
        isEditable &&
        department === 'Sales' &&
        isRoleEditorApprover(roleName) &&
        isStatusDataNotSubmittedOrSentBack(AssetInfo?.status)

    const hasPermissionToEditPaymentTerms =
        isEditable &&
        department === 'Finance' &&
        isRoleEditorApprover(roleName) &&
        isStatusDataNotSubmittedOrSentBack(AssetInfo?.status)

    const { data: DepositStatus, isLoading: isLoading2 } = useStatusData(
        'DepositStatus',
        isEditable
    )
    const { data: CollectedStatus, isLoading: isLoading3 } = useStatusData(
        'CollectedStatus',
        isEditable
    )

    const DepositStatusOptions = isEditable
        ? generateOptions(DepositStatus?.data, isLoading2, 'status', 'status')
        : []
    const CollectedStatusOptions = isEditable
        ? generateOptions(CollectedStatus?.data, isLoading3, 'status', 'status')
        : []

    const handleInputChange = (e) => {
        const { name, value } = e.target
        console.log({ name, value }, 'in payment')
        if (name === 'collectedStatus') {
            const selectedstatus = CollectedStatus.data.find(
                (item) => item.status === value
            )
            dispatch(updateSalesData({ collectedStatus: selectedstatus.id }))
        }
        if (name === 'depositStatus') {
            const selectedstatus = DepositStatus.data.find(
                (item) => item.status === value
            )
            dispatch(updateSalesData({ depositStatus: selectedstatus.id }))
        }
        dispatch(updateSalesData({ [name]: value }))

        dispatch(
            updateLandAssetInfo({
                saleDetails: {
                    ...payment,
                    [name]: value,
                },
            })
        )
    }

    const handleDateChange = (e) => {
        const { value } = e.target
        dispatch(updateSalesData({ paymentDate: value }))

        dispatch(
            updateLandAssetInfo({
                saleDetails: {
                    ...payment,
                    paymentDate: value,
                },
            })
        )
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        console.log('Selected file:', file)
        const formData = new FormData()
        formData.append('File', file)
        formData.append('LandId', LandId)
        formData.append('TdId', TitleDeedId)
        formData.append('AttachmentType', 0)

        if (file) {
            try {
                const response = await fetch(
                    `${baseURL}Land/AddAttachmentToOneDrive`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                )

                if (response.ok) {
                    const data = await response.json()
                    console.log(data.data)
                    setAttachments(data.data)
                    setFileError('')
                    toast.success(data.messages)
                    // dispatch(setEditable(false))
                    console.log('File uploaded successfully')
                } else {
                    const errorResponse = await response.json()
                    console.log('File upload failed:', errorResponse)
                    // setFileError('File upload failed')
                    toast.error('File upload failed')
                    setAttachments(null)
                    // dispatch(setEditable(false))
                }
            } catch (error) {
                console.error('Error uploading file:', error)
                // dispatch(setEditable(false))
            }
        }
    }
    return (
        <div className="px-6 py-6 grid gap-4">
            <img src={PaymentLogo} alt="Payment" />
            <h2 className="text-2xl 2xl:text-[32px] leading-6 font-semibold text-primary-Main mb-4">
                Payment Details
            </h2>

            <div className="grid gap-4">
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="font-medium text-neutral-600 text-lg">
                        Payment Amount
                    </label>
                    {hasPermissionToEditPayment ? (
                        <input
                            type="text"
                            name="paymentAmount"
                            value={payment?.paymentAmount || ''}
                            onChange={handleInputChange}
                            className="font-semibold outline-none text-base border-primary-400 text-primary-500 border rounded-lg px-4 py-2"
                        />
                    ) : (
                        <span className=" text-lg text-secondary font-bold">
                            {payment?.paymentAmount || 'NA'}
                        </span>
                    )}
                </div>

                {/* Discount */}
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="font-medium text-neutral-600 text-lg">
                        Discount
                    </label>
                    {hasPermissionToEditPayment ? (
                        <input
                            type="text"
                            name="discount"
                            value={payment?.discount || ''}
                            onChange={handleInputChange}
                            className="font-semibold text-base outline-none border-primary-400 text-primary-500 border rounded-lg px-4 py-2"
                        />
                    ) : (
                        <span className=" text-lg text-secondary font-bold">
                            {payment?.discount || 'NA'}
                        </span>
                    )}
                </div>

                {/* VAT */}
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="font-medium text-neutral-600 text-lg">
                        VAT
                    </label>
                    {hasPermissionToEditPayment ? (
                        <input
                            type="text"
                            name="vat"
                            value={payment?.vat || ''}
                            onChange={handleInputChange}
                            className="font-semibold text-base border-primary-400 outline-none text-primary-500 border rounded-lg px-4 py-2"
                        />
                    ) : (
                        <span className=" text-lg text-secondary font-bold">
                            {payment?.vat || 'NA'}
                        </span>
                    )}
                </div>

                {/* Payment Terms */}
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="font-medium text-neutral-600 text-lg">
                        Payment Terms
                    </label>
                    {/* {hasPermissionToEditPaymentTerms ? (
                        <input
                            type="text"
                            name="paymentTerms"
                            value={payment?.paymentTerms || ''}
                            onChange={handleInputChange}
                            className="font-semibold text-base outline-none border-primary-400 text-primary-500 border rounded px-4 py-2"
                        />
                    ) : (
                        <span className="font-semibold text-lg text-primary-600">
                            {payment?.paymentTerms || 'NA'}
                        </span>
                    )} */}
                    <span className="font-semibold text-lg text-primary-600">
                        {payment?.paymentTerms || 'NA'}
                    </span>
                </div>

                {/* Payment Status */}
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="font-medium text-neutral-600 text-lg">
                        Payment Status
                    </label>
                    {/* {hasPermissionToEditPaymentTerms ? (
                        <CustomSelect
                            name="paymentStatus"
                            value={payment?.paymentStatus || ''}
                            onChange={handleInputChange}
                            options={PaymentStatusOptions}
                        />
                    ) : (
                        <span className="font-semibold text-lg text-primary-600">
                            {payment?.paymentStatus || 'NA'}
                        </span>
                    )} */}
                    <span className="font-semibold text-lg text-primary-600">
                        {payment?.paymentStatus || 'NA'}
                    </span>
                </div>

                {/* Collected Status */}
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="font-medium text-neutral-600 text-lg">
                        Collected Status
                    </label>
                    {hasPermissionToEditPaymentTerms ? (
                        <CustomSelect
                            name="collectedStatus"
                            value={payment?.collectedStatus || ''}
                            onChange={handleInputChange}
                            options={CollectedStatusOptions}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    ) : (
                        <span className="font-semibold text-lg text-primary-600">
                            {payment?.collectedStatus || 'NA'}
                        </span>
                    )}
                </div>

                {/* Deposit Status */}
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="font-medium text-neutral-600 text-lg">
                        Deposit Status
                    </label>
                    {hasPermissionToEditPaymentTerms ? (
                        <CustomSelect
                            name="depositStatus"
                            value={payment?.depositStatus || ''}
                            onChange={handleInputChange}
                            options={DepositStatusOptions}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    ) : (
                        <span className="font-semibold text-lg text-primary-600">
                            {payment?.depositStatus || 'NA'}
                        </span>
                    )}
                </div>

                {/* Payment Date */}
                <div className="grid grid-cols-2 items-center gap-4">
                    <label className="font-medium text-neutral-600 text-lg">
                        Payment Date
                    </label>
                    {hasPermissionToEditPayment ? (
                        <input
                            type="date"
                            name="paymentDate"
                            value={payment?.paymentDate || ''}
                            onChange={handleDateChange}
                            className="font-semibold outline-none text-base border-primary-400 text-primary-500 border rounded px-4 py-2"
                        />
                    ) : (
                        <span className="font-semibold text-lg text-primary-600">
                            {payment?.paymentDate &&
                            payment?.paymentDate !== 'NA'
                                ? payment?.paymentDate.toString().split('T')[0]
                                : payment?.paymentDate}
                        </span>
                    )}
                </div>
            </div>

            {isEditable &&
            department === 'Finance' &&
            isRoleEditorApprover(roleName) &&
            isStatusDataNotSubmittedOrSentBack(AssetInfo.status) ? (
                <>
                    <FileUpload
                        handleFileUpload={handleFileUpload}
                        downloadIcon={downloadIcon}
                        // attachment={attachment}
                        fileError={fileError}
                    />
                    {/* {fileError && (
                        <div className="text-red-500 text-sm">{fileError}</div>
                    )} */}
                </>
            ) : (
                <Button className="border-dashed w-fit mt-4 bg-[#EFECE4]/50 border flex items-center border-[#BEB395] px-5 py-2 rounded-xl font-bold text-sm text-primary-Main">
                    <img src={eyeview} alt="download-icon" className="mr-2" />
                    View Invoice
                </Button>
            )}
        </div>
    )
}

export default PaymentCard
