import { useRef, useState, useLayoutEffect } from 'react'
import LandOverview from '../pages/LandDetails/LandTabsComponents/LandOverview'
import LandOwnerShip from '../pages/LandDetails/LandTabsComponents/LandOwnerShip'
import LandSalesInfo from '../pages/LandDetails/LandTabsComponents/LandSalesInfo'
import LandFinance from '../pages/LandDetails/LandTabsComponents/LandFinance'
import WLT from '../pages/LandDetails/LandTabsComponents/WLT'
import DocumentLibrary from '../pages/LandDetails/LandTabsComponents/LandDocuments'
import Button from '../components/ui/Button'
import { useSelector } from 'react-redux'
import axios from '../api/axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { baseURL } from '../lib/global'
import { formatForAPI } from '../components/SubmitWltData'

import {
    setActiveTab,
    setEditable,
    setInitialLandAssetInfo,
} from '../features/forms/formSlice'
import useFetchData from '../lib/FetchData'
import { useEffect } from 'react'
import Loader from './ui/Loader'

const Tabs = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { landId } = location?.state || {}
    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    const [timelineContainerWidth, setTimelineContainerWidth] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState('')
    const handleCommentsChange = (e) => {
        setComments(e.target.value)
    }

    const whiteLandDetails =
        useSelector((state) => state.forms.LandAssetInfo.whiteLandDetails) || []
    const {
        landassetinfo,
        isEditable,
        activeTab,
        LandOverView,
        performRefetch,
    } = useSelector((state) => ({
        landassetinfo: state.forms.LandAssetInfo,
        activeTab: state.forms.activeTab,
        isEditable: state.forms.isEditable,
        LandOverView: state.forms.LandOverView,
        performRefetch: state.forms.refetch,
    }))
    console.log(landassetinfo, 'landassetinfo in land tabs')

    const timelineContainerRef = useRef()
    const timelineContainerPadding = 40
    const isWlt = landassetinfo?.isWlt
    const isWltData = landassetinfo?.wltDataIsAvialable
    const bussinessPlan = landassetinfo?.businessPlan

    const handleTabClick = (tabId) => {
        dispatch(setActiveTab(tabId))
    }

    const apiUrl =
        roleName === 'Viewer'
            ? `${baseURL}Land/GetLandDetailsForViewer?landId=${landId}&deptt=${activeTab}`
            : `${baseURL}Land/GetLandDetails?landId=${landId}&deptt=${activeTab}`
    const { data, error, isError, refetch } = useFetchData(apiUrl)

    useEffect(() => {
        dispatch(setActiveTab('landoverview'))
    }, [dispatch, landId])

    useEffect(() => {
        if (data) {
            dispatch(setInitialLandAssetInfo(data?.data))
        }
    }, [dispatch, data, performRefetch])

    const allTabs = [
        { id: 'landoverview', label: 'Land Overview' },
        { id: 'ownership', label: 'Ownership' },
        { id: 'wlt', label: 'WLT' },
        { id: 'sales', label: 'Sales' },
        { id: 'finance', label: 'Finance' },
        { id: 'development', label: 'Development' },
        { id: 'leased', label: 'Leased' },
        { id: 'documents', label: 'Documents' },
    ]
    const getFilteredTabs = () => {
        if (
            roleName === 'Viewer' ||
            roleName === 'Editor' ||
            roleName === 'Approver' ||
            roleName === 'Admin'
        ) {
            switch (department) {
                case 'Land Bank':
                    return allTabs.filter((tab) =>
                        [
                            'landoverview',
                            'ownership',
                            isWlt === 'Yes' || isWltData > 0 ? 'wlt' : null,
                            bussinessPlan === 'Sale' ? 'sales' : null,
                        ].includes(tab.id)
                    )
                case 'Finance':
                    return allTabs.filter((tab) =>
                        [
                            'landoverview',
                            'ownership',
                            isWlt === 'Yes' || isWltData > 0 ? 'wlt' : null,
                            bussinessPlan === 'Sale' ? 'sales' : null,
                            'finance',
                        ].includes(tab.id)
                    )
                case 'Sales':
                    return allTabs.filter((tab) =>
                        [
                            'landoverview',
                            'ownership',

                            bussinessPlan === 'Sale' ? 'sales' : null,
                            'finance',
                        ].includes(tab.id)
                    )
                case 'Development':
                    return allTabs.filter((tab) =>
                        [
                            'landoverview',
                            'ownership',
                            isWlt === 'Yes' || isWltData > 0 ? 'wlt' : null,
                        ].includes(tab.id)
                    )
                case 'Legal':
                    return allTabs.filter((tab) =>
                        [
                            'landoverview',
                            'ownership',
                            isWlt === 'Yes' || isWltData > 0 ? 'wlt' : null,
                            bussinessPlan === 'Sale' ? 'sales' : null,
                        ].includes(tab.id)
                    )
                case 'Strategy':
                    return allTabs.filter((tab) =>
                        ['landoverview', 'ownership'].includes(tab.id)
                    )
                case 'Investment':
                    return allTabs.filter((tab) =>
                        ['landoverview', 'ownership', 'finance'].includes(
                            tab.id
                        )
                    )
                case 'IT':
                    return allTabs

                default:
                    return []
            }
        }
        return []
    }

    const filteredTabs = getFilteredTabs()
    const renderContent = () => {
        switch (activeTab) {
            case 'landoverview':
                return (
                    <>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <LandOverview refetch={refetch} />
                        )}
                    </>
                )
            case 'ownership':
                return (
                    <>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <LandOwnerShip
                                timelineContainerWidth={timelineContainerWidth}
                                timelineContainerPadding={
                                    timelineContainerPadding
                                }
                                refetch={refetch}
                            />
                        )}
                    </>
                )
            case 'sales':
                return (
                    <>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <LandSalesInfo refetch={refetch} />
                        )}
                    </>
                )

            case 'wlt':
                return <>{isLoading ? <Loader /> : <WLT />}</>
            case 'finance':
                return (
                    <>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <LandFinance refetch={refetch} />
                        )}
                    </>
                )
            case 'development':
                return (
                    <h1 className="text-4xl flex justify-center items-center text-neutral-500">
                        Under development
                    </h1>
                )
            case 'leased':
                return (
                    <h1 className="text-4xl  flex justify-center items-center text-neutral-500">
                        Under development
                    </h1>
                )
            case 'documents':
                return <>{isLoading ? <Loader /> : <DocumentLibrary />}</>
            default:
                return null
        }
    }

    useLayoutEffect(() => {
        setTimelineContainerWidth(
            timelineContainerRef?.current?.getBoundingClientRect()?.width
        )
    }, [])

    const handleNext = () => {
        const currentIndex = filteredTabs.findIndex(
            (tab) => tab.id === activeTab
        )
        if (currentIndex < filteredTabs.length - 1) {
            dispatch(setActiveTab(filteredTabs[currentIndex + 1].id))
        }
    }

    const handlePrevious = () => {
        const currentIndex = filteredTabs.findIndex(
            (tab) => tab.id === activeTab
        )
        if (currentIndex > 0) {
            dispatch(setActiveTab(filteredTabs[currentIndex - 1].id))
        }
    }

    const updateLandAction = async (landId, action) => {
        try {
            const response = await axios.post('Land/LandUpdateAction', {
                landId: landId,
                action: action,
                comments: comments,
            })
            console.log('API Response:', response.data)
            navigate('/landbank')
        } catch (error) {
            console.error('API Error:', error)
        }
    }

    const handleApprove = () => {
        console.log('clicked')
        const landId = landassetinfo?.landId
        const action = 1
        updateLandAction(landId, action)
    }

    const handleSendBack = () => {
        const landId = landassetinfo?.landId
        const action = 2
        updateLandAction(landId, action)
    }
    // faisal overview code //

    const handleLandOviewData = async () => {
        const payload = {
            landId,
            subAssetId: LandOverView.subAssetId,
            districtId: LandOverView.districtId,
            area: LandOverView?.area,
            businessPlanId: LandOverView.businessPlanId,
            businessPlanStatusId: LandOverView.businessPlanStatusId,
            businessPlanDetailedId: LandOverView.businessPlanDetailedId,
            landStatusId: LandOverView.landStatusId,
            landUseId: LandOverView.landUseId,
            landTypeId: LandOverView.landTypeId,
            wltStatus: LandOverView.wltStatus,
            plotNumber: LandOverView.plotNumber,
            landInformation: landassetinfo.landInformation,
            location: LandOverView.location,
            mapUrl: LandOverView.mapUrl,
            masterPlan: LandOverView?.masterPlan,
            infraApproval: LandOverView?.infraApproval,
            infraContraction: LandOverView?.infraContraction,
            munHandingOver: LandOverView.munHandingOver,
        }
        try {
            setIsLoading(true)
            const response = await fetch(`${baseURL}Land/UpdateLandOverview`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            handleNext()
            setIsLoading(false)
            if (response.ok) {
                const data = await refetch()
                dispatch(setInitialLandAssetInfo(data?.data.data))
                console.log(data.data.data, 'after refetch')
                dispatch(setEditable(true))
            }
        } catch (error) {
            console.error(error.message, error)
            setIsLoading(false)
        }
    }
    // faisal overview code //
    const handleSubmit = async () => {
        try {
            const response = await axios.post('Land/LandUpdateAction', {
                landId: landId,
                action: 3,
            })
            console.log('API Response:', response.data)
            navigate('/landbank')
            dispatch(setEditable(false))
        } catch (error) {
            console.error('API Error:', error)
        }
    }

    const handleWltData = async () => {
        try {
            const formattedData = await formatForAPI(
                whiteLandDetails,
                landassetinfo
            )
            handleNext()
            console.log(formattedData)
            // Handle further actions after formatting data
        } catch (error) {
            console.error('Error formatting data:', error)
        }
    }
    // Handle Sales
    // const landId = location.state?.landId || null
    const buyer = useSelector((state) => state.forms?.buyerData)
    const salesDetail = useSelector((state) => state.forms?.salesData)
    const salesDetailed =
        useSelector((state) => state.forms?.LandAssetInfo?.saleDetails) || {}
    const AssetInfo = useSelector((state) => state.forms?.LandAssetInfo) || {}
    console.log({ AssetInfo }, { salesDetail }, { salesDetailed })
    const handleSubmitSales = async (signal) => {
        const buyerid = localStorage.getItem('buyerId')
        console.log({ buyerid })
        const payload = {
            landId,
            referenceNumber: salesDetail.referenceNumber ?? null,
            salesMethodId: salesDetail.salesMethodId,
            salesStatusId: salesDetail.salesStatusId,
            commission: salesDetailed.commission
                ? +salesDetailed.commission
                : null,
            saleValue: salesDetailed.salesValue
                ? +salesDetailed.salesValue
                : null,
            saleDate: salesDetailed.salesDate ?? null,
            salesRepresentative: salesDetail.salesRepresentative,
            agentName: salesDetail.agentName,
            buyerId: salesDetailed.buyerId ? +salesDetailed.buyerId : null,
            paymentAmount: salesDetailed.paymentAmount
                ? +salesDetailed.paymentAmount
                : null,
            discount: salesDetailed.discount ? +salesDetailed.discount : null,
            vatAmount: salesDetailed.vat ? +salesDetailed.vat : null,
            paymentTerm: salesDetailed.paymentTerm ?? null,
            paymentStatus: salesDetail.paymentStatus,
            depositStatus: salesDetail.depositStatus,
            collectedStatus: salesDetail.collectedStatus,
            paymentDate: salesDetailed.paymentDate ?? null,
            id: buyerid
                ? +buyerid
                : salesDetailed.salesId
                ? +salesDetailed.salesId
                : null,
            newBuyerId: null,
            buyerName: salesDetail.buyerName ?? null,
            buyerEmail: salesDetail.buyerEmail ?? null,
            buyerMobile: salesDetail.buyerMobile ?? null,
            companyId: salesDetail.companyId ?? null,
            reetNumber: salesDetail.reetNumber,
            reetDate: salesDetail.reetDate,
            reetAmount: salesDetail.reetAmount ? +salesDetail.reetAmount : null,
            reetStatusId: salesDetail.reetStatusId,
            collaction: null,
        }
        console.log({ payload }, 'in sybmit')
        try {
            const response = await fetch(`${baseURL}Sales/UpsertSale`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal,
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.log({ errorData })
                throw new Error(
                    errorData.message || 'Failed to submit sales details.'
                )
            }
        } catch (error) {
            handleApiError(error, 'Sales submission failed')
            throw error
        } finally {
            dispatch(setEditable(true))
            localStorage.removeItem('buyerId')
        }
    }
    return (
        <div
            ref={timelineContainerRef}
            className="grid gap-8 pt-16 3xl:pt-[97px]"
        >
            <div className="border-b">
                <nav
                    className="flex gap-2"
                    style={{
                        paddingLeft: timelineContainerPadding,
                        paddingRight: timelineContainerPadding,
                    }}
                >
                    {filteredTabs?.map((tab) => (
                        <Button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`rounded-t-lg 2xl:px-6 px-4 py-2 2xl:py-4 text-primary-800 text-base font-semibold ${
                                activeTab === tab.id
                                    ? 'bg-primary-300'
                                    : 'bg-primary-100'
                            }`}
                        >
                            {tab.label}
                        </Button>
                    ))}
                </nav>
            </div>

            <div
                className="pb-8"
                style={{
                    paddingLeft: timelineContainerPadding,
                    paddingRight: timelineContainerPadding,
                }}
            >
                {renderContent()}
                {roleName === 'Approver' &&
                    landassetinfo?.status !== 'Approved' &&
                    landassetinfo?.status !== 'Send Back' && (
                        <div className="mt-5">
                            {landassetinfo?.status ===
                                'Waiting for Approval' && (
                                <>
                                    <label
                                        htmlFor="comments"
                                        className="font-normal text-base text-neutral-600"
                                    >
                                        Comments
                                    </label>
                                    <textarea
                                        id="comments"
                                        value={comments}
                                        onChange={handleCommentsChange}
                                        className="w-full h-[98px] border rounded-md resize-none p-3 text-primary-500 ring-0 outline-none border-primary-400 placeholder:text-primary-500 placeholder:text-base placeholder:font-normal"
                                        placeholder="Comments"
                                    />
                                </>
                            )}
                        </div>
                    )}
                {roleName === 'Approver' &&
                    landassetinfo?.status === 'Waiting for Approval' && (
                        <div className="flex justify-end space-x-4 mt-5">
                            {/* Conditionally show Previous button for non-landoverview tabs */}
                            {activeTab !== 'landoverview' && (
                                <Button
                                    onClick={handlePrevious}
                                    className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                >
                                    Previous
                                </Button>
                            )}
                            {activeTab === 'landoverview' && (
                                <Button
                                    onClick={handleNext}
                                    className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                >
                                    Next
                                </Button>
                            )}
                            {/* for investemnt */}

                            {activeTab === 'landoverview' &&
                                department === 'Investment' &&
                                roleName === 'Editor' && (
                                    <Button
                                        className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        onClick={handleApprove}
                                    >
                                        Approve
                                    </Button>
                                )}
                            {activeTab === 'finance' &&
                                department === 'Investment' && (
                                    <>
                                        <Button
                                            className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                            onClick={handleSendBack}
                                        >
                                            Send Back
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleApprove}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'ownership' &&
                                department === 'Investment' && (
                                    <>
                                        <Button
                                            onClick={handleNext}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Next
                                        </Button>
                                    </>
                                )}

                            {/* Specific logic for each tab */}

                            {activeTab === 'ownership' &&
                                department === 'Legal' &&
                                landassetinfo?.isWlt === 'Yes' && (
                                    <Button
                                        onClick={handleNext}
                                        className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                    >
                                        Next
                                    </Button>
                                )}

                            {activeTab === 'sales' &&
                                department === 'Legal' && (
                                    <>
                                        <Button
                                            className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                            onClick={handleSendBack}
                                        >
                                            Send Back
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleApprove}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )}

                            {activeTab === 'wlt' &&
                                department === 'Legal' &&
                                bussinessPlan === 'Sale' && (
                                    <>
                                        <Button
                                            onClick={handleNext}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Next
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'ownership' &&
                                department === 'Legal' &&
                                landassetinfo?.isWlt === 'No' && (
                                    <>
                                        <Button
                                            className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                            onClick={handleSendBack}
                                        >
                                            Send Back
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleApprove}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'ownership' &&
                                department === 'Land Bank' &&
                                landassetinfo?.isWlt === 'Yes' && (
                                    <Button
                                        onClick={handleNext}
                                        className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                    >
                                        Next
                                    </Button>
                                )}
                            {activeTab === 'ownership' &&
                                department == 'Land Bank' &&
                                landassetinfo?.isWlt === 'No' &&
                                bussinessPlan === 'Sale' && (
                                    <Button
                                        onClick={handleNext}
                                        className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                    >
                                        Next
                                    </Button>
                                )}
                            {activeTab === 'ownership' &&
                                department == 'Land Bank' &&
                                landassetinfo?.isWlt === 'No' &&
                                bussinessPlan !== 'Sale' && (
                                    <>
                                        <Button
                                            className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                            onClick={handleSendBack}
                                        >
                                            Send Back
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleApprove}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'wlt' &&
                                landassetinfo?.isWlt === 'Yes' &&
                                bussinessPlan !== 'Sale' &&
                                department !== 'Finance' && (
                                    <>
                                        <Button
                                            className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                            onClick={handleSendBack}
                                        >
                                            Send Back
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleApprove}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'wlt' &&
                                department === 'Development' &&
                                isWlt === 'Yes' &&
                                landassetinfo?.businessPlan === 'Sale' && (
                                    <>
                                        <Button
                                            className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                            onClick={handleSendBack}
                                        >
                                            Send Back
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleApprove}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )}

                            {activeTab === 'ownership' &&
                                department === 'Development' &&
                                isWlt === 'No' && (
                                    <>
                                        <Button
                                            className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                            onClick={handleSendBack}
                                        >
                                            Send Back
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleApprove}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )}

                            {activeTab === 'wlt' &&
                                department === 'Land Bank' &&
                                landassetinfo?.isWlt === 'Yes' &&
                                bussinessPlan === 'Sale' && (
                                    <>
                                        <Button
                                            onClick={handleNext}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Next
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'sales' &&
                                department === 'Land Bank' &&
                                landassetinfo?.isWlt === 'Yes' &&
                                bussinessPlan === 'Sale' && (
                                    <>
                                        <>
                                            <Button
                                                className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                                onClick={handleSendBack}
                                            >
                                                Send Back
                                            </Button>
                                            <Button
                                                className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                                onClick={handleApprove}
                                            >
                                                Approve
                                            </Button>
                                        </>
                                    </>
                                )}
                            {activeTab === 'wlt' &&
                                landassetinfo?.isWlt === 'No' &&
                                bussinessPlan === 'Sale' && (
                                    <Button
                                        onClick={handleNext}
                                        className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                    >
                                        Next
                                    </Button>
                                )}
                            {activeTab === 'ownership' &&
                                department === 'Development' &&
                                isWlt === 'Yes' && (
                                    <>
                                        <Button
                                            onClick={handleNext}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Next
                                        </Button>
                                    </>
                                )}

                            {/* {activeTab === 'sales' &&
                                department === 'Land Bank' && (
                                    <>
                                        <Button
                                            className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                            onClick={handleSendBack}
                                        >
                                            Send Backsds
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleApprove}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )} */}
                            {activeTab === 'sales' &&
                                department === 'Sales' && (
                                    <>
                                        <Button
                                            onClick={handleNext}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Next
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'wlt' &&
                                department === 'Finance' &&
                                landassetinfo?.isWlt === 'Yes' &&
                                bussinessPlan === 'Sale' && (
                                    <>
                                        <Button
                                            onClick={handleNext}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Next
                                        </Button>
                                    </>
                                )}

                            {activeTab === 'wlt' &&
                                department === 'Finance' &&
                                landassetinfo?.isWlt === 'Yes' &&
                                bussinessPlan !== 'Sale' && (
                                    <>
                                        <Button
                                            onClick={handleNext}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Next
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'ownership' &&
                                department === 'Sales' && (
                                    <>
                                        <Button
                                            onClick={handleNext}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Next
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'ownership' &&
                                department === 'Finance' && (
                                    <>
                                        <Button
                                            onClick={handleNext}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Next
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'finance' &&
                                department === 'Sales' && (
                                    <>
                                        <Button
                                            className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                            onClick={handleSendBack}
                                        >
                                            Send Back
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleApprove}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'sales' &&
                                landassetinfo?.isWlt === 'No' &&
                                bussinessPlan === 'Sale' &&
                                department === 'Land Bank' && (
                                    <>
                                        <Button
                                            className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                            onClick={handleSendBack}
                                        >
                                            Send Back
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleApprove}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'sales' &&
                                department === 'Finance' && (
                                    <>
                                        <Button
                                            onClick={handleNext}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Next
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'finance' &&
                                department === 'Finance' && (
                                    <>
                                        <Button
                                            className="bg-white text-primary-Main px-6 py-3 rounded-lg font-bold border-primary-Main border text-base"
                                            onClick={handleSendBack}
                                        >
                                            Send Back
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleApprove}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )}
                        </div>
                    )}
                <div className="flex justify-end mt-5">
                    {isEditable &&
                        activeTab === 'landoverview' &&
                        department === 'Investment' &&
                        (roleName === 'Editor' ||
                            (roleName === 'Approver' &&
                                (landassetinfo?.status ===
                                    'Data Not Submitted' ||
                                    landassetinfo?.status ===
                                        'Send Back'))) && (
                            <Button
                                className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                onClick={() => {
                                    handleLandOviewData()
                                    handleSubmit()
                                }}
                            >
                                Submit
                            </Button>
                        )}
                </div>

                <div className="flex justify-end mt-5">
                    {isEditable &&
                        activeTab === 'sales' &&
                        department === 'Finance' &&
                        (roleName === 'Editor' ||
                            (roleName === 'Approver' &&
                                (landassetinfo?.status ===
                                    'Data Not Submitted' ||
                                    landassetinfo?.status ===
                                        'Send Back'))) && (
                            <Button
                                className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                // onClick={handleNext}
                                onClick={() => {
                                    handleSubmitSales()
                                    handleNext()
                                }}
                            >
                                Save and next
                            </Button>
                        )}
                </div>

                {isEditable &&
                    department === 'Land Bank' &&
                    ((roleName === 'Editor' &&
                        landassetinfo?.status === 'Data Not Submitted') ||
                        landassetinfo?.status === 'Send Back' ||
                        (roleName === 'Approver' &&
                            landassetinfo?.status === 'Data Not Submitted') ||
                        landassetinfo?.status === 'Send Back') && (
                        <div className="flex justify-end space-x-4 mt-5">
                            {/* Buttons for ownership */}
                            {activeTab === 'ownership' && (
                                <>
                                    <Button
                                        onClick={handlePrevious}
                                        className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                    >
                                        Previous
                                    </Button>
                                    {landassetinfo?.isWlt === 'No' &&
                                    bussinessPlan !== 'Sale' ? (
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    ) : (
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleNext}
                                        >
                                            Save and Next
                                        </Button>
                                    )}
                                </>
                            )}

                            {/* Buttons for WLT */}
                            {activeTab === 'wlt' && (
                                <>
                                    <Button
                                        onClick={handlePrevious}
                                        className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                    >
                                        Previous
                                    </Button>
                                    {landassetinfo?.isWlt === 'Yes' &&
                                    bussinessPlan === 'Sale' ? (
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleWltData}
                                        >
                                            Save and Next
                                        </Button>
                                    ) : (
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    )}
                                </>
                            )}

                            {/* Buttons for Sales */}
                            {activeTab === 'sales' &&
                                landassetinfo?.isWlt === 'Yes' &&
                                bussinessPlan === 'Sale' && (
                                    <>
                                        <Button
                                            onClick={handlePrevious}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'sales' &&
                                landassetinfo?.isWlt === 'No' &&
                                bussinessPlan === 'Sale' && (
                                    <>
                                        <Button
                                            onClick={handlePrevious}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </>
                                )}
                            {activeTab === 'sales' &&
                                landassetinfo?.isWlt === 'No' &&
                                bussinessPlan !== 'Sale' && (
                                    <>
                                        <Button
                                            onClick={handlePrevious}
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </>
                                )}
                            {/* Always Save and Next on Landoverview */}
                            {activeTab === 'landoverview' && (
                                <>
                                    <Button
                                        className="bg-primary-Main text-white px-6 py-3 rounded-lg font-bold text-base"
                                        onClick={handleLandOviewData}
                                    >
                                        Save and Next
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Tabs
