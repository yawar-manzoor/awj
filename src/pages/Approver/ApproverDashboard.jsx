import { useState } from 'react'
import DashboardApr from '../../components/DashboardApr'
import RequestDetailsRow from '../../components/RequestDetailsTable'
import RequestDetailsHeader from '../../components/RequestHeader'
const data = [
    {
        id: 1,
        refId: 'RYD-RBWA-SB01',
        assetName: 'Plot 2 Amwaj Mall',
        itdNumber: '410118048038',
        owner: 'Azad Property',
        createdDate: '08-08-2024 | 12:30PM',
        status: 'Pending',
    },
    {
        id: 2,
        refId: 'RYD-RBWA-SB01',
        assetName: 'Plot 2 Amwaj Mall',
        itdNumber: '410118048038',
        owner: 'Azad Property',
        createdDate: '08-08-2024 | 12:30PM',
        status: 'Approved',
    },
    {
        id: 3,
        refId: 'RYD-RBWA-SB01',
        assetName: 'Plot 2 Amwaj Mall',
        itdNumber: '410118048038',
        owner: 'Azad Property',
        createdDate: '08-08-2024 | 12:30PM',
        status: 'Send Back',
    },
    {
        id: 4,
        refId: 'RYD-RBWA-SB01',
        assetName: 'Plot 2 Amwaj Mall',
        itdNumber: '410118048038',
        owner: 'Azad Property',
        createdDate: '08-08-2024 | 12:30PM',
        status: 'Pending',
    },
    {
        id: 5,
        refId: 'RYD-RBWA-SB01',
        assetName: 'Plot 2 Amwaj Mall',
        itdNumber: '410118048038',
        owner: 'Azad Property',
        createdDate: '08-08-2024 | 12:30PM',
        status: 'Approved',
    },
    {
        id: 6,
        refId: 'RYD-RBWA-SB01',
        assetName: 'Plot 2 Amwaj Mall',
        itdNumber: '410118048038',
        owner: 'Azad Property',
        createdDate: '08-08-2024 | 12:30PM',
        status: 'Pending',
    },
    {
        id: 7,
        refId: 'RYD-RBWA-SB01',
        assetName: 'Plot 2 Amwaj Mall',
        itdNumber: '410118048038',
        owner: 'Azad Property',
        createdDate: '08-08-2024 | 12:30PM',
        status: 'Send Back',
    },
    {
        id: 8,
        refId: 'RYD-RBWA-SB01',
        assetName: 'Plot 2 Amwaj Mall',
        itdNumber: '410118048038',
        owner: 'Azad Property',
        createdDate: '08-08-2024 | 12:30PM',
        status: 'Pending',
    },
    {
        id: 9,
        refId: 'RYD-RBWA-SB01',
        assetName: 'Plot 2 Amwaj Mall',
        itdNumber: '410118048038',
        owner: 'Azad Property',
        createdDate: '08-08-2024 | 12:30PM',
        status: 'Send Back',
    },
    {
        id: 10,
        refId: 'RYD-RBWA-SB01',
        assetName: 'Plot 2 Amwaj Mall',
        itdNumber: '410118048038',
        owner: 'Azad Property',
        createdDate: '08-08-2024 | 12:30PM',
        status: 'Pending',
    },
]
const ApproverDashboard = () => {
    const [activeTab, setActiveTab] = useState('tab1')

    const tabs = [
        { id: 'tab1', label: 'New Land' },
        { id: 'tab2', label: 'Land Info Update' },
        { id: 'tab3', label: 'Ownership Update' },
        { id: 'tab4', label: 'RETT' },
    ]

    // Function to render content based on active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'tab1':
                return (
                    <>
                        <RequestDetailsHeader />
                        {data?.map((item) => (
                            <RequestDetailsRow key={item.id} item={item} />
                        ))}
                    </>
                )
            case 'tab2':
                return (
                    <>
                        {' '}
                        <RequestDetailsHeader />
                        {data?.map((item) => (
                            <RequestDetailsRow
                                key={item.id}
                                item={item}
                                activeTab={activeTab}
                            />
                        ))}
                    </>
                )
            case 'tab3':
                return (
                    <>
                        {' '}
                        <RequestDetailsHeader />
                        {data?.map((item) => (
                            <RequestDetailsRow key={item.id} item={item} />
                        ))}
                    </>
                )
            case 'tab4':
                return (
                    <>
                        {' '}
                        <RequestDetailsHeader />
                        {data?.map((item) => (
                            <RequestDetailsRow key={item.id} item={item} />
                        ))}
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className="px-12 2xl:px-24 4xl:px-32">
            <div className="my-6">
                <DashboardApr />
            </div>
            <span className="text-3xl text-neutral-600 font-semibold">
                Approval Hub{' '}
            </span>

            {/* Tabs */}
            <div className="mt-4">
                <div className="flex space-x-2 border-b-2 mx-8 border-[#EFECE4]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3  px-6 font-semibold rounded-tl-lg rounded-tr-lg  ${
                                activeTab === tab.id
                                    ? ' bg-[#DDD9C8] text-white'
                                    : 'bg-[#DDD9C8] text-[#706444B2]'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="rounded-3xl bg-white px-4 py-2">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    )
}

export default ApproverDashboard
