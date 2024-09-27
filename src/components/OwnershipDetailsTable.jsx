import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { updateLandAssetInfo } from '../features/forms/formSlice'
import { ChevronLeft } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import OwnershipAddNewModal from './OwnershipAddNewModal'
import { useStatusData } from '../lib/Statusapi'
import { generateOptions } from '../lib/options'
import { setEditable } from '../features/forms/formSlice'
import { gregorianToHijri } from '../lib/utils'
import { baseURL } from '../lib/global'
import PulseLoader from 'react-spinners/PulseLoader'

function OwnershipDetailsTable({ refetch }) {
    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [deedToBeEditedIndex, setDeedToBeEditedIndex] = useState()
    const [isUpdating, setIsUpdating] = useState(false)
    const dispatch = useDispatch()
    const ownershipDetails = useSelector(
        (state) => state?.forms?.LandAssetInfo?.ownerShipDetails
    )
    const landInfo = useSelector((state) => state?.forms?.LandAssetInfo)
    const isEditable = useSelector((state) => state.forms.isEditable)
    const { idDeedDateEdited, isOwnerEdited, isDeedNumberEdted, status } =
        landInfo || {}

    const { data: deedOwner, isLoading: isLoading2 } = useStatusData(
        'owner',
        isEditable
    )
    let OwnerOptions = isEditable
        ? generateOptions(deedOwner?.data, isLoading2, 'status', 'status')
        : []

    // const { data: deedStatus, isLoading: isLoading3 } = useStatusData(
    //     'tds',
    //     isEditable
    // )
    // let tdStatusOptions = isEditable
    //     ? generateOptions(deedStatus?.data, isLoading2, 'status', 'status')
    //     : []
    const { data: deedType, isLoading: isLoading4 } = useStatusData(
        'TDT',
        isEditable
    )
    let tdTypeOptions = isEditable
        ? generateOptions(deedType?.data, isLoading2, 'status', 'status')
        : []
    console.log(tdTypeOptions, 'tdTypeOptions')

    console.log(OwnerOptions, 'owneroptititons')

    const handleFieldChange = (e, index = null) => {
        const { name, value } = e.target
        if (index !== null) {
            const updatedOwnerShipDetails = [...ownershipDetails]
            updatedOwnerShipDetails[index] = {
                ...updatedOwnerShipDetails[index],
                [name]: value,
            }
            dispatch(
                updateLandAssetInfo({
                    ownerShipDetails: updatedOwnerShipDetails,
                })
            )
        }
    }
    console.log(landInfo.status)

    console.log('IS Editable in Ownership ', isEditable)

    const hasOwnershipEditPermission =
        (roleName === 'Editor' || roleName === 'Approver') &&
        department === 'Land Bank' &&
        (landInfo?.status === 'Data Not Submitted' ||
            landInfo?.status === 'Send Back')

    console.log({ roleName, department, landInfostatus: landInfo.status })

    console.log(hasOwnershipEditPermission, 'hasEditPermission')

    const handleAddNew = () => {
        setShowModal(!showModal)
    }
    const handleUpdate = async (e, item) => {
        setIsUpdating(true)
        const hijriDate = gregorianToHijri(item.deedDate)

        const payload = {
            landId: landInfo.landId,
            titleDeedId: item.titleDeedId,
            deedStatus: null,
            deedNumber: item.deedNumber,
            deedDate: hijriDate,
            deedOwner: +item.owner,
            deedType: +item.deedType,
            deedUrl: null,
            deedSequence: null,
        }
        console.log(payload, 'update payloaddd')

        const response = await fetch(`${baseURL}Land/UpsertTitleDeed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        const data = await response.json()
        if (response.ok) {
            setIsUpdating(false)
            // setShowModal(false)
            setIsEdit(false)
            // dispatch(setEditable(false))
            refetch()
        }
    }
    console.log(ownershipDetails, 'ownershipdetailiii')

    return (
        <div className="flex flex-col gap-4">
            {showModal && (
                <OwnershipAddNewModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    landId={landInfo.landId}
                    sequenceNumber={ownershipDetails?.length}
                    refetch={refetch}
                />
            )}
            <div className="flex flex-col gap-12 ">
                <h3 className="text-[32px] text-[#7A7474] font-semibold">
                    Ownership Details
                </h3>

                <table className="bg-[#DFD9CA]/25 rounded-lg overflow-hidden border-separate border-spacing-y-2 pb-8 px-8">
                    <thead className="text-left text-[#837550] text-[16px] font-medium ">
                        <tr className="">
                            <th className="border-b  border-[#837550] ">
                                <div className="">
                                    <span className="mr-10 ml-4 font-normal">
                                        #
                                    </span>
                                    <span>TD Number</span>
                                </div>
                            </th>
                            <th className="border-b border-[#837550] ">
                                <div className="border-s border-[#AEA07A]  px-6 py-2 my-[10px]">
                                    TD Owner
                                </div>
                            </th>
                            <th className="border-b border-[#837550] ">
                                <div className="border-s border-[#AEA07A]  px-6 py-2 my-[10px]">
                                    TD Type
                                </div>
                            </th>
                            <th className="border-b border-[#837550] ">
                                <div className="border-s border-[#AEA07A]  px-6 py-2 my-[10px]">
                                    TD Date
                                </div>
                            </th>
                            <th className="border-b border-[#837550] ">
                                <div className="border-s border-[#AEA07A]  px-6 py-2 my-[10px]">
                                    Updated By
                                </div>
                            </th>
                            <th className="border-b border-[#837550] w-[10%]">
                                <div className="border-s border-[#AEA07A]  px-6 py-2 my-[10px]">
                                    TD File
                                </div>
                            </th>

                            <th
                                className={`border-b border-[#837550] w-[10%] ${
                                    (isEditable &&
                                        !hasOwnershipEditPermission) ||
                                    !isEditable
                                        ? ' hidden '
                                        : ''
                                }`}
                            >
                                <div
                                    onClick={() =>
                                        console.log(
                                            !isEditable,
                                            hasOwnershipEditPermission
                                        )
                                    }
                                    className="border-s border-[#AEA07A]  px-6 py-2 my-[10px]"
                                >
                                    Update
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ownershipDetails?.map((item, index) => (
                            <tr key={index} className="">
                                <td
                                    className={`${
                                        isDeedNumberEdted === 1 &&
                                        status === 'Waiting for Approval'
                                            ? 'text-[#487ADA]'
                                            : ' text-[#7A7474]'
                                    } rounded-s-[8px] bg-[#EFECE4] py-3 text-base`}
                                >
                                    {isEdit &&
                                    isEditable &&
                                    deedToBeEditedIndex === index ? (
                                        <input
                                            name="deedNumber"
                                            className="mr-10 ml-4 text-base text-[#7A7474] py-1 px-4 border border-[#BEB395] rounded-lg max-w-[150px] focus:outline-none"
                                            value={item.deedNumber}
                                            onChange={(e) =>
                                                handleFieldChange(e, index)
                                            }
                                        />
                                    ) : (
                                        <>
                                            <span className="mr-10 ml-4">{`${
                                                index < 10
                                                    ? '0' + (index + 1)
                                                    : index + 1
                                            }`}</span>
                                            <span>{item?.deedNumber}</span>
                                        </>
                                    )}
                                </td>
                                <td
                                    className={`${
                                        isOwnerEdited === 1 &&
                                        status === 'Waiting for Approval'
                                            ? 'text-[#487ADA]'
                                            : 'text-[#7A7474]'
                                    } bg-[#EFECE4] py-3 text-base`}
                                >
                                    <div className="border-s border-[#CEC6AF] px-6 py-1">
                                        {isEdit &&
                                        isEditable &&
                                        deedToBeEditedIndex === index ? (
                                            <select
                                                name="owner"
                                                className="text-base text-[#7A7474] py-1 px-4 border border-[#BEB395] rounded-lg max-w-[150px] focus:outline-none"
                                                value={
                                                    item?.owner
                                                        ? item?.owner
                                                        : 'NA'
                                                }
                                                onChange={(e) =>
                                                    handleFieldChange(e, index)
                                                }
                                            >
                                                {OwnerOptions.map(
                                                    (optionItem, index) => (
                                                        <option
                                                            value={
                                                                optionItem.id
                                                            }
                                                        >
                                                            {optionItem.label}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        ) : item?.owner ? (
                                            item?.owner
                                        ) : (
                                            'NA'
                                        )}
                                    </div>
                                </td>
                                <td
                                    className={`${
                                        isOwnerEdited === 1 &&
                                        status === 'Waiting for Approval'
                                            ? 'text-[#487ADA]'
                                            : 'text-[#7A7474]'
                                    } bg-[#EFECE4] py-3 text-base`}
                                >
                                    <div className="border-s border-[#CEC6AF] px-6 py-1">
                                        {isEdit &&
                                        isEditable &&
                                        deedToBeEditedIndex === index ? (
                                            <select
                                                name="deedType"
                                                className="text-base text-[#7A7474] py-1 px-4 border border-[#BEB395] rounded-lg max-w-[150px] focus:outline-none"
                                                value={
                                                    item?.deedType
                                                        ? item?.deedType
                                                        : 'NA'
                                                }
                                                onChange={(e) =>
                                                    handleFieldChange(e, index)
                                                }
                                            >
                                                {tdTypeOptions.map(
                                                    (optionItem) => (
                                                        <option
                                                            value={
                                                                optionItem.id
                                                            }
                                                        >
                                                            {optionItem.label}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        ) : item?.deedType ? (
                                            item?.deedType
                                        ) : (
                                            'NA'
                                        )}
                                    </div>
                                </td>
                                <td
                                    className={`${
                                        idDeedDateEdited === 1 &&
                                        status === 'Waiting for Approval'
                                            ? 'text-[#487ADA]'
                                            : 'text-[#7A7474]'
                                    } bg-[#EFECE4] py-3 text-base`}
                                >
                                    <div className="border-s border-[#CEC6AF] px-6 py-1">
                                        {isEdit &&
                                        isEditable &&
                                        deedToBeEditedIndex === index ? (
                                            <input
                                                name="deedDate"
                                                className="text-base text-[#7A7474] py-1 px-4 border border-[#BEB395] rounded-lg max-w-[150px] focus:outline-none"
                                                value={item?.deedDate}
                                                onChange={(e) =>
                                                    handleFieldChange(e, index)
                                                }
                                                type="date"
                                            />
                                        ) : item?.deedDate ? (
                                            item?.deedDate
                                        ) : (
                                            'NA'
                                        )}
                                    </div>
                                </td>
                                <td className="bg-[#EFECE4]  text-base text-[#7A7474] ">
                                    <div className="w-full flex border-s border-[#CEC6AF] px-6 py-1">
                                        {/* {isEdit &&
                                        isEditable &&
                                        deedToBeEditedIndex === index ? (
                                            <input
                                                name="updatedBy"
                                                className="text-base text-[#7A7474] py-[10px] px-4 border border-[#BEB395] rounded-lg max-w-[200px] focus:outline-none"
                                                value={'NULL'}
                                                onChange={(e) =>
                                                    handleFieldChange(e, index)
                                                }
                                            />
                                        ) : ( */}
                                        <>
                                            <span className="flex-1">
                                                {'NULL'}
                                            </span>
                                            <span className="flex-1 whitespace-nowrap">
                                                {item?.updatedAt
                                                    ? item.updatedAt
                                                    : ''}
                                            </span>
                                        </>
                                        {/* )} */}
                                    </div>
                                </td>
                                <td
                                    className={`bg-[#EFECE4] text-base text-[#7A7474] ${
                                        isEditable ? '' : 'rounded-e-[8px]'
                                    }`}
                                >
                                    <div className="pl-6 px-2 border-s border-[#CEC6AF]">
                                        <button
                                            disabled={true}
                                            className="bg-[#DFD9CA] text-[#837550] px-4 py-1 rounded font-semibold "
                                        >
                                            {isEditable &&
                                            department === 'Land Bank' &&
                                            (roleName === 'Editor' ||
                                                (roleName === 'Approver' &&
                                                    landInfo?.status ===
                                                        'Data Not Submitted'))
                                                ? 'Upload'
                                                : 'Download'}
                                        </button>
                                    </div>
                                </td>
                                <td
                                    className={`bg-[#EFECE4] text-base text-[#7A7474] rounded-e-[8px] ${
                                        !isEditable && 'hidden'
                                    }`}
                                >
                                    {/* department === 'Land Bank' &&
                                (roleName === 'Editor' ||
                                    (roleName === 'Approver' &&
                                        landassetinfo?.status ===
                                            'Data Not Submitted')) && ( */}

                                    <div className="pl-6 px-2 border-s border-[#CEC6AF]">
                                        <button
                                            onClick={
                                                isEdit &&
                                                deedToBeEditedIndex === index
                                                    ? (e) =>
                                                          handleUpdate(e, item)
                                                    : () => {
                                                          setDeedToBeEditedIndex(
                                                              index
                                                          )
                                                          setIsEdit(true)
                                                      }
                                            }
                                            className={`bg-[#DFD9CA] text-[#837550] px-4 py-1 rounded font-semibold  ${
                                                (isEditable &&
                                                    !hasOwnershipEditPermission) ||
                                                !isEditable
                                                    ? ' hidden '
                                                    : ''
                                            }`}
                                        >
                                            {isEdit &&
                                            isEditable &&
                                            deedToBeEditedIndex === index ? (
                                                isUpdating ? (
                                                    <PulseLoader
                                                        size={6}
                                                        color="#FFFFFF"
                                                    />
                                                ) : (
                                                    'Update'
                                                )
                                            ) : (
                                                'Edit'
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="self-end px-8 flex flex-col gap-[14px] items-end">
                {isEditable && hasOwnershipEditPermission && (
                    <button
                        onClick={handleAddNew}
                        className="bg-[#837550] px-6 py-3 rounded-lg text-base font-bold text-white"
                    >
                        Add New
                    </button>
                )}
                {/* <div className="flex items-center gap-4 ">
                    <button className="bg-[#EFECE4] rounded flex items-center justify-center">
                        <ChevronLeft className="w-6 h-8 stroke-1 text-[#837550]" />
                    </button>
                    <button className="bg-[#DFD9CA] rounded flex items-center justify-center">
                        <ChevronRight className="w-6 h-8 stroke-1 text-[#837550]" />
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default OwnershipDetailsTable
