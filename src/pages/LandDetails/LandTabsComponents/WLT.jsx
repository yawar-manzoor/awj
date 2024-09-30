import { useState, useEffect } from 'react'
import paid from '../../../assets/ApprovedLandBank.svg'
import minus from '../../../assets/AssetCardIcons/minus-circle.svg'
import left from '../../../assets/AssetCardIcons/left-btn.svg'
import right from '../../../assets/AssetCardIcons/right-btn.svg'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
    setInitialLandAssetInfo,
    updateLandAssetInfo,
} from '../../../features/forms/formSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import axios from '../../../api/axios'
import { useNavigate } from 'react-router-dom'
import { setEditable } from '../../../features/forms/formSlice'
import CustomSelect from '../../../components/ui/CustomDropdown'

const WLT = ({ refetch }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    const landassetinfo = useSelector((state) => state.forms.LandAssetInfo)
    const actionAssetId = useSelector(
        (state) => state.forms.LandAssetInfo?.assetId
    )
    console.log('landassetinfo', landassetinfo)

    const whiteLandDetails =
        useSelector((state) => state.forms.LandAssetInfo.whiteLandDetails) || []
    const isEditable = useSelector((state) => state.forms.isEditable)
    const dispatch = useDispatch()
    console.log(whiteLandDetails, 'whiteLandDetails in wlt tab ')

    const [selectedOwner, setSelectedOwner] = useState(null)
    const [selectedYearIndex, setSelectedYearIndex] = useState(0)

    const currentDetails = whiteLandDetails[selectedYearIndex]
    const owners = currentDetails?.wltDetails || []

    useEffect(() => {
        const currentYearOwners =
            whiteLandDetails[selectedYearIndex]?.wltDetails || []

        if (
            !selectedOwner ||
            !currentYearOwners.find(
                (owner) => owner.wltId === selectedOwner.wltId
            )
        ) {
            setSelectedOwner(
                currentYearOwners.length > 0 ? currentYearOwners[0] : null
            )
        }
    }, [whiteLandDetails, selectedYearIndex, selectedOwner])

    const handleYearChange = (index) => {
        setSelectedYearIndex(index)
    }

    const handlePrevYear = () => {
        setSelectedYearIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : whiteLandDetails.length - 1
        )
    }

    const handleNextYear = () => {
        setSelectedYearIndex((prevIndex) =>
            prevIndex < whiteLandDetails.length - 1 ? prevIndex + 1 : 0
        )
    }

    const handleFieldChange = (e) => {
        const { name, value } = e.target

        if (selectedOwner) {
            const updatedOwners = owners.map((owner) => {
                if (owner.wltId === selectedOwner.wltId) {
                    return {
                        ...owner,
                        [name]: value,
                    }
                }
                return owner
            })

            const updatedSelectedOwner = { ...selectedOwner, [name]: value }
            setSelectedOwner(updatedSelectedOwner)

            const updatedWhiteLandDetails = whiteLandDetails.map(
                (detail, index) =>
                    index === selectedYearIndex
                        ? {
                              ...detail,
                              wltDetails: updatedOwners,
                          }
                        : detail
            )

            dispatch(
                updateLandAssetInfo({
                    whiteLandDetails: updatedWhiteLandDetails,
                })
            )
        }
    }
    const formatDate = (date) => {
        if (!date) return '2024-09-24'

        if (typeof date !== 'string') {
            console.error('Invalid date format:', date)
            return '2024-09-24'
        }

        const [month, day, year] = date.split('/')

        if (!month || !day || !year) {
            console.error('Incomplete date:', date)
            return '2024-09-24'
        }

        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }

    const formatForAPI = async (whiteLandDetails) => {
        {
            console.log(
                'ppppppppppppppppppppppppppppp',
                selectedOwner.objStatus
            )
        }
        if (whiteLandDetails.length === 0) return null

        const payloads = []

        whiteLandDetails.forEach((detail) => {
            const upsertWlt = detail.wltDetails.map((wltDetail) => ({
                wltId: wltDetail.wltId || null,
                tdId: wltDetail.tdId || null,
                landID: landassetinfo?.landId,
                duration: null,
                wltPhase: wltDetail.wltPhase || null,
                masterPlanNoID: wltDetail.masterPlanNoID || null,
                statusOfSubTitleDeedID:
                    wltDetail.statusOfSubTitleDeedID || null,
                invoiceNumber: wltDetail.invoiceNumber || null,
                notificationDate: formatDate(wltDetail.notificationDate),
                tdOwnerID: wltDetail.tdOwnerID || null,
                ownershipPercentage: null,
                wltOrderNo: wltDetail.wltOrderNo || null,
                amount: wltDetail.amount || null,
                sadadNo: wltDetail.sadadNo || null,
                objDeadline: formatDate(wltDetail.objDeadline),
                paymentDeadline: formatDate(wltDetail.paymentDeadline),
                dueDate: formatDate(wltDetail.dueDate),
                paymentStatus: (() => {
                    if (wltDetail.paymentStatus === 'Paid') return 1
                    if (wltDetail.paymentStatus === 'Unpaid') return 2
                    if (wltDetail.paymentStatus === 'NA') return
                    return null
                })(),
                note: wltDetail.note || null,
                objDescription: wltDetail.objDescription || null,
                caseNumberBeforeTheBoardOfGrievances:
                    wltDetail.caseNumberBeforeTheBoardOfGrievances || null,
                objectionNumber: wltDetail.objectionNumber || null,
                circle: wltDetail.circle || null,
                dateOfSubmissionOfTheObjection: formatDate(
                    wltDetail.dateOfSubmissionOfTheObjection
                ),
                hearingTime: formatDate(wltDetail.hearingTime),

                objStatus: (() => {
                    const statusValue = (() => {
                        console.log('Current objStatus:', wltDetail.objStatus)

                        if (wltDetail.objStatus === 'Accepted') return 1
                        if (wltDetail.objStatus === 'Rejected') return 2
                        if (wltDetail.objStatus === 'NA') return null
                        return null
                    })()
                    console.log('Assigned objStatus:', statusValue)
                    return statusValue
                })(),
            }))

            const payload = {
                duration: null,
                upsertWlt: upsertWlt,
            }

            payloads.push(payload)
        })

        try {
            // Send all payloads to the API; modify this as needed if you only want to send one at a time
            const response = await axios.post('/Land/UpsertLandWLT', payloads, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log('API Response:', response.data)
            const data = await refetch()
            dispatch(setInitialLandAssetInfo(data?.data?.data))
            dispatch(setEditable(false))
        } catch (error) {
            console.error('API Error:', error)
            throw error
        }
    }

    const handleSubmit = async () => {
        try {
            const formattedData = await formatForAPI(whiteLandDetails)
            console.log('Formatted Data:', formattedData)

            const response = await axios.post(
                'Land/LandUpdateAction',
                {
                    landId: landassetinfo?.landId,
                    action: 3,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            console.log('API Response:', response.data)
            if (roleName === 'Approver') {
                navigate('/approver-analytics', {
                    state: { actionAssetId },
                })
            } else if (roleName === 'Editor') {
                navigate('/analytics', { state: { actionAssetId } })
            } else {
                navigate('/landbank')
            }
            dispatch(setEditable(false))
        } catch (error) {
            console.error('API Error:', error)
        }
    }

    const handleWltData = async () => {
        try {
            const response = await axios.post(
                'Land/LandUpdateAction',
                {
                    landId: landassetinfo?.landId,
                    action: 3,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log('API Response:', response.data)
            navigate('/landbank')
            dispatch(setEditable(false))
        } catch (error) {
            console.error('API Error:', error)
        }
    }
    return (
        <div>
            <div className="my-2 flex justify-between">
                <h1 className="text-primary-Main font-semibold text-2xl">
                    WLT Tax Details
                </h1>
                {whiteLandDetails.length > 1 && (
                    <div>
                        <button onClick={handlePrevYear}>
                            <img src={left} alt="Previous Year" />
                        </button>
                        <button onClick={handleNextYear}>
                            <img src={right} alt="Next Year" />
                        </button>
                    </div>
                )}
            </div>
            <div>
                {whiteLandDetails.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleYearChange(index)}
                        className={` font-semibold px-3 py-2 text-base rounded-lg mr-1 ${
                            selectedYearIndex === index
                                ? 'bg-primary-Main text-primary-100'
                                : 'bg-primary-100 text-neutral-500'
                        }`}
                    >
                        {item.duration}
                    </button>
                ))}
            </div>

            {/* <div>
                {whiteLandDetails.map((item, index) => (
                    <div key={index} className="mb-2">
                        {isEditable &&
                        department === 'Land Bank' &&
                        (roleName === 'Editor' ||
                            (roleName === 'Approver' &&
                                (landassetinfo?.status ===
                                    'Data Not Submitted' ||
                                    landassetinfo?.status === 'Send Back'))) ? (
                            <input
                                type="text"
                                name="duration"
                                value={item.duration}
                                onChange={
                                    (e) => handleFieldChange(e, index) // Reusing the same handleFieldChange for all fields
                                }
                                className="border rounded px-2 w-40 text-primary-500 text-center "
                            />
                        ) : (
                            <button
                                onClick={() => handleYearChange(index)}
                                className={`border-gray-200 border font-semibold px-3 py-2 text-base rounded-lg mr-1 ${
                                    selectedYearIndex === index
                                        ? 'bg-primary-Main text-primary-100'
                                        : 'bg-primary-100 text-neutral-500'
                                }`}
                            >
                                {item.duration}
                            </button>
                        )}
                    </div>
                ))}
            </div> */}

            {/* Owners List */}
            <div className="rounded-2xl mt-2 relative bg-primary-100 pt-5">
                {owners.length > 0 ? (
                    <div className="px-6">
                        <div className="flex gap-5 py-5 bg-primary-100 rounded-xl">
                            {owners.map((owner, index) => (
                                <p
                                    key={index}
                                    className={`cursor-pointer font-bold border-r px-3 py-2 rounded-lg ${
                                        selectedOwner?.wltId === owner.wltId
                                            ? 'bg-primary-300 text-primary-800'
                                            : 'text-neutral-700'
                                    }`}
                                    onClick={() => setSelectedOwner(owner)} // Update to the selected owner when clicked
                                >
                                    {owner.tdOwnerShip || `NA ${index + 1}`} -{' '}
                                    {owner.ownershipPercentage}%
                                </p>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="flex justify-center items-center py-10">
                        No data available
                    </p>
                )}

                {/* Selected Owner Details */}
                {selectedOwner ? (
                    <div className="mt-4">
                        <div className="flex items-end leading-8 px-6">
                            <div className="flex-shrink-0 mr-6">
                                <div className="bg-primary-300 text-center py-2 px-4 rounded-md text-[32px] font-semibold text-primary-Main">
                                    {/* <p> {selectedOwner.wltPhase || 'N/A'}</p> */}
                                    {isEditable &&
                                    department === 'Land Bank' &&
                                    (roleName === 'Editor' ||
                                        (roleName === 'Approver' &&
                                            (landassetinfo?.status ===
                                                'Data Not Submitted' ||
                                                landassetinfo?.status ===
                                                    'Send Back'))) ? (
                                        <input
                                            type="text"
                                            value={selectedOwner.wltPhase}
                                            onChange={handleFieldChange}
                                            name="wltPhase"
                                            className="border rounded px-2 w-20 text-primary-500 text-center outline-none focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-base font-semibold text-neutral-700">
                                            {selectedOwner.wltPhase || 'N/A'}
                                        </p>
                                    )}
                                    <div className="text-base font-medium text-primary-600">
                                        Phase
                                    </div>
                                </div>
                            </div>
                            <div
                                key={`finance-details-${selectedYearIndex}`}
                                className="flex-1 flex items-center justify-between"
                            >
                                <div>
                                    <h4 className="text-base font-normal text-neutral-400">
                                        TD Number
                                    </h4>

                                    {isEditable &&
                                    department === 'Land Bank' &&
                                    (roleName === 'Editor' ||
                                        (roleName === 'Approver' &&
                                            (landassetinfo?.status ===
                                                'Data Not Submitted' ||
                                                landassetinfo?.status ===
                                                    'Send Back'))) ? (
                                        <input
                                            type="text"
                                            value={selectedOwner.tdNumber}
                                            onChange={handleFieldChange}
                                            name="tdNumber"
                                            className="border rounded px-2 w-40 text-primary-500 text-center outline-none focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-base font-semibold text-neutral-700">
                                            {selectedOwner.tdNumber || 'N/A'}
                                        </p>
                                    )}
                                </div>

                                {/* Amount */}
                                <div>
                                    <h4 className="text-base font-normal text-neutral-400">
                                        Amount
                                    </h4>

                                    {isEditable &&
                                    department === 'Land Bank' &&
                                    (roleName === 'Editor' ||
                                        (roleName === 'Approver' &&
                                            (landassetinfo?.status ===
                                                'Data Not Submitted' ||
                                                landassetinfo?.status ===
                                                    'Send Back'))) ? (
                                        <input
                                            type="text"
                                            value={selectedOwner?.amount}
                                            onChange={handleFieldChange}
                                            name="amount"
                                            className="border rounded px-2 w-40 text-primary-500 outline-none focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-base font-semibold text-neutral-700">
                                            {selectedOwner.amount
                                                ? `${parseFloat(
                                                      selectedOwner.amount
                                                  ).toLocaleString(
                                                      'en-US'
                                                  )} SAR`
                                                : 'N/A'}
                                        </p>
                                    )}
                                </div>

                                {/* Invoice Number */}
                                <div>
                                    <h4 className="text-base font-normal text-neutral-400">
                                        Invoice Number
                                    </h4>
                                    {/* <p className="text-base font-semibold text-neutral-700">
                                                    {whiteLandDetails[
                                                        selectedYearIndex
                                                    ].wltDetails[0]
                                                        .invoiceNumber ||
                                                        'Null'}
                                                </p> */}
                                    {isEditable &&
                                    department === 'Land Bank' &&
                                    (roleName === 'Editor' ||
                                        (roleName === 'Approver' &&
                                            (landassetinfo?.status ===
                                                'Data Not Submitted' ||
                                                landassetinfo?.status ===
                                                    'Send Back'))) ? (
                                        <input
                                            type="text"
                                            value={selectedOwner.invoiceNumber}
                                            onChange={handleFieldChange} // No need to pass additional arguments
                                            name="invoiceNumber" // This should match the property name in the `selectedOwner` object
                                            className="border rounded px-2 w-40 text-primary-500 outline-none focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-base font-semibold text-neutral-700">
                                            {selectedOwner?.invoiceNumber ||
                                                'N/A'}
                                        </p>
                                    )}
                                </div>

                                {/* Due Date */}
                                <div>
                                    <h4 className="text-base font-normal text-neutral-400">
                                        Due Date
                                    </h4>
                                    {/* <p className="text-base font-semibold text-neutral-700">
                                                    {new Date(
                                                        whiteLandDetails[
                                                            selectedYearIndex
                                                        ].wltDetails[0].dueDate
                                                    ).toLocaleDateString() ||
                                                        'Null'}
                                                </p> */}
                                    {isEditable &&
                                    department === 'Land Bank' &&
                                    (roleName === 'Editor' ||
                                        (roleName === 'Approver' &&
                                            (landassetinfo?.status ===
                                                'Data Not Submitted' ||
                                                landassetinfo?.status ===
                                                    'Send Back'))) ? (
                                        <input
                                            type="date"
                                            value={selectedOwner?.dueDate}
                                            onChange={handleFieldChange}
                                            name="dueDate"
                                            className="border rounded px-2 w-40 text-primary-500 outline-none focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-base font-semibold text-neutral-700">
                                            {selectedOwner?.dueDate || 'NA'}
                                        </p>
                                    )}
                                </div>

                                {/* Payment Deadline */}
                                <div>
                                    <h4 className="text-base font-normal text-neutral-400">
                                        Payment Deadline
                                    </h4>
                                    {/* <p className="text-base font-semibold text-neutral-700">
                                                    {new Date(
                                                        whiteLandDetails[
                                                            selectedYearIndex
                                                        ].wltDetails[0].paymentDeadline
                                                    ).toLocaleDateString() ||
                                                        'Null'}
                                                </p> */}
                                    {isEditable &&
                                    department === 'Land Bank' &&
                                    (roleName === 'Editor' ||
                                        (roleName === 'Approver' &&
                                            (landassetinfo?.status ===
                                                'Data Not Submitted' ||
                                                landassetinfo?.status ===
                                                    'Send Back'))) ? (
                                        <input
                                            type="date"
                                            value={
                                                selectedOwner.paymentDeadline
                                            }
                                            onChange={handleFieldChange}
                                            name="paymentDeadline"
                                            className="border rounded px-2 w-40 text-primary-500 outline-none focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-base font-semibold text-neutral-700">
                                            {selectedOwner.paymentDeadline ||
                                                'N/A'}
                                        </p>
                                    )}
                                </div>

                                {/* Date of Notification */}
                                <div>
                                    <h4 className="text-base font-normal text-neutral-400">
                                        Date of Notification
                                    </h4>
                                    {/* <p className="text-base font-semibold text-neutral-700">
                                                    {new Date(
                                                        whiteLandDetails[
                                                            selectedYearIndex
                                                        ].wltDetails[0].notificationDate
                                                    ).toLocaleDateString() ||
                                                        'Null'}
                                                </p> */}
                                    {isEditable &&
                                    department === 'Land Bank' &&
                                    (roleName === 'Editor' ||
                                        (roleName === 'Approver' &&
                                            (landassetinfo?.status ===
                                                'Data Not Submitted' ||
                                                landassetinfo?.status ===
                                                    'Send Back'))) ? (
                                        <input
                                            type="date"
                                            value={
                                                selectedOwner?.notificationDate
                                            }
                                            onChange={handleFieldChange}
                                            name="notificationDate"
                                            className="border rounded px-2 w-40 text-primary-500 outline-none focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-base font-semibold text-neutral-700">
                                            {selectedOwner?.notificationDate ||
                                                'N/A'}
                                        </p>
                                    )}
                                </div>

                                {/* Payment Status */}
                                <div>
                                    <h4 className="text-base font-normal text-neutral-400">
                                        Payment Status
                                    </h4>
                                    <div className="flex items-center">
                                        {isEditable &&
                                        department === 'Land Bank' &&
                                        (roleName === 'Editor' ||
                                            (roleName === 'Approver' &&
                                                (landassetinfo?.status ===
                                                    'Data Not Submitted' ||
                                                    landassetinfo?.status ===
                                                        'Send Back'))) ? (
                                            <CustomSelect
                                                name="paymentStatus"
                                                onChange={handleFieldChange}
                                                value={
                                                    selectedOwner.paymentStatus
                                                }
                                                options={[
                                                    {
                                                        value: 'Paid',
                                                        label: 'Paid',
                                                    },
                                                    {
                                                        value: 'Unpaid',
                                                        label: 'Unpaid',
                                                    },
                                                ]}
                                                // className="border rounded  w-40 text-primary-500 outline-none focus:outline-none"
                                            />
                                        ) : (
                                            <>
                                                {/* Conditionally render icon based on payment status */}
                                                {selectedOwner?.paymentStatus ===
                                                '1' ? (
                                                    <img
                                                        src={paid} // Replace with your actual paid icon path
                                                        alt="Paid"
                                                        className="mr-2"
                                                    />
                                                ) : (
                                                    <img
                                                        src={minus} // Replace with your actual unpaid icon path
                                                        alt="Unpaid"
                                                        className="mr-2"
                                                    />
                                                )}
                                                <p
                                                    className={`text-base font-semibold ${
                                                        selectedOwner?.paymentStatus ===
                                                        '1'
                                                            ? 'text-success'
                                                            : 'text-primaryYellow-500'
                                                    }`}
                                                >
                                                    {selectedOwner?.paymentStatus ===
                                                    '1'
                                                        ? 'Paid'
                                                        : 'Unpaid'}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6  py-4 bg-[#F7F5F2] px-6 rounded-b-2xl">
                            <div className="flex gap-10">
                                <div className="flex gap-2 items-start  flex-col">
                                    <h4 className="text-base font-normal text-neutral-400">
                                        Objection Deadline
                                    </h4>

                                    {isEditable &&
                                    department === 'Land Bank' &&
                                    (roleName === 'Editor' ||
                                        (roleName === 'Approver' &&
                                            (landassetinfo?.status ===
                                                'Data Not Submitted' ||
                                                landassetinfo?.status ===
                                                    'Send Back'))) ? (
                                        <input
                                            type="date"
                                            value={selectedOwner.objDeadline}
                                            onChange={handleFieldChange}
                                            name="objDeadline"
                                            className="border rounded px-2 w-40 text-primary-500 focus-visible::outline-none"
                                        />
                                    ) : (
                                        <p className="text-base font-semibold text-neutral-700">
                                            {selectedOwner.objDeadline || 'N/A'}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-2 items-start flex-col">
                                    <h4 className="text-base font-normal text-neutral-400 ">
                                        Objection Status
                                    </h4>
                                    <div className="flex items-center">
                                        {isEditable &&
                                        department === 'Legal' &&
                                        ((roleName === 'Editor' &&
                                            (landassetinfo?.status ===
                                                'Send Back' ||
                                                landassetinfo?.status ===
                                                    'Data Not Submitted')) ||
                                            (roleName === 'Approver' &&
                                                (landassetinfo?.status ===
                                                    'Send Back' ||
                                                    landassetinfo?.status ===
                                                        'Data Not Submitted'))) ? (
                                            <CustomSelect
                                                name="objStatus"
                                                onChange={handleFieldChange}
                                                value={selectedOwner?.objStatus}
                                                options={[
                                                    {
                                                        value: 'Accepted',
                                                        label: 'Accepted',
                                                    },
                                                    {
                                                        value: 'Rejected',
                                                        label: 'Rejected',
                                                    },
                                                ]}
                                                // className="border rounded px-2 w-40 text-primary-500 outline-none focus:outline-none"
                                            />
                                        ) : (
                                            <>
                                                {selectedOwner?.objStatus ===
                                                'Accepted' ? (
                                                    <img
                                                        src={paid}
                                                        alt="Accepted"
                                                        className="mr-2"
                                                    />
                                                ) : selectedOwner?.objStatus ===
                                                  'Rejected' ? (
                                                    <img
                                                        src={minus}
                                                        alt="Rejected"
                                                        className="mr-2"
                                                    />
                                                ) : null}{' '}
                                                {/* Don't show any image if objStatus is 'NA' */}
                                                <p
                                                    className={`text-base font-semibold ${
                                                        selectedOwner?.objStatus ===
                                                        'Accepted'
                                                            ? 'text-success'
                                                            : selectedOwner?.objStatus ===
                                                              'Rejected'
                                                            ? 'text-primaryYellow-500'
                                                            : 'text-gray-500' // Optionally, define a style for 'NA' or other cases
                                                    }`}
                                                >
                                                    {selectedOwner?.objStatus ||
                                                        'Null'}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <h4 className="text-base font-normal text-neutral-400 mb-2">
                                    Note
                                </h4>

                                {isEditable &&
                                department === 'Land Bank' &&
                                (roleName === 'Editor' ||
                                    (roleName === 'Approver' &&
                                        (landassetinfo?.status ===
                                            'Data Not Submitted' ||
                                            landassetinfo?.status ===
                                                'Send Back'))) ? (
                                    <textarea
                                        onChange={handleFieldChange}
                                        placeholder="Enter Description"
                                        value={selectedOwner?.note}
                                        name="note"
                                        className="w-full py-1.5 font-normal text-base placeholder:text-primary-500 text-primary-500 px-4 min-h-28 border border-primary-400 rounded-lg outline-none focus:outline-none"
                                    />
                                ) : (
                                    <p className="text-base font-semibold text-neutral-700">
                                        {selectedOwner?.note || Null}
                                    </p>
                                )}
                            </div>
                            <div className="mt-2">
                                <h4 className="text-base font-normal text-neutral-400 mb-4">
                                    Objection Description
                                </h4>

                                {isEditable &&
                                department === 'Legal' &&
                                ((roleName === 'Editor' &&
                                    (landassetinfo?.status === 'Send Back' ||
                                        landassetinfo?.status ===
                                            'Data Not Submitted')) ||
                                    (roleName === 'Approver' &&
                                        (landassetinfo?.status ===
                                            'Send Back' ||
                                            landassetinfo?.status ===
                                                'Data Not Submitted'))) ? (
                                    <textarea
                                        onChange={handleFieldChange}
                                        placeholder="Enter Description"
                                        value={selectedOwner?.objDescription}
                                        name="objDescription"
                                        className="outline-none  w-full py-1.5 font-normal text-base placeholder:text-primary-500 text-primary-500 px-4 min-h-28 focus:outline-none border border-primary-400 rounded-lg"
                                    />
                                ) : (
                                    <p className="text-base font-semibold text-neutral-700">
                                        {selectedOwner?.objDescription || 'NA'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
            {/* <button onClick={handleSubmit}>Submit</button> */}
            {isEditable &&
            department === 'Legal' &&
            ((roleName === 'Editor' &&
                landassetinfo?.status === 'Data Not Submitted') ||
                landassetinfo?.status === 'Send Back' ||
                (roleName === 'Approver' &&
                    (landassetinfo?.status === 'Send Back' ||
                        landassetinfo?.status === 'Data Not Submitted'))) ? (
                <div className="mt-2 flex justify-end p-1">
                    <button
                        className="relative border font-bold text-base rounded-lg px-6 py-3 bg-primary-Main text-white"
                        onClick={handleSubmit}
                        // disabled={loading} // Uncomment this if needed
                    >
                        {/* {loading ? ( */}
                        {/* <div className="flex items-center justify-center p-1">
                <PulseLoader color="#ffffff" size={10} />
            </div>
            ) : ( */}
                        Submit
                        {/* )} */}
                    </button>
                </div>
            ) : null}
        </div>
    )
}

export default WLT
