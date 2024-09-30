import CustomSelect from '../ui/CustomDropdown'
import CustomHeadings from '../ui/CustomHeadings'
import { useDispatch, useSelector } from 'react-redux'
import { useStatusData } from '../../lib/Statusapi'
import { generateOptions } from '../../lib/options'
import {
    updateLandAssetInfo,
    updateLandOverView,
} from '../../features/forms/formSlice'
import {
    isRoleEditorApprover,
    isStatusDataNotSubmittedOrSentBack,
} from '../../lib/AcessCheck'
import { useState } from 'react'

export const LandBussinessPlan = () => {
    const dispatch = useDispatch()
    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    const isEditable = useSelector((state) => state.forms.isEditable)
    const [openDropdown, setOpenDropdown] = useState(null)

    const landAssetInfo =
        useSelector((state) => state?.forms?.LandAssetInfo) || {}

    const {
        landUse = '',
        isLandUseEdited = 0,
        landStatus = '',
        landType = '',
        isLandStatusEdited = 0,
        businessPlan = '',
        isBusinessPlanEdited = 0,
        businessPlanDetail = '',
        isBusinessPlanDetailedEdited = 0,
        businessPlanStatus = '',
        isBusinessPlanStatusEdited = 0,
        status,
    } = landAssetInfo

    const { data: businessPlanData, isLoading: isLoadingBusinessPlan } =
        useStatusData('businessPlan', isEditable)
    const {
        data: BussinessPlanDetailData,
        isLoading: isLoadingBussinessPlanDetailData,
    } = useStatusData('bpd', isEditable)
    const {
        data: BussinessPlanStatusData,
        isLoading: isLoadingBussinessPlanStatus,
    } = useStatusData('bps', isEditable)
    const { data: LandUseData, isLoading: isLoadingLandUse } = useStatusData(
        'landuse',
        isEditable
    )
    const { data: LandStatusData, isLoading: isLoadingLandStatus } =
        useStatusData('landstatus', isEditable)
    const { data: LandType, isLoading: isLoadingLandType } = useStatusData(
        'LandType',
        isEditable
    )
    let BussinessplanstatusOptions = isEditable
        ? generateOptions(
              BussinessPlanStatusData?.data,
              isLoadingBussinessPlanStatus,
              'status',
              'status'
          )
        : []
    let LandStatusOptions = isEditable
        ? generateOptions(
              LandStatusData?.data,
              isLoadingLandStatus,
              'status',
              'status'
          )
        : []
    let LandUseOptions = isEditable
        ? generateOptions(
              LandUseData?.data,
              isLoadingLandUse,
              'status',
              'status'
          )
        : []
    const LandTypeOptions = generateOptions(
        LandType?.data,
        isLoadingLandType,
        'status',
        'status'
    )
    let BussinessPlanDetailsOptions = isEditable
        ? generateOptions(
              BussinessPlanDetailData?.data,
              isLoadingBussinessPlanDetailData,
              'status',
              'status'
          )
        : []
    const businessPlanOptions = isEditable
        ? generateOptions(
              businessPlanData?.data,
              isLoadingBusinessPlan,
              'status',
              'status'
          )
        : []

    const handleInputChange = (e) => {
        const { name, value } = e.target
        dispatch(updateLandAssetInfo({ [name]: value }))

        const config = {
            landUse: {
                dataSource: LandUseData.data,
                field: 'landUseId',
            },
            landStatus: {
                dataSource: LandStatusData.data,
                field: 'landStatusId',
            },
            landType: {
                dataSource: LandType.data,
                field: 'landTypeId',
            },
            businessPlan: {
                dataSource: businessPlanData?.data,
                field: 'businessPlanId',
            },
            businessPlanStatus: {
                dataSource: BussinessPlanStatusData?.data,
                field: 'businessPlanStatusId',
            },
            businessPlanDetail: {
                dataSource: BussinessPlanDetailData?.data,
                field: 'businessPlanDetailedId',
            },
        }

        const handleUpdate = ({ dataSource, field }) => {
            const item = dataSource?.find((item) => item.status === value)
            if (item) {
                dispatch(updateLandOverView({ [field]: item.id }))
            }
        }

        const fieldConfig = config[name]
        if (fieldConfig) {
            handleUpdate(fieldConfig)
        }
    }
    const highlightColor = '#487ADA'
    const defaultColor = 'text-neutral-700 text-base font-semibold'

    const getTextClass = (isEdited) => {
        return status === 'Waiting for Approval' && isEdited === 1
            ? `text-[${highlightColor}] font-bold`
            : defaultColor
    }

    const hasPermissiontoEditLandUseBusinessPlan =
        isEditable &&
        isRoleEditorApprover(roleName) &&
        isStatusDataNotSubmittedOrSentBack(landAssetInfo.status) &&
        department === 'Investment'

    const hasPermissiontoEditLandStatus =
        isEditable &&
        isRoleEditorApprover(roleName) &&
        isStatusDataNotSubmittedOrSentBack(landAssetInfo.status) &&
        department === 'Development'

    const hasPermissionLandType =
        isEditable &&
        isRoleEditorApprover(roleName) &&
        isStatusDataNotSubmittedOrSentBack(landAssetInfo.status) &&
        department === 'Land Bank'

    return (
        <div className="bg-[#dfd9ca]/25 rounded-2xl px-6 py-4">
            <h2 className="text-xl leading-6 text-primary-Main font-semibold mb-4">
                Land Use & Business Plan
            </h2>

            <div className="grid grid-cols-4 2xl:grid-cols-5 gap-2 ">
                <div className="flex flex-col">
                    <CustomHeadings
                        label="Land Use"
                        className="border border-red-900"
                    />
                    {hasPermissiontoEditLandUseBusinessPlan ? (
                        <CustomSelect
                            name="landUse"
                            options={LandUseOptions}
                            value={landUse}
                            onChange={handleInputChange}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    ) : (
                        <p className={getTextClass(isLandUseEdited)}>
                            {landUse ? landUse : ''}
                        </p>
                    )}
                </div>
                <div className="flex flex-col">
                    <CustomHeadings label="Land Status" />
                    {hasPermissiontoEditLandStatus ? (
                        <CustomSelect
                            name="landStatus"
                            options={LandStatusOptions}
                            value={landStatus}
                            onChange={handleInputChange}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    ) : (
                        <p className={getTextClass(isLandStatusEdited)}>
                            {landStatus ? landStatus : ''}
                        </p>
                    )}
                </div>
                <div className="flex flex-col">
                    <CustomHeadings label="Land Type" />
                    {hasPermissionLandType ? (
                        <CustomSelect
                            name="landType"
                            options={LandTypeOptions}
                            value={landType}
                            onChange={handleInputChange}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    ) : (
                        <p
                            className={
                                'text-neutral-700 text-base font-semibold'
                            }
                        >
                            {landType ? landType : ''}
                        </p>
                    )}
                </div>
                <div className="flex flex-col">
                    <CustomHeadings label="Business Plan" />
                    {hasPermissiontoEditLandUseBusinessPlan ? (
                        <CustomSelect
                            name="businessPlan"
                            value={businessPlan}
                            options={businessPlanOptions}
                            onChange={handleInputChange}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    ) : (
                        <p className={getTextClass(isBusinessPlanEdited)}>
                            {businessPlan ? businessPlan : ''}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <CustomHeadings label="Business Plan Status" />
                    {hasPermissiontoEditLandUseBusinessPlan ? (
                        <CustomSelect
                            name="businessPlanStatus"
                            options={BussinessplanstatusOptions}
                            value={businessPlanStatus}
                            onChange={handleInputChange}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    ) : (
                        <p className={getTextClass(isBusinessPlanStatusEdited)}>
                            {businessPlanStatus ? businessPlanStatus : ''}
                        </p>
                    )}
                </div>
                <div className="flex flex-col ">
                    <CustomHeadings label=" Business Plan Details" />
                    {hasPermissiontoEditLandUseBusinessPlan ? (
                        <CustomSelect
                            name="businessPlanDetail"
                            value={businessPlanDetail}
                            onChange={handleInputChange}
                            options={BussinessPlanDetailsOptions}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    ) : (
                        <p
                            className={`${getTextClass(
                                isBusinessPlanDetailedEdited
                            )}  whitespace-nowrap`}
                        >
                            {businessPlanDetail ? businessPlanDetail : ''}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
