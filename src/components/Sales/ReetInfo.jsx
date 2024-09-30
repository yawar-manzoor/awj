import { useSelector } from 'react-redux'
import paid from '../../assets/ApprovedLandBank.svg'
import downloadIcon from '../../assets/download-icon.svg'
import eyeview from '../../assets/SalesCard/EyeView.svg.svg'
import useWindowWidth from '../../hooks/useWindowWidth'
import { formatDate } from '../../lib/utils'
import {
    isRoleEditorApprover,
    isStatusDataNotSubmittedOrSentBack,
} from '../../lib/AcessCheck'
import CustomSelect from '../ui/CustomDropdown'
import { useDispatch } from 'react-redux'
import {
    setEditable,
    updateLandAssetInfo,
    updateSalesData,
} from '../../features/forms/formSlice'
import { generateOptions } from '../../lib/options'
import { useStatusData } from '../../lib/Statusapi'
import { baseURL } from '../../lib/global'
import { useState } from 'react'
import { useEffect } from 'react'
import Button from '../ui/Button'
import toast from 'react-hot-toast'
import axios from '../../api/axios'
import FileUpload from './FileUpload'


const ReetInfo = () => {
    const department = localStorage.getItem('department')
    const roleName = localStorage.getItem('roleName')
    const token = localStorage.getItem('token')
    const windowWidth = useWindowWidth()
    const dispatch = useDispatch()
    const reetInfo = useSelector(
        (state) => state?.forms?.LandAssetInfo?.saleDetails
    )
    const isEditable = useSelector((state) => state?.forms?.isEditable)
    const AssetInfo = useSelector((state) => state.forms?.LandAssetInfo) || {}
    const [openDropdown, setOpenDropdown] = useState(null)
    const [fileError, setFileError] = useState('')
    const [Attachment, setAttachments] = useState()
    const LandId = AssetInfo.landId
    const TitleDeedId = AssetInfo.titleDeed.titleDeedId

    const hasPermissionToEditRett =
        isEditable &&
        department === 'Land Bank' &&
        isRoleEditorApprover(roleName) &&
        isStatusDataNotSubmittedOrSentBack(AssetInfo.status)

    const { data: ReetStatus, isLoading: isLoading1 } = useStatusData(
        'ReetStatus',
        isEditable
    )
    const ReetStatusOptions = isEditable
        ? generateOptions(ReetStatus?.data, isLoading1, 'status', 'status')
        : []

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === 'reetStatus') {
            const SelectedId = ReetStatus.data.find(
                (item) => item.status === value
            )
            dispatch(updateSalesData({ reetStatusId: SelectedId.id }))
        }
        dispatch(updateSalesData({ [name]: value }))
        dispatch(
            updateLandAssetInfo({
                saleDetails: {
                    ...reetInfo,
                    [name]: value,
                },
            })
        )
    }

    // const handleFileUpload = async (e) => {
    //     const file = e.target.files[0]
    //     console.log('Selected file:', file)
    //     const formData = new FormData()
    //     formData.append('File', file)
    //     formData.append('LandId', LandId)
    //     formData.append('TdId', TitleDeedId)
    //     formData.append('AttachmentType', 2)

    //     if (file) {
    //         try {
    //             const response = await fetch(
    //                 `${baseURL}Land//AddAttachmentToOneDrive`,
    //                 {
    //                     method: 'POST',
    //                     body: formData,
    //                 }
    //             )

    //             if (response.ok) {
    //                 const data = await response.json()
    //                 console.log(data.data)
    //                 setAttachments(data.data)
    //                 setFileError('')
    //                 toast.success(data.messages)
    //                 // dispatch(setEditable(false))
    //                 console.log('File uploaded successfully')
    //             } else {
    //                 const errorResponse = await response.json()
    //                 console.log('File upload failed:', errorResponse)
    //                 // setFileError('File upload failed')
    //                 toast.error('File upload failed')
    //                 setAttachments(null)
    //                 // dispatch(setEditable(false))
    //             }
    //         } catch (error) {
    //             console.error('Error uploading file:', error)
    //             // dispatch(setEditable(false))
    //         }
    //     }
    // }
    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('File', file)
        formData.append('LandId', LandId)
        formData.append('TdId', TitleDeedId)
        formData.append('AttachmentType', 2)

        if (file) {
            try {
                const response = await axios.post(
                    `${baseURL}Land/AddAttachmentToOneDrive`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (response.status === 200) {
                    const data = response.data
                    console.log(data.data)
                    setAttachments(data.data)
                    setFileError('')
                    toast.success(data.messages)
                    console.log('File uploaded successfully')
                } else {
                    console.log('File upload failed:', response.data)
                    toast.error('File upload failed')
                    setAttachments(null)
                }
            } catch (error) {
                console.error('Error uploading file:', error)
                toast.error('Error uploading file')
            }
        }
    }
    useEffect(() => {
        if (isEditable) {
            setFileError(null)
        }
    }, [isEditable])
    console.log(reetInfo?.reetAmount)

    return (
        <div className="grid gap-4 pt-8  ">
            <h2 className="text-2xl font-semibold  text-primary-Main">
                Rett Information
            </h2>
            <div className="flex justify-between  flex-wrap rounded-lg bg-[#DFD9CA]/25 px-8 py-6">
                <div className="flex flex-1 gap-2 justify-between">
                    <div className="flex flex-col space-y-1">
                        <span className="font-normal text-base text-neutral-400">
                            RETT Number
                        </span>
                        {hasPermissionToEditRett ? (
                            <input
                                type="text"
                                name="reetNumber"
                                onChange={handleInputChange}
                                value={reetInfo?.reetNumber}
                                className="outline-none text-primary-Main px-4 py-2 rounded-lg border border-primary-400"
                            />
                        ) : (
                            <span className="font-semibold text-lg text-primary-600">
                                {reetInfo?.reetNumber
                                    ? reetInfo?.reetNumber
                                    : 'NA'}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="font-normal text-base text-neutral-400">
                            RETT Amount
                        </span>
                        {hasPermissionToEditRett ? (
                            <input
                                type="text"
                                name="reetAmount"
                                onChange={handleInputChange}
                                value={reetInfo?.reetAmount}
                                className="outline-none text-primary-Main px-4 py-2 rounded-lg border border-primary-400"
                            />
                        ) : (
                            <span className="font-semibold text-lg text-primary-600">
                                {reetInfo?.reetAmount &&
                                reetInfo.reetAmount !== null
                                    ? reetInfo?.reetAmount
                                    : 'NA'}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="font-normal text-base text-neutral-400 whitespace-nowrap">
                            RETT Status
                        </span>
                        {hasPermissionToEditRett ? (
                            <CustomSelect
                                name="reetStatus"
                                onChange={handleInputChange}
                                value={reetInfo?.reetStatus}
                                options={ReetStatusOptions}
                                openDropdown={openDropdown}
                                setOpenDropdown={setOpenDropdown}
                            />
                        ) : (
                            <span className="flex gap-2 text-primary-600 font-bold text-lg">
                                {reetInfo?.reetStatus ? (
                                    <>
                                        {reetInfo?.reetStatus == 'Paid' && (
                                            <img src={paid} alt="approved" />
                                        )}
                                        <span
                                            className={`${
                                                reetInfo?.reetStatus == 'Paid'
                                                    ? 'text-success'
                                                    : 'text-primary-600'
                                            }`}
                                        >
                                            {reetInfo?.reetStatus}
                                        </span>
                                    </>
                                ) : (
                                    'NA'
                                )}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="font-normal text-base text-neutral-400">
                            RETT Date
                        </span>
                        {hasPermissionToEditRett ? (
                            <input
                                type="date"
                                name="reetDate"
                                value={reetInfo?.reetDate}
                                onChange={handleInputChange}
                                className="outline-none text-primary-Main px-4 py-2 rounded border border-primary-400"
                            />
                        ) : (
                            <span className="font-semibold text-lg text-primary-600">
                                {reetInfo?.reetDate
                                    ? reetInfo?.reetDate !== 'NA'
                                        ? reetInfo?.reetDate
                                              .toString()
                                              .split('T')[0]
                                        : reetInfo?.reetDate
                                    : 'NA'}
                            </span>
                        )}
                    </div>
                </div>
                <div
                    className={`flex-1 flex ${
                        isEditable && windowWidth < 1300
                            ? 'mt-2'
                            : 'justify-end items-center'
                    }`}
                >
                    {hasPermissionToEditRett ? (
                        <FileUpload
                            handleFileUpload={handleFileUpload}
                            downloadIcon={downloadIcon}
                            // attachment={attachment}
                            fileError={fileError}
                        />
                    ) : (
                        reetInfo?.reetDate !== 'NA' && (
                            <Button className="h-fit border-dashed whitespace-nowrap bg-[#EFECE4]/50 border flex items-center border-primary-Main px-7 py-2 rounded-xl font-bold text-sm text-primary-Main">
                                <img
                                    src={eyeview}
                                    alt="download-icon"
                                    className="mr-2"
                                />
                                View RETT Invoice
                            </Button>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReetInfo
