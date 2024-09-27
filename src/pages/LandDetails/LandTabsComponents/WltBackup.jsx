import { useState } from 'react'
import paid from '../../../assets/ApprovedLandBank.svg'
import minus from '../../../assets/AssetCardIcons/minus-circle.svg'
import left from '../../../assets/AssetCardIcons/left-btn.svg'
import right from '../../../assets/AssetCardIcons/right-btn.svg'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateLandAssetInfo } from '../../../features/forms/formSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import axios from '../../../api/axios'
import { useNavigate } from 'react-router-dom'
import { setEditable } from '../../../features/forms/formSlice'

const calculateDaysLeft = (paymentDeadline) => {
    const currentDate = new Date()
    const deadlineDate = new Date(paymentDeadline)
    const diffTime = deadlineDate - currentDate
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return daysLeft > 0
        ? `${daysLeft} Days For Next Payment`
        : 'Payment Deadline Passed'
}

const WLT = () => {
    const [loading, setLoading] = useState(false)

    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    const isEditable = useSelector((state) => state.forms.isEditable)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const whiteLandDetails = useSelector(
        (state) => state.forms.LandAssetInfo.whiteLandDetails
    )

    const landassetinfo = useSelector((state) => state.forms.LandAssetInfo)

    const years = whiteLandDetails
        ? whiteLandDetails.map((detail) => detail.duration)
        : []

    const [selectedYearIndex, setSelectedYearIndex] = useState(0)

    const handleYearChange = (index) => {
        setSelectedYearIndex(index)
    }

    const handlePrevYear = () => {
        setSelectedYearIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : years.length - 1
            return newIndex
        })
    }

    const handleNextYear = () => {
        setSelectedYearIndex((prevIndex) => {
            const newIndex = prevIndex < years.length - 1 ? prevIndex + 1 : 0
            return newIndex
        })
    }

    const handleFieldChange = (e, year = null) => {
        const { name, value } = e.target
        if (year !== null) {
            const updatedWhiteLandDetails = whiteLandDetails.map((detail) =>
                detail.year === year
                    ? {
                          ...detail,
                          wltDetails: {
                              ...detail.wltDetails,
                              [name]: value,
                          },
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

    const handleWltData = async () => {
        try {
            const response = await axios.post('Land/LandUpdateAction', {
                landId: landassetinfo?.landId,
                action: 3,
            })
            console.log('API Response:', response.data)
            navigate('/landbank')
            dispatch(setEditable(false))
        } catch (error) {
            console.error('API Error:', error)
        }
    }

    return (
        <>
            <div className="my-2 flex justify-between">
                <h1 className="text-primary-Main font-semibold text-2xl">
                    WLT Tax Details
                </h1>
                {whiteLandDetails && whiteLandDetails.length > 0 && (
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
            {whiteLandDetails && whiteLandDetails.length > 0 ? (
                <>
                    {/* Year buttons */}
                    <div>
                        {whiteLandDetails.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleYearChange(index)}
                                className={`border-gray-200 border font-semibold px-3 py-2 text-base rounded-lg mr-1 ${
                                    selectedYearIndex === index
                                        ? 'bg-primary-Main text-primary-100'
                                        : 'bg-primary-100 text-neutral-500'
                                }`}
                            >
                                {item.duration}
                                {/* Display the duration year(s) */}
                            </button>
                        ))}
                    </div>

                    {/* Details Section */}
                    <div className="rounded-2xl mt-2 relative bg-primary-100">
                        {whiteLandDetails[selectedYearIndex] &&
                            whiteLandDetails[selectedYearIndex]
                                .wltDetails[0] && (
                                <div className=" pt-8">
                                    {/* Payment Deadline Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span
                                            className={`px-4 py-1 rounded-full text-sm font-medium ${
                                                calculateDaysLeft(
                                                    whiteLandDetails[
                                                        selectedYearIndex
                                                    ].wltDetails[0]
                                                        .paymentDeadline
                                                ) === 'Payment Deadline Passed'
                                                    ? 'bg-red-500 text-white border-white border'
                                                    : 'bg-[#F0E4CE] text-primaryYellow-500 border-[#F79708] border'
                                            }`}
                                        >
                                            {calculateDaysLeft(
                                                whiteLandDetails[
                                                    selectedYearIndex
                                                ].wltDetails[0].paymentDeadline
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex items-end leading-8 px-6">
                                        <div className="flex-shrink-0 mr-6">
                                            <div className="bg-primary-300 text-center py-2 px-4 rounded-md text-[32px] font-semibold text-primary-Main">
                                                <p>{selectedYearIndex + 1}</p>
                                                <div className="text-base font-medium text-primary-600">
                                                    Phase
                                                </div>
                                            </div>
                                        </div>

                                        {/* TD Number */}
                                        <div
                                            key={`finance-details-${selectedYearIndex}`}
                                            className="flex-1 flex items-center justify-between"
                                        >
                                            <div>
                                                <h4 className="text-base font-normal text-neutral-400">
                                                    TD Number
                                                </h4>
                                                {/* <p className="text-base font-semibold text-neutral-700">
                                                    {
                                                        whiteLandDetails[
                                                            selectedYearIndex
                                                        ].wltDetails[0].tdId
                                                    }
                                                </p> */}
                                                {console.log(
                                                    'sssssssssssssssssssssssssssss',
                                                    isEditable
                                                )}
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
                                                        value={
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0].tdId
                                                        }
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                e,
                                                                whiteLandDetails[
                                                                    selectedYearIndex
                                                                ].year
                                                            )
                                                        }
                                                        name="tdId"
                                                        className="border rounded px-2 w-40 text-primary-500"
                                                    />
                                                ) : (
                                                    <p className="text-base font-semibold text-neutral-700">
                                                        {
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0].tdId
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Amount */}
                                            <div>
                                                <h4 className="text-base font-normal text-neutral-400">
                                                    Amount
                                                </h4>
                                                {/* <p className="text-secondary font-semibold text-base leading-[20.16px]">
                                                    {whiteLandDetails[
                                                        selectedYearIndex
                                                    ].wltDetails[0].amount
                                                        ? `${parseFloat(
                                                              whiteLandDetails[
                                                                  selectedYearIndex
                                                              ].wltDetails[0]
                                                                  .amount
                                                          ).toLocaleString(
                                                              'en-US'
                                                          )} SAR`
                                                        : 'Null'}
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
                                                        value={
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0]
                                                                .amount
                                                        }
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                e,
                                                                whiteLandDetails[
                                                                    selectedYearIndex
                                                                ].year
                                                            )
                                                        }
                                                        name="amount"
                                                        className="border rounded px-2 w-40 text-primary-500"
                                                    />
                                                ) : (
                                                    <p className="text-base font-semibold text-neutral-700">
                                                        {whiteLandDetails[
                                                            selectedYearIndex
                                                        ].wltDetails[0].amount
                                                            ? `${parseFloat(
                                                                  whiteLandDetails[
                                                                      selectedYearIndex
                                                                  ]
                                                                      .wltDetails[0]
                                                                      .amount
                                                              ).toLocaleString(
                                                                  'en-US'
                                                              )} SAR`
                                                            : 'Null'}
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
                                                        value={
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0]
                                                                .invoiceNumber
                                                        }
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                e,
                                                                whiteLandDetails[
                                                                    selectedYearIndex
                                                                ].year
                                                            )
                                                        }
                                                        name="invoiceNumber"
                                                        className="border rounded px-2 w-40 text-primary-500"
                                                    />
                                                ) : (
                                                    <p className="text-base font-semibold text-neutral-700">
                                                        {whiteLandDetails[
                                                            selectedYearIndex
                                                        ].wltDetails[0]
                                                            .invoiceNumber ||
                                                            'Null'}
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
                                                        value={
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0]
                                                                .dueDate
                                                        }
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                e,
                                                                whiteLandDetails[
                                                                    selectedYearIndex
                                                                ].year
                                                            )
                                                        }
                                                        name="dueDate"
                                                        className="border rounded px-2 w-40 text-primary-500"
                                                    />
                                                ) : (
                                                    <p className="text-base font-semibold text-neutral-700">
                                                        {new Date(
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0].dueDate
                                                        ).toLocaleDateString() ||
                                                            'Null'}
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
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0]
                                                                .paymentDeadline
                                                        }
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                e,
                                                                whiteLandDetails[
                                                                    selectedYearIndex
                                                                ].year
                                                            )
                                                        }
                                                        name="paymentDeadline"
                                                        className="border rounded px-2 w-40 text-primary-500"
                                                    />
                                                ) : (
                                                    <p className="text-base font-semibold text-neutral-700">
                                                        {new Date(
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0].paymentDeadline
                                                        ).toLocaleDateString() ||
                                                            'Null'}
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
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0]
                                                                .notificationDate
                                                        }
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                e,
                                                                whiteLandDetails[
                                                                    selectedYearIndex
                                                                ].year
                                                            )
                                                        }
                                                        name="notificationDate"
                                                        className="border rounded px-2 w-40 text-primary-500"
                                                    />
                                                ) : (
                                                    <p className="text-base font-semibold text-neutral-700">
                                                        {new Date(
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0].notificationDate
                                                        ).toLocaleDateString() ||
                                                            'Null'}
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
                                                    department ===
                                                        'Land Bank' &&
                                                    (roleName === 'Editor' ||
                                                        (roleName ===
                                                            'Approver' &&
                                                            (landassetinfo?.status ===
                                                                'Data Not Submitted' ||
                                                                landassetinfo?.status ===
                                                                    'Send Back'))) ? (
                                                        <select
                                                            name="paymentStatus"
                                                            value={
                                                                whiteLandDetails[
                                                                    selectedYearIndex
                                                                ].wltDetails
                                                                    .paymentStatus
                                                            }
                                                            onChange={(e) =>
                                                                handleFieldChange(
                                                                    e,
                                                                    whiteLandDetails[
                                                                        selectedYearIndex
                                                                    ].year
                                                                )
                                                            }
                                                            className="border rounded px-2 w-40 text-primary-500"
                                                        >
                                                            <option value="Paid">
                                                                Paid
                                                            </option>
                                                            <option value="Unpaid">
                                                                Unpaid
                                                            </option>
                                                        </select>
                                                    ) : (
                                                        <>
                                                            {/* Conditionally render icon based on payment status */}
                                                            {whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0]
                                                                .paymentStatus ===
                                                            'Paid' ? (
                                                                <img
                                                                    src={paid} // Replace with your actual paid icon path
                                                                    alt="Paid"
                                                                    className="mr-2" // Add margin to separate icon from the text
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={minus} // Replace with your actual unpaid icon path
                                                                    alt="UnPaid"
                                                                    className="mr-2" // Add margin to separate icon from the text
                                                                />
                                                            )}
                                                            <p
                                                                className={`text-base font-semibold ${
                                                                    whiteLandDetails[
                                                                        selectedYearIndex
                                                                    ]
                                                                        .wltDetails[0]
                                                                        .paymentStatus ===
                                                                    'Paid'
                                                                        ? 'text-success'
                                                                        : 'text-primaryYellow-500'
                                                                }`}
                                                            >
                                                                {whiteLandDetails[
                                                                    selectedYearIndex
                                                                ].wltDetails[0]
                                                                    .paymentStatus ||
                                                                    'Null'}
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Objection Section */}
                                    <div className="mt-6 border-t py-4 bg-[#F7F5F2] px-6 rounded-2xl">
                                        <div className="flex gap-10">
                                            <div className="flex gap-2 items-start  flex-col">
                                                <h4 className="text-base font-normal text-neutral-400">
                                                    Objection Deadline
                                                </h4>
                                                {/* <p className="text-base font-semibold text-neutral-700">
                                                    {new Date(
                                                        whiteLandDetails[
                                                            selectedYearIndex
                                                        ].wltDetails[0].objDeadline
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
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0]
                                                                .objDeadline
                                                        }
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                e,
                                                                whiteLandDetails[
                                                                    selectedYearIndex
                                                                ].year
                                                            )
                                                        }
                                                        name="objDeadline"
                                                        className="border rounded px-2 w-40 text-primary-500"
                                                    />
                                                ) : (
                                                    <p className="text-base font-semibold text-neutral-700">
                                                        {new Date(
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0].objDeadline
                                                        ).toLocaleDateString() ||
                                                            'Null'}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex gap-2 items-start flex-col">
                                                <h4 className="text-base font-normal text-neutral-400 ">
                                                    Objection Status
                                                </h4>
                                                <div className="flex items-center">
                                                    {isEditable &&
                                                    department ===
                                                        'Land Bank' &&
                                                    (roleName === 'Editor' ||
                                                        (roleName ===
                                                            'Approver' &&
                                                            (landassetinfo?.status ===
                                                                'Data Not Submitted' ||
                                                                landassetinfo?.status ===
                                                                    'Send Back'))) ? (
                                                        <select
                                                            name="paymentStatus"
                                                            value={
                                                                whiteLandDetails[
                                                                    selectedYearIndex
                                                                ].wltDetails
                                                                    .objStatus
                                                            }
                                                            onChange={(e) =>
                                                                handleFieldChange(
                                                                    e,
                                                                    whiteLandDetails[
                                                                        selectedYearIndex
                                                                    ].year
                                                                )
                                                            }
                                                            className="border rounded px-2 w-40 text-primary-500"
                                                        >
                                                            <option value="Paid">
                                                                Paid
                                                            </option>
                                                            <option value="Unpaid">
                                                                Unpaid
                                                            </option>
                                                        </select>
                                                    ) : (
                                                        <>
                                                            {whiteLandDetails[
                                                                selectedYearIndex
                                                            ].wltDetails[0]
                                                                .objStatus ===
                                                            'Accepted' ? (
                                                                <img
                                                                    src={paid} // Replace with your actual plus icon path
                                                                    alt="Accepted"
                                                                    className="mr-2" // Margin to separate icon from text
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={minus} // Replace with your actual minus icon path
                                                                    alt="Rejected"
                                                                    className="mr-2" // Margin to separate icon from text
                                                                />
                                                            )}

                                                            {/* Display objection status text */}
                                                            <p
                                                                className={`text-base font-semibold ${
                                                                    whiteLandDetails[
                                                                        selectedYearIndex
                                                                    ]
                                                                        .wltDetails[0]
                                                                        .objStatus ===
                                                                    'Accepted'
                                                                        ? 'text-success'
                                                                        : 'text-primaryYellow-500'
                                                                }`}
                                                            >
                                                                {whiteLandDetails[
                                                                    selectedYearIndex
                                                                ].wltDetails[0]
                                                                    .objStatus ||
                                                                    'Null'}
                                                            </p>
                                                        </>
                                                    )}
                                                    {/* Conditionally render the icon based on objection status */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h4 className="text-base font-normal text-neutral-400 mb-4">
                                                Objection Description
                                            </h4>
                                            {/* <p className="text-base text-neutral-700">
                                                {whiteLandDetails[
                                                    selectedYearIndex
                                                ].wltDetails[0]
                                                    .objDescription ||
                                                    'No description available.'}
                                            </p> */}
                                            {console.log(
                                                'ssssssssssssssssssssssssss',
                                                isEditable
                                            )}
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
                                                <textarea
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            e,
                                                            whiteLandDetails[
                                                                selectedYearIndex
                                                            ].year
                                                        )
                                                    }
                                                    placeholder="Enter Description"
                                                    value={
                                                        whiteLandDetails[
                                                            selectedYearIndex
                                                        ].wltDetails[0]
                                                            .objDescription
                                                    }
                                                    name="Enter Objection"
                                                    className="w-full py-1.5 font-normal text-base placeholder:text-primary-500 text-primary-500 px-4 min-h-28 focus:outline-none border border-primary-400 rounded-lg"
                                                />
                                            ) : (
                                                <p className="text-base font-semibold text-neutral-700">
                                                    {
                                                        whiteLandDetails[
                                                            selectedYearIndex
                                                        ].wltDetails[0]
                                                            .objDescription
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </>
            ) : (
                <p>No data available</p>
            )}

            {isEditable &&
            department === 'Legal' &&
            ((roleName === 'Editor' &&
                landassetinfo?.status === 'Data Not Submitted') ||
                (roleName === 'Approver' &&
                    (landassetinfo?.status === 'Send Back' ||
                        landassetinfo?.status === 'Data Not Submitted'))) ? (
                <div className="mt-2 flex justify-end p-1">
                    <button
                        className="relative border font-bold text-base rounded-lg px-6 py-3 bg-primary-Main text-white"
                        onClick={handleWltData}
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
        </>
    )
}

export default WLT
