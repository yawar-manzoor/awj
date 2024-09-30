import { useSelector, useDispatch } from 'react-redux'
import {
    updateLandAssetInfo,
    updateLandOverView,
} from '../../features/forms/formSlice'
import { useStatusData } from '../../lib/Statusapi'
import { getIcon } from '../../lib/ConstrcutionIcons'
import { generateOptions } from '../../lib/options'
import CustomSelect from '../ui/CustomDropdown'
import CustomHeadings from '../ui/CustomHeadings'
import {
    isRoleEditorApprover,
    isStatusDataNotSubmittedOrSentBack,
} from '../../lib/AcessCheck'
import { useState } from 'react'
const ConstructionForm = () => {
    const dispatch = useDispatch()
    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    const isEditable = useSelector((state) => state?.forms?.isEditable)
    const [openDropdown, setOpenDropdown] = useState(null)
    const landAssetInfo =
        useSelector((state) => state?.forms?.LandAssetInfo) || {}
    const {
        masterplan = '',
        isMasterApprovalStatusEdited = 0,
        infraApproval = '',
        isInfraApprovalStatusEdited = 0,
        infraContraction = '',
        isInfraConstructionStatusEdited = 0,
        munHandingOver = '',
        isMuncipalityHandingOverStatusEdited = 0,
        status,
    } = landAssetInfo

    const { data: constructionDetailsdata, isLoading: isLoadingDetails } =
        useStatusData('configvalue', isEditable)

    const constructionDetails = isEditable
        ? generateOptions(
              constructionDetailsdata?.data,
              isLoadingDetails,
              'status',
              'status'
          )
        : []

    const handleInputChange = (e) => {
        const { name, value } = e.target
        console.log({ name, value })
        dispatch(updateLandAssetInfo({ [name]: value }))
        const updateMappings = {
            masterplan: 'masterPlan',
            infraApproval: 'infraApproval',
            infraContraction: 'infraContraction',
            munHandingOver: 'munHandingOver',
        }

        const handleConditionalUpdate = (fieldName, stateKey) => {
            const foundItem = constructionDetailsdata?.data?.find(
                (item) => item.status === value
            )
            if (foundItem) {
                dispatch(updateLandOverView({ [stateKey]: foundItem.id }))
            }
        }

        if (updateMappings[name]) {
            handleConditionalUpdate(name, updateMappings[name])
        }
    }

    const highlightColor = '#487ADA'
    const defaultColor = 'text-neutral-700 text-base font-semibold'

    const getMergedClass = (name, isEdited) => {
        // First, handle text color based on status and isEdited
        if (status === 'Waiting for Approval' && isEdited === 1) {
            return `text-[${highlightColor}] font-bold`
        }

        switch (name) {
            case 'Approved':
            case 'Completed':
                return 'text-[#299764]'
            case 'Partial Handed Over':
            case 'Handed Over':
                return 'text-[#aea07a]'
            default:
                return defaultColor
        }
    }
    const hasPermission =
        isEditable &&
        isRoleEditorApprover(roleName) &&
        isStatusDataNotSubmittedOrSentBack(landAssetInfo.status) &&
        department === 'Development'

    return (
        <div className="bg-[#dfd9ca]/25 rounded-2xl px-6 py-4">
            <h2 className="text-xl leading-6 text-primary-Main font-semibold mb-4">
                Construction & Infra Details
            </h2>
            {hasPermission ? (
                <div className="grid  lg:grid-cols-3 2xl:grid-cols-4 gap-2 w-full">
                    <div className="w-full space-y-1">
                        <CustomHeadings label="MasterPlan" />
                        <CustomSelect
                            name="masterplan"
                            options={constructionDetails}
                            onChange={handleInputChange}
                            label=""
                            value={masterplan}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    </div>
                    <div className="w-full space-y-1">
                        <CustomHeadings label="InfraApproval" />
                        <CustomSelect
                            name="infraApproval"
                            options={constructionDetails}
                            onChange={handleInputChange}
                            label=""
                            value={infraApproval}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    </div>
                    <div className="w-full col-span-1 space-y-1">
                        <CustomHeadings label="InfraContraction" />
                        <CustomSelect
                            name="infraContraction"
                            options={constructionDetails}
                            onChange={handleInputChange}
                            label=""
                            value={infraContraction}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    </div>
                    <div className="space-y-1">
                        <CustomHeadings label="Municipality Handing Over" />
                        <CustomSelect
                            name="munHandingOver"
                            options={constructionDetails}
                            onChange={handleInputChange}
                            label=""
                            value={munHandingOver}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid lg:grid-cols-3 3xl:grid-cols-4  gap-2">
                        <div className="flex flex-col gap-1">
                            <CustomHeadings label="MasterPlan" />
                            <p
                                className={`text-base font-medium flex items-start  ${getMergedClass(
                                    masterplan,
                                    isMasterApprovalStatusEdited
                                )}`}
                            >
                                <img
                                    src={getIcon(masterplan)}
                                    alt="approved"
                                    className="mr-2 lg:mt-[2px]"
                                />
                                {masterplan || 'NA'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <CustomHeadings label="Infra Approval" />
                            <p
                                className={`text-base font-medium flex items-center ${getMergedClass(
                                    infraApproval,
                                    isInfraApprovalStatusEdited
                                )}`}
                            >
                                <img
                                    src={getIcon(infraApproval)}
                                    alt="approved"
                                    className="mr-2"
                                />
                                {infraApproval || 'NA'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <CustomHeadings label="Infra Contraction" />
                            <p
                                className={` text-base font-medium flex items-center whitespace-nowrap ${getMergedClass(
                                    infraContraction,
                                    isInfraConstructionStatusEdited
                                )} `}
                            >
                                <img
                                    src={getIcon(infraContraction)}
                                    alt="approved"
                                    className="mr-2"
                                />
                                {infraContraction || 'NA'}
                            </p>
                        </div>
                        <div className="flex flex-col  gap-1">
                            <CustomHeadings label="Municipality Handing Over" />
                            <p
                                className={` text-base font-medium flex whitespace-nowrap items-center ${getMergedClass(
                                    munHandingOver,
                                    isMuncipalityHandingOverStatusEdited
                                )}`}
                            >
                                <img
                                    src={getIcon(munHandingOver)}
                                    alt="approved"
                                    className="mr-2"
                                />
                                {munHandingOver || 'NA'}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ConstructionForm
