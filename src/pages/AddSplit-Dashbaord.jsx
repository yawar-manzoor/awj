import { useState } from 'react'

import DashboardApr from '../components/DashboardApr'
import AddCircle from '../assets/DashbaordIcons/add-circle.svg'
import More from '../assets/DashbaordIcons/More.svg'
import ActionPopUp from '../components/ActionPopUp'
import RequestDetailsRow from '../components/RequestDetailsTable'
import RequestDetailsHeader from '../components/RequestHeader'
export default function AddSplitDashbaord() {
    const data = [
        {
            id: 1,
            referenceNumber: 'RYD-RBWA-SB01',
            assetName: 'Plot 2 Amwaj Mall',
            itdNumber: '410118048038',
            deedOwner: 'Azad Property',
            createdDate: '08-08-2024 | 12:30PM',
            status: 'Pending',
        },
        {
            id: 2,
            referenceNumber: 'RYD-RBWA-SB01',
            assetName: 'Plot 2 Amwaj Mall',
            itdNumber: '410118048038',
            deedOwner: 'Azad Property',
            createdDate: '08-08-2024 | 12:30PM',
            status: 'Approved',
        },
        {
            id: 3,
            referenceNumber: 'RYD-RBWA-SB01',
            assetName: 'Plot 2 Amwaj Mall',
            itdNumber: '410118048038',
            deedOwner: 'Azad Property',
            createdDate: '08-08-2024 | 12:30PM',
            status: 'Send Back',
        },
        {
            id: 4,
            referenceNumber: 'RYD-RBWA-SB01',
            assetName: 'Plot 2 Amwaj Mall',
            itdNumber: '410118048038',
            deedOwner: 'Azad Property',
            createdDate: '08-08-2024 | 12:30PM',
            status: 'Pending',
        },
        {
            id: 5,
            referenceNumber: 'RYD-RBWA-SB01',
            assetName: 'Plot 2 Amwaj Mall',
            itdNumber: '410118048038',
            deedOwner: 'Azad Property',
            createdDate: '08-08-2024 | 12:30PM',
            status: 'Approved',
        },
        {
            id: 6,
            referenceNumber: 'RYD-RBWA-SB01',
            assetName: 'Plot 2 Amwaj Mall',
            itdNumber: '410118048038',
            deedOwner: 'Azad Property',
            createdDate: '08-08-2024 | 12:30PM',
            status: 'Pending',
        },
        {
            id: 7,
            referenceNumber: 'RYD-RBWA-SB01',
            assetName: 'Plot 2 Amwaj Mall',
            itdNumber: '410118048038',
            deedOwner: 'Azad Property',
            createdDate: '08-08-2024 | 12:30PM',
            status: 'Send Back',
        },
        {
            id: 8,
            referenceNumber: 'RYD-RBWA-SB01',
            assetName: 'Plot 2 Amwaj Mall',
            itdNumber: '410118048038',
            deedOwner: 'Azad Property',
            createdDate: '08-08-2024 | 12:30PM',
            status: 'Pending',
        },
        {
            id: 9,
            referenceNumber: 'RYD-RBWA-SB01',
            assetName: 'Plot 2 Amwaj Mall',
            itdNumber: '410118048038',
            deedOwner: 'Azad Property',
            createdDate: '08-08-2024 | 12:30PM',
            status: 'Send Back',
        },
        {
            id: 10,
            referenceNumber: 'RYD-RBWA-SB01',
            assetName: 'Plot 2 Amwaj Mall',
            itdNumber: '410118048038',
            deedOwner: 'Azad Property',
            createdDate: '08-08-2024 | 12:30PM',
            status: 'Pending',
        },
    ]
    const [openActionPopup, setActionPopup] = useState(false)

    return (
        <>
            <div className="px-12 2xl:px-24 4xl:px-32  box-border">
                <div className="grid grid-cols-5 grid-rows-1 gap-5">
                    <div className="col-span-4 row-start-2">
                        <DashboardApr />
                    </div>
                    <div className=" dashboardCard col-start-5 row-start-2 cursor-pointer">
                        <div
                            onClick={() => setActionPopup(!openActionPopup)}
                            className="flex flex-col bg-primary-600 rounded-3xl pt-2 ps-6  pe-4 pb-5"
                        >
                            <div className="flex justify-center items-center pt-2">
                                <img
                                    src={AddCircle}
                                    alt="circle-icon"
                                    className="pb-[10px]"
                                />
                            </div>
                            <span className="text-white text-base font-bold text-center">
                                Add / Modify Land
                            </span>
                        </div>
                    </div>
                </div>
                {openActionPopup && (
                    <ActionPopUp onClose={() => setActionPopup(false)} />
                )}
                {/* make these two component  */}
                <div className="py-10">
                    <p className="text-[32px] text-neutral-600 font-semibold leading-6 ">
                        Request Details
                    </p>
                </div>
                <div className="rounded-3xl bg-white px-4 py-4">
                    <RequestDetailsHeader />

                    {data?.map((item) => (
                        <RequestDetailsRow key={item.id} item={item} />
                    ))}
                </div>
                {/* ---- */}
            </div>
        </>
    )
}
