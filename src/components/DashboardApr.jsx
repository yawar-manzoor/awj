import Requests from '../assets/DashbaordIcons/Requests.svg'
import Completed from '../assets/DashbaordIcons/Completed.svg'
import Rejected from '../assets/DashbaordIcons/Pending.svg'

const DashboardApr = ({ landCountData, handleLandStageId }) => {
    const handleClickId = (id) => {
        console.log('🚀 ~ handleClickId ~ id:', id)
        handleLandStageId(id)
    }
    return (
        <>
            <div className="grid grid-cols-5 grid-rows-1 gap-5">
                <div className="dashboardCard" onClick={() => handleClickId(0)}>
                    <div className="flex flex-col bg-white rounded-3xl pt-2 ps-6  pe-4 pb-5">
                        <div className="flex justify-between">
                            <span className="text-[32px] font-semibold text-[#525252]">
                                {landCountData?.data?.totalCount || 0}
                            </span>
                            <img src={Requests} alt="Requests Icon" />
                        </div>
                        <span className="text-[#858585] text-base font-medium">
                            Total Request
                        </span>
                    </div>
                </div>

                <div
                    className=" dashboardCard"
                    onClick={() => handleClickId(1)}
                >
                    <div className="flex flex-col bg-white rounded-3xl pt-2 ps-6  pe-4 pb-5">
                        <div className="flex justify-between">
                            <span className="text-[32px] font-semibold text-[#525252]">
                                {landCountData?.data?.approved || 0}
                            </span>
                            <img src={Completed} alt="Completed Icon" />
                        </div>
                        <span className="text-[#858585] text-base font-medium">
                            Approved
                        </span>
                    </div>
                </div>
                <div
                    className=" dashboardCard"
                    onClick={() => handleClickId(4)}
                >
                    <div className="flex flex-col bg-white rounded-3xl pt-2 ps-6  pe-4 pb-5">
                        <div className="flex justify-between">
                            <span className="text-[32px] font-semibold text-[#525252]">
                                {landCountData?.data?.waitingForApproval || 0}
                            </span>
                            <img src={Completed} alt="Completed Icon" />
                        </div>
                        <span className="text-[#858585] text-base font-medium">
                            Waiting for Approval
                        </span>
                    </div>
                </div>
                <div
                    className=" dashboardCard"
                    onClick={() => handleClickId(2)}
                >
                    <div className="flex flex-col bg-white rounded-3xl pt-2 ps-6  pe-4 pb-5">
                        <div className="flex justify-between">
                            <span className="text-[32px] font-semibold text-[#525252]">
                                {landCountData?.data?.dataNotSubmitted || 0}
                            </span>
                            <img src={Rejected} alt="Pending Icon" />
                        </div>
                        <span className="text-[#858585] text-base font-medium">
                            Pending
                        </span>
                    </div>
                </div>

                <div
                    className=" dashboardCard"
                    onClick={() => handleClickId(3)}
                >
                    <div className="flex flex-col bg-white rounded-3xl pt-2 ps-6  pe-4 pb-5">
                        <div className="flex justify-between">
                            <span className="text-[32px] font-semibold text-[#525252]">
                                {landCountData?.data?.sentBack || 0}
                            </span>
                            <img src={Rejected} alt="Rejected Icon" />
                        </div>
                        <span className="text-[#858585] text-base font-medium">
                            Rejected / Revert Back
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashboardApr
