import LandCard from '../../components/LandView/LandCard'
import Tabs from '../../components/LandTabs'
import OwnershipModifyComponent from '../../components/OwnershipModifyComponent'
const LandOverViewDetails = () => {
    return (
        <div className=" px-12 2xl:px-24 4xl:px-32 py-8 box-border">
            <div className="grid">
                <>
                    <div className="w-full flex">
                        <LandCard />
                    </div>
                    <div className="bg-white rounded-b-3xl">
                        <Tabs />
                        {/* Important Dont Remove */}
                        {/* <OwnershipModifyComponent /> */}
                    </div>
                </>
            </div>
        </div>
    )
}

export default LandOverViewDetails
