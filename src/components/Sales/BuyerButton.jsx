import {
    isRoleEditorApprover,
    isStatusDataNotSubmittedOrSentBack,
} from '../../lib/AcessCheck'
import { useSelector } from 'react-redux'

const BuyerButton = ({ setIsOpen }) => {
    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    const isEditable = useSelector((state) => state?.forms?.isEditable)
    const BuyerDetail =
        useSelector((state) => state.forms?.LandAssetInfo?.saleDetails) || {}
    const AssetInfo = useSelector((state) => state.forms?.LandAssetInfo) || {}
    const Status = AssetInfo.status
    return (
        <>
            {(!BuyerDetail?.buyerId || BuyerDetail?.buyerId == 'NA') &&
                !isEditable &&
                department === 'Sales' &&
                isRoleEditorApprover(roleName) &&
                isStatusDataNotSubmittedOrSentBack(Status) && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-primary-Main text-white px-4 py-2 rounded"
                    >
                        Select Buyer
                    </button>
                )}

            {BuyerDetail?.buyerId &&
                BuyerDetail?.buyerId !== 'NA' &&
                department === 'Sales' &&
                !isEditable &&
                isRoleEditorApprover(roleName) &&
                isStatusDataNotSubmittedOrSentBack(Status) && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-primary-Main text-white px-4 py-2 rounded"
                    >
                        Change Buyer
                    </button>
                )}
        </>
    )
}

export default BuyerButton
