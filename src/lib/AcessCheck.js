export const isStatusDataNotSubmittedOrSentBack = (landAssetStatus) => {
    return (
        landAssetStatus === 'Data Not Submitted' ||
        landAssetStatus === 'Send Back'
    )
}
export const isRoleEditorApprover = (roleName) => {
    return roleName === 'Editor' || roleName === 'Approver'
}
