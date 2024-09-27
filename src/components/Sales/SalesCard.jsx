import SalesLogo from '../../assets/SalesCard/SalesLogo.svg'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateLandAssetInfo,
    updateSalesData,
} from '../../features/forms/formSlice'
import Button from '../../components/ui/Button'
import CustomSelect from '../../components/ui/CustomDropdown'
import { useStatusData } from '../../lib/Statusapi'
import { generateOptions } from '../../lib/options'
import {
    isRoleEditorApprover,
    isStatusDataNotSubmittedOrSentBack,
} from '../../lib/AcessCheck'

const SalesCard = () => {
    const department = localStorage.getItem('department')
    const roleName = localStorage.getItem('roleName')
    const dispatch = useDispatch()
    const isEditable = useSelector((state) => state?.forms?.isEditable)
    const salesDetail =
        useSelector((state) => state.forms?.LandAssetInfo?.saleDetails) || {}
    const LandAssetInfo =
        useSelector((state) => state.forms?.LandAssetInfo) || {}

    const { data: SalesMethodData, isLoading: isLoading1 } = useStatusData(
        'SalesMethod',
        isEditable
    )
    const { data: SalesRepData, isLoading: isLoading2 } = useStatusData(
        'SalesRepresentative',
        isEditable
    )
    const { data: AgentDetailsData, isLoading: isLoading3 } = useStatusData(
        'AgentDetails',
        isEditable
    )
    const { data: SalesStatusData, isLoading: isLoading4 } = useStatusData(
        'SalesStatus',
        isEditable
    )

    const salesMethodOptions = isEditable
        ? generateOptions(SalesMethodData?.data, isLoading1, 'status', 'status')
        : []

    const salesRepOptions = isEditable
        ? generateOptions(SalesRepData?.data, isLoading2, 'status', 'status')
        : []

    const agentNameOptions = isEditable
        ? generateOptions(
              AgentDetailsData?.data,
              isLoading3,
              'status',
              'status'
          )
        : []

    const salesStatusOptions = isEditable
        ? generateOptions(SalesStatusData?.data, isLoading4, 'status', 'status')
        : []

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === 'salesMethod') {
            const selectedMethod = SalesMethodData?.data.find(
                (item) => item.status === value
            )
            if (selectedMethod) {
                dispatch(updateSalesData({ salesMethodId: selectedMethod.id }))
            }
        }
        if (name === 'salesRep') {
            const selectedRep = SalesRepData?.data.find(
                (item) => item.status === value
            )
            if (selectedRep) {
                dispatch(
                    updateSalesData({ salesRepresentative: selectedRep.id })
                )
            }
        }
        if (name === 'agentName') {
            const selectedAgent = AgentDetailsData?.data.find(
                (item) => item.status === value
            )
            if (selectedAgent) {
                dispatch(updateSalesData({ agentName: selectedAgent.id }))
            }
        }
        if (name === 'salesStatus') {
            const selectedStatus = SalesStatusData?.data.find(
                (item) => item.status === value
            )
            if (selectedStatus) {
                dispatch(updateSalesData({ salesStatusId: selectedStatus.id }))
            }
        }

        dispatch(
            updateLandAssetInfo({
                saleDetails: {
                    ...salesDetail,
                    [name]: value,
                },
            })
        )
    }
    const hasPermissionToEditSales =
        isEditable &&
        department === 'Sales' &&
        isRoleEditorApprover(roleName) &&
        isStatusDataNotSubmittedOrSentBack(LandAssetInfo.status)

    return (
        <div className="px-6 py-6 grid gap-4 ">
            <img src={SalesLogo} alt="Sales" />
            <h2 className=" text-2xl 2xl:text-[32px] leading-6 font-semibold text-primary-Main mb-4">
                Sales Information
            </h2>
            <div className="grid  gap-2">
                <div className="grid grid-cols-2  justify-between items-center">
                    <label className="font-medium text-neutral-600 text-lg whitespace-nowrap flex-1">
                        ReferenceNo
                    </label>

                    <span className="font-bold text-lg text-primary-600 flex-1">
                        {salesDetail?.refNumber || 'NA'}
                    </span>
                </div>
                <div className="grid grid-cols-2 justify-between items-center">
                    <label className="font-medium text-neutral-600 text-lg whitespace-nowrap flex-1">
                        Sales Method
                    </label>
                    {hasPermissionToEditSales ? (
                        <CustomSelect
                            name="salesMethod"
                            onChange={handleInputChange}
                            value={salesDetail?.salesMethod || ''}
                            options={salesMethodOptions}
                            label=""
                            className="flex-1"
                        />
                    ) : (
                        <span className="font-bold text-lg text-primary-600 flex-1">
                            {salesDetail?.salesMethod || 'NA'}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-2 justify-between items-center">
                    <label className="font-medium text-neutral-600 text-lg flex-1">
                        Sales Representative
                    </label>
                    {/* {isEditable &&
                    (roleName === 'Editor' || roleName === 'Approver') &&
                    department === 'Sales' &&
                    (AssetInfo.status === 'Data Not Submitted' ||
                        AssetInfo.status === 'Send Back') ? (
                        <CustomSelect
                            name="salesRep"
                            onChange={handleInputChange}
                            value={salesDetail?.salesRep || ''}
                            options={salesRepOptions}
                            label=""
                            className="flex-1"
                        />
                    ) : (
                        <span className="font-bold text-lg text-primary-600 flex-1">
                            {salesDetail?.salesRep || 'NA'}
                        </span>
                    )} */}
                    <span className="font-bold text-lg text-primary-600 flex-1">
                        {salesDetail?.salesRep || 'NA'}
                    </span>
                </div>
                <div className="grid grid-cols-2 justify-between items-center">
                    <label className="font-medium text-neutral-600 text-lg whitespace-nowrap flex-1">
                        Agent Name
                    </label>
                    {hasPermissionToEditSales ? (
                        <CustomSelect
                            name="agentName"
                            onChange={handleInputChange}
                            value={salesDetail?.agentName || ''}
                            options={agentNameOptions}
                            label=""
                            className="flex-1"
                        />
                    ) : (
                        <span className="font-bold text-lg text-primary-600 flex-1">
                            {salesDetail?.agentName || 'NA'}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-2 justify-between items-center">
                    <label className="font-medium text-neutral-600 text-lg whitespace-nowrap flex-1">
                        Sales Status
                    </label>
                    {hasPermissionToEditSales ? (
                        <CustomSelect
                            name="salesStatus"
                            options={salesStatusOptions}
                            onChange={handleInputChange}
                            label=""
                            value={salesDetail?.salesStatus || ''}
                            className="flex-1"
                        />
                    ) : (
                        <div className="flex gap-2 flex-1">
                            {salesDetail?.salesStatus === 'Booked' ? (
                                <Button className="px-[10px] 2xl:px-[17px] py-[7px] rounded-lg text-base font-semibold bg-[#487ADA]/20 text-secondary500 border border-secondary500">
                                    {salesDetail?.salesStatus}
                                </Button>
                            ) : salesDetail?.salesStatus === 'Sold' ? (
                                <Button className="px-[10px] 2xl:px-[17px] py-[7px] rounded-lg text-base font-semibold bg-[#487ADA]/20 text-secondary500 border border-secondary500">
                                    {salesDetail?.salesStatus}
                                </Button>
                            ) : (
                                <span className="font-bold text-lg text-primary-600 flex-1">
                                    NA
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-2 justify-between items-center">
                    <label className="font-medium text-neutral-600 text-lg whitespace-nowrap flex-1">
                        Sales Value
                    </label>
                    {hasPermissionToEditSales ? (
                        <input
                            type="text"
                            name="salesValue"
                            value={salesDetail?.salesValue || ''}
                            onChange={handleInputChange}
                            className="border  text-lg text-primary-600 border-primary-200 rounded-lg outline-none p-2 flex-1"
                        />
                    ) : (
                        <span className="font-bold text-lg text-[#132D5E] flex-1">
                            {salesDetail?.salesValue
                                ? `${salesDetail?.salesValue} SAR`
                                : 'NA'}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-2 justify-between items-center">
                    <label className="font-medium text-neutral-600 text-lg whitespace-nowrap flex-1">
                        Commission
                    </label>
                    {hasPermissionToEditSales ? (
                        <input
                            type="text"
                            name="commission"
                            value={salesDetail?.commission || ''}
                            onChange={handleInputChange}
                            className="border font-bold text-lg text-primary-600 border-primary-200 rounded-lg outline-none p-2 flex-1"
                        />
                    ) : (
                        <span className="text-lg font-bold text-[#132D5E]  flex-1">
                            {salesDetail?.commission
                                ? ` ${salesDetail?.commission} SAR`
                                : 'NA'}
                        </span>
                    )}
                </div>
                <div className="grid grid-cols-2 justify-between items-center">
                    <label className="font-medium text-neutral-600 text-lg whitespace-nowrap flex-1">
                        Sales Date
                    </label>

                    <span className="font-bold text-lg text-primary-600 flex-1">
                        {salesDetail?.salesDate &&
                        salesDetail?.salesDate !== 'NA'
                            ? salesDetail?.salesDate.toString().split('T')[0]
                            : salesDetail?.salesDate}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SalesCard
