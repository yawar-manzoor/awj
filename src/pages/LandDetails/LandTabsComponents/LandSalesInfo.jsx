import BuyerCard from '../../../components/Sales/BuyerCard'
import SalesCard from '../../../components/Sales/SalesCard'
import PaymentCard from '../../../components/Sales/PaymentCard'
import ReetInfo from '../../../components/Sales/ReetInfo'
import { useSelector } from 'react-redux'
import SubmitSales from '../../../components/Sales/SubmitSales'

const LandSalesInfo = ({ refetch }) => {
    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    const isEditable = useSelector((state) => state?.forms?.isEditable)
    const landAssetInfo = useSelector((state) => state?.forms?.LandAssetInfo)
    console.log('landAssetInfo in sales', landAssetInfo)

    return (
        <div>
            <>
                {((roleName === 'Viewer' && department !== 'Land Bank') ||
                    (roleName === 'Editor' && department !== 'Land Bank') ||
                    (roleName === 'Approver' && department !== 'Land Bank') ||
                    (roleName === 'Admin' &&
                        ['Finance', 'Sales', 'Legal', 'IT'].includes(
                            department
                        ))) && (
                    <div className="rounded-lg grid  grid-cols-3 gap-6">
                        <div className="hover:border hover:border-[#dfd9ca] rounded-2xl">
                            <BuyerCard />
                        </div>
                        <div className=" salescard">
                            <SalesCard refetch={refetch} />
                        </div>
                        <div className="hover:border hover:border-[#dfd9ca] rounded-2xl">
                            <PaymentCard />
                        </div>
                    </div>
                )}

                {department !== 'Legal' &&
                    (roleName === 'Viewer' ||
                        (roleName === 'Admin' &&
                            ['Land Bank', 'Finance', 'Sales', 'IT'].includes(
                                department
                            )) ||
                        roleName === 'Editor' ||
                        roleName == 'Viewer' ||
                        roleName == 'Approver' ||
                        department === 'Land Bank') && (
                        <div>
                            <ReetInfo />
                        </div>
                    )}
            </>

            {isEditable &&
                (roleName === 'Editor' || roleName === 'Approver') &&
                department === 'Sales' &&
                (landAssetInfo?.status === 'Data Not Submitted' ||
                    landAssetInfo?.status === 'Send Back') && (
                    <div className="flex justify-end ">
                        <SubmitSales refetch={refetch} />
                    </div>
                )}
            {/* {isEditable &&
                (department === 'Sales' || department === 'Finance') && (
                    <div className="flex justify-end ">
                        <SubmitSales refetch={refetch} />
                    </div>
                )} */}
        </div>
    )
}

export default LandSalesInfo
