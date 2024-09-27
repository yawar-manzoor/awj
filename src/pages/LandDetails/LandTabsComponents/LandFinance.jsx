import paid from '../../../assets/ApprovedLandBank.svg'
import ok from '../../../assets/AssetCardIcons/tick-circle.svg'
import minus from '../../../assets/AssetCardIcons/minus-circle.svg'
import downloadIcon from '../../../assets/EyeIcon.svg'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    setEditable,
    updateLandAssetInfo,
} from '../../../features/forms/formSlice'
import CustomChart from './FinanceChart'
import SubmitButton from '../../../components/SubmitLandOverview'
import Button from '../../../components/ui/Button'
import axios from '../../../api/axios'
import PulseLoader from 'react-spinners/PulseLoader'
import { useEffect, useState } from 'react'
import { baseURL } from '../../../lib/global'

// Predefined options for select elements
const ZAKAT_OPTIONS = [
    { value: 'Yes', label: 'Yes', id: 1 },
    { value: 'No', label: 'No', id: 2 },
]

const ZAKAT_PAYMENT_OPTIONS = [
    { value: 'Done', label: 'Done', id: 1 },
    { value: 'Not Done', label: 'Not Done', id: 2 },
]

export default function LandFinance({ refetch }) {
    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    // console.log(roleName, department, 'roleName')
    const isEditable = useSelector((state) => state.forms.isEditable)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const FinanceDetails = useSelector(
        (state) => state.forms.LandAssetInfo?.financeDetails
    )
    const landInfo = useSelector((state) => state?.forms?.LandAssetInfo)
    const LandId = useSelector((state) => state.forms.LandAssetInfo?.landId)
    const [mapData, setMapData] = useState(FinanceDetails?.mapData)
    const handleMapDataChange = (index, field, value) => {
        setMapData((prevData) => {
            const newData = [...prevData]
            newData[index] = {
                ...newData[index],
                [field]: value,
                isModified: true, // Mark this item as modified
            }
            return newData
        })
    }

    useEffect(() => {
        if (isEditable && FinanceDetails?.mapData) {
            setMapData(FinanceDetails?.mapData)
        }
    }, [isEditable, FinanceDetails?.mapData])
    console.log('finaincineifnien', FinanceDetails)
    console.log(mapData, 'mapdata')
    // const handleInputChange = (field, value, id) => {
    //     console.log(`Field: ${field}, Value: ${value}, ID: ${id}`)

    //     // Calculate zakatValue only when the latestValue changes
    //     let updatedZakatValue = FinanceDetails?.zakatValue
    //     if (field === 'latestValue') {
    //         const newValue = Number(value)
    //         updatedZakatValue = newValue ? (newValue * 2.5) / 100 : 0
    //     }

    //     dispatch(
    //         updateLandAssetInfo({
    //             financeDetails: {
    //                 ...FinanceDetails,
    //                 [field]: value,
    //                 zakatValue: updatedZakatValue, // Update zakat value only on latestValue change
    //                 [`${field}Id`]: id,
    //             },
    //         })
    //     )
    // }
    // useEffect(() => {
    //     const fetchZakatValue = async () => {
    //         try {
    //             const response = await axios.get('/Land/GetZakatValue')
    //             if (response.status === 200 && response.data.success) {
    //                 const zakatValue = response.data.data.zakatValue

    //                 dispatch(
    //                     updateLandAssetInfo({
    //                         financeDetails: {
    //                             ...FinanceDetails,
    //                             zakatValue,
    //                         },
    //                     })
    //                 )
    //             } else {
    //                 console.error('Failed to fetch Zakat value:', response)
    //             }
    //         } catch (error) {
    //             console.error('Error fetching Zakat value:', error)
    //         }
    //     }

    //     fetchZakatValue() // Call the API on mount
    // }, [dispatch])

    const handleInputChange = (field, value, id) => {
        console.log(`Field: ${field}, Value: ${value}, ID: ${id}`)

        // Calculate zakatValue only when the latestValue changes
        let updatedZakatValue = FinanceDetails?.zakatValue
        if (field === 'latestValue') {
            const newValue = Number(value)
            updatedZakatValue = newValue ? (newValue * 2.5) / 100 : 0
        }

        dispatch(
            updateLandAssetInfo({
                financeDetails: {
                    ...FinanceDetails,
                    [field]: value,
                    zakatValue: updatedZakatValue, // Update zakat value only on latestValue change
                    [`${field}Id`]: id,
                },
            })
        )
    }
    const pricingData = [
        { label: 'Area', value: `${FinanceDetails?.area} MSQ` },
        {
            label: 'Latest Value',
            value: `${FinanceDetails?.latestValue} SAR`,
            field: 'latestValue', // field property for editing
        },
        {
            label: 'Valuation Price Per SQM ',
            value: `${
                FinanceDetails?.priceValue === 0
                    ? 0
                    : Math.floor(FinanceDetails?.priceValue * 100) / 100
            } SAR`,
        },
        {
            label: 'Book Value',
            value: `${FinanceDetails?.bookValue} SAR`,
            field: 'bookValue', // field property for editing
        },
        {
            label: 'Cost Price Per MSQ ',
            value: `${FinanceDetails?.costPerPrice} SAR`,
            field: 'costPerPrice', // field property for editing
        },
    ]

    const cardArr = [
        {
            label: 'Implication to Zakat',
            value: FinanceDetails?.zakatImplication || 'Not Available',
            field: 'zakatImplication',
            options: ZAKAT_OPTIONS,
            icon: FinanceDetails?.zakatImplication === 'Yes' ? ok : minus,
        },
        {
            label: 'Zakat Value',
            value:
                FinanceDetails?.zakatValue === 0
                    ? 0
                    : Math.floor(FinanceDetails?.zakatValue * 100) / 100,
            field: 'zakatValue',
        },
        {
            label: 'Zakat Payment',
            value: FinanceDetails?.zakatPayment,
            field: 'zakatPayment',
            options: ZAKAT_PAYMENT_OPTIONS,
            icon: FinanceDetails?.zakatPayment === 'Done' ? ok : minus,
        },
    ]
    const latestValue = FinanceDetails?.latestValue || 0
    const bookValue = FinanceDetails?.bookValue || 0

    const percentDiff =
        bookValue === 0 ? 'N/A' : ((latestValue - bookValue) / bookValue) * 100

    const formattedPercentDiff =
        typeof percentDiff === 'number'
            ? `${percentDiff.toFixed(2)}%`
            : percentDiff

    const PriceIndicator = ({ value }) => (
        <span
            className={` rounded-md border-2 ${
                value > 0
                    ? 'bg-[#299764]/10 text-success border-success'
                    : 'border-red-500 text-red-500'
            }  px-2 text-sm flex items-center`}
        >
            {value}
            {value > 0 ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide ms-1 lucide-trending-up"
                >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trending-down"
                >
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                    <polyline points="16 17 22 17 22 11" />
                </svg>
            )}
        </span>
    )
    // const handleFinanceData = async () => {
    //     setLoading(true)

    //     const payload = {
    //         landId: LandId,
    //         latestValue: FinanceDetails?.latestValue,
    //         bookValue: FinanceDetails?.bookValue,
    //         costPer: FinanceDetails?.costPerPrice,
    //         zakatImplication: FinanceDetails?.zakatImplicationId,
    //         zakatPayment: FinanceDetails?.zakatPaymentId,
    //     }

    //     console.log('Payload:', payload)

    //     try {
    //         // First API call: UpsertFinance
    //         const response = await axios.post('Land/UpsertFinance', payload)

    //         if (response.status === 200) {
    //             console.log('Data updated successfully!')

    //             // Second API call: LandUpdateAction
    //             const secondApiPayload = {
    //                 landId: LandId,
    //                 action: 3,
    //             }

    //             const secondResponse = await axios.post(
    //                 'Land/LandUpdateAction',
    //                 secondApiPayload
    //             )

    //             if (secondResponse.status === 200) {
    //                 console.log('Land update action completed successfully!')
    //                 refetch() // Re-fetch the updated data if necessary
    //                 dispatch(setEditable(!isEditable)) // Update the editable state
    //             } else {
    //                 console.error(
    //                     'Error updating land action:',
    //                     secondResponse.statusText
    //                 )
    //             }
    //         } else {
    //             console.error(
    //                 'Error updating finance data:',
    //                 response.statusText
    //             )
    //         }
    //     } catch (error) {
    //         console.error('Error during API calls:', error)
    //     } finally {
    //         setLoading(false) // Ensure loading is turned off after both API calls
    //     }
    // }
    const handleFinanceData = async () => {
        setLoading(true)

        try {
            const updateFinanceTables = mapData?.map((item) => ({
                financeId: item.financeId,
                bookValue: parseFloat(item.value),
                year: `${item.year}-01-01T00:00:00.000Z`,
            }))

            const payload = {
                landId: LandId,
                latestValue: FinanceDetails?.latestValue,
                bookValue: FinanceDetails?.bookValue,
                costPer: FinanceDetails?.costPerPrice,
                zakatImplication: FinanceDetails?.zakatImplicationId,
                zakatPayment: FinanceDetails?.zakatPaymentId,
                updateFinanceTables, // Add the finance table updates here
            }

            console.log('Payload:', payload)

            const response = await axios.post('Land/UpsertFinance', payload)

            if (response.status === 200) {
                console.log('Data updated successfully!')

                // Second API call: LandUpdateAction
                const secondApiPayload = {
                    landId: LandId,
                    action: 3,
                }

                const secondResponse = await axios.post(
                    'Land/LandUpdateAction',
                    secondApiPayload
                )

                if (secondResponse.status === 200) {
                    console.log('Land update action completed successfully!')
                    refetch() // Re-fetch the updated data if necessary
                    dispatch(setEditable(!isEditable))

                    // Navigate based on roleName
                    if (roleName === 'Approver') {
                        navigate('/landbank')
                    } else {
                        navigate('/landbank')
                    } // Update the editable state
                } else {
                    console.error(
                        'Error updating land action:',
                        secondResponse.statusText
                    )
                }
            } else {
                console.error(
                    'Error updating finance data:',
                    response.statusText
                )
            }
        } catch (error) {
            console.error('Error during API calls:', error)
        } finally {
            setLoading(false)
        }
    }

    // console.log(landInfo?.status)

    return (
        <>
            <div className="grid grid-cols-[3fr,2.2fr] gap-16">
                <div className="text-primary-Main">
                    <h1 className="font-semibold text-2xl">Land Price Chart</h1>
                    <p className="text-base font-normal">
                        Collecting data from January 1st Each Year
                    </p>
                    {isEditable &&
                    department === 'Finance' &&
                    (roleName === 'Editor' || roleName === 'Approver') &&
                    (landInfo?.status === 'Data Not Submitted' ||
                        landInfo?.status === 'Send Back') ? (
                        <div className="mt-4">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b px-2 py-2">
                                            Year
                                        </th>
                                        <th className="border-b px-4 py-2">
                                            Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mapData?.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="bg-neutral-100"
                                        >
                                            <td className="py-3 px-4">
                                                <input
                                                    type="number"
                                                    value={item.year}
                                                    onChange={(e) =>
                                                        handleMapDataChange(
                                                            index,
                                                            'year',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            </td>
                                            <td className="py-2 px-4">
                                                <input
                                                    type="number"
                                                    value={item.value}
                                                    onChange={(e) =>
                                                        handleMapDataChange(
                                                            index,
                                                            'value',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <CustomChart financeDetails={FinanceDetails} />
                    )}
                </div>

                <div>
                    <h1 className="text-primary-Main font-semibold text-2xl py-2">
                        Pricing Summary
                    </h1>

                    <div className="bg-gray-50 rounded-lg">
                        {pricingData.map((item, index) => (
                            <div
                                key={index}
                                className={`py-4 flex justify-between ${
                                    index % 2 === 0
                                        ? 'bg-[#DFD9CA]/25'
                                        : 'bg-[#DFD9CA]/10'
                                } ${
                                    index === 0
                                        ? 'rounded-t-lg'
                                        : index === pricingData.length - 1
                                        ? 'rounded-b-lg'
                                        : ''
                                }`}
                            >
                                <span className="text-neutral-600 text-lg px-6">
                                    {item.label}
                                </span>
                                {index === 1 && (
                                    <PriceIndicator
                                        value={formattedPercentDiff}
                                    />
                                )}
                                <span
                                    className={`px-6 font-bold ${
                                        index === 0
                                            ? 'text-primary-600'
                                            : 'text-secondary'
                                    }`}
                                >
                                    {/* {isEditable &&
                                    department === 'Finance' &&
                                    (roleName === 'Editor' ||
                                        (roleName === 'Approver' &&
                                            landInfo?.status ===
                                                'Data Not Submitted') ||
                                        landInfo?.status === 'Send Back') &&
                                    (item.field === 'latestValue' ||
                                        item.field === 'bookValue' ||
                                        item.field === 'costPerPrice') ? (
                                        <input
                                            type=""
                                            value={
                                                Number(
                                                    FinanceDetails?.[item.field]
                                                ) || ''
                                            }
                                            name={item.field}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    item.field,
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded px-4 py-1 w-40 text-primary-500 outline-none  border-primary-400"
                                        />
                                    ) : (
                                        item.value
                                    )} */}

                                    {isEditable &&
                                    department === 'Finance' &&
                                    (roleName === 'Editor' ||
                                        (roleName === 'Approver' &&
                                            landInfo?.status ===
                                                'Data Not Submitted') ||
                                        landInfo?.status === 'Send Back') &&
                                    (item.field === 'latestValue' ||
                                        item.field === 'bookValue' ||
                                        item.field === 'costPerPrice' ||
                                        item.field === 'zakatValue') ? ( // Include zakatValue field
                                        <input
                                            type="number"
                                            value={
                                                Number(
                                                    FinanceDetails?.[item.field]
                                                ) || ''
                                            }
                                            name={item.field}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    item.field,
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded px-4 py-1 w-40 text-primary-500 outline-none  border-primary-400"
                                        />
                                    ) : (
                                        item.value
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {((roleName === 'Viewer' && department === 'Finance') ||
                (roleName === 'Admin' && department === 'Finance') ||
                (roleName === 'Approver' && department === 'Finance') ||
                (roleName === 'Editor' && department === 'Finance') ||
                department === 'IT') && (
                <div className="my-6">
                    <h1 className="text-primary-Main font-semibold text-2xl">
                        ZAKAT Details
                    </h1>
                    <div className="rounded-2xl mt-1 bg-[#dfd9ca]/25 flex items-center justify-between p-6">
                        <div className="flex">
                            {cardArr.map((item, index) => (
                                <div
                                    key={index}
                                    className="mr-16 flex items-center"
                                >
                                    <div>
                                        <h4 className="text-base font-normal text-neutral-400 leading-8">
                                            {item.label}
                                        </h4>
                                        {isEditable && item.options ? (
                                            <div className="flex gap-4 text-neutral-700 font-bold accent-primary-Main">
                                                {item.options.map((option) => (
                                                    <label
                                                        key={option.value}
                                                        className="flex items-center mb-2 text-primary"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={item.field}
                                                            value={option.value}
                                                            checked={
                                                                item.value ===
                                                                option.value
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    item.field,
                                                                    e.target
                                                                        .value,
                                                                    option.id
                                                                )
                                                            }
                                                            className={`mr-2 ${
                                                                item.icon ===
                                                                minus
                                                                    ? 'text-neutral-400'
                                                                    : 'text-neutral-400'
                                                            }`}
                                                        />
                                                        {option.label}
                                                    </label>
                                                ))}
                                            </div>
                                        ) : (
                                            <span
                                                className={`text-base font-semibold flex ${
                                                    item.label === 'Zakat Value'
                                                        ? 'text-secondary'
                                                        : item.value
                                                        ? item.value ===
                                                              'Yes' ||
                                                          item.value === 'Done'
                                                            ? 'text-success'
                                                            : 'text-primaryYellow-500'
                                                        : 'text-primary'
                                                }`}
                                            >
                                                {item.icon && (
                                                    <span className="mr-2">
                                                        <img
                                                            src={item.icon}
                                                            alt="status icon"
                                                        />
                                                    </span>
                                                )}
                                                {item.value}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <button className="border-dashed border flex items-center border-primary-400 bg-primary-100 px-5 py-3 rounded-xl font-bold text-sm text-primary-Main">
                                <img
                                    src={downloadIcon}
                                    alt="download-icon"
                                    className="mr-2"
                                />
                                View ZAKAT Invoice
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ---------SUBMIT BUTTON------- */}
            {isEditable &&
                department === 'Finance' &&
                (roleName === 'Editor' ||
                    (roleName === 'Approver' &&
                        landInfo?.status === 'Data Not Submitted') ||
                    landInfo?.status === 'Send Back') && (
                    <div className="mt-2 flex justify-end p-1">
                        <button
                            className="relative border font-bold text-base rounded-lg px-6 py-3 bg-primary-Main text-white"
                            onClick={handleFinanceData}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center p-1  ">
                                    <PulseLoader color="#ffffff" size={10} />
                                </div>
                            ) : (
                                'Submit' // Button text
                            )}
                        </button>
                    </div>
                )}
        </>
    )
}
