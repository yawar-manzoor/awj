import PropertyIcon from '../assets/AssetCardIcons/PropertyIcon.svg'
import PropertyIconOrange from '../assets/AssetCardIcons/PropertyIconOrange.svg'
import Property from '../assets/AssetCardIcons/Property.svg'
import PropertyType from '../assets/AssetCardIcons/PropertyType.svg'
import Location from '../assets/AssetCardIcons/location.svg'
import AreaIcon from '../assets/AssetCardIcons/AreaSize.svg'
import ArrowIcon from '../assets/AssetCardIcons/Arrows.svg'
import commercialIcon from '../assets/AssetCardIcons/commercial.svg'
import AgriIcon from '../assets/AssetCardIcons/Agricultural.svg'
import resiIcon from '../assets/AssetCardIcons/Residential.svg'
import mixUseIcon from '../assets/AssetCardIcons/MixedUse.svg'
import industrialIcon from '../assets/AssetCardIcons/Industrial.svg'
import WeightIcon from '../assets/AssetCardIcons/Weight.svg'
import Manual from '../assets/AssetCardIcons/Pencil.svg'
import CrossIcon from '../assets/AssetCardIcons/group.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { pushRoute } from '../features/breadcrumbSlice'
import { truncateText } from '../lib/utils'
import useWindowWidth from '../lib/WindowWidth'

const AssetCard = ({ assetInfo, isEditor, isApprover }) => {
    const windowWidth = useWindowWidth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isDepartment = localStorage.getItem('department')
    const handleNavigate = (landId) => {
        dispatch(pushRoute(`${assetInfo.referenceNumber}`))
        navigate(`/land-overview`, { state: { landId: landId } })
    }

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-[#29976433] text-success border-[#29976433]'
            case 'Send Back':
                return 'bg-[#F2440D33] text-[#F2440D] border-[#F2440D33]'
            case 'Data Not Submitted':
                return 'bg-[#F7970833] text-[#F79708] border-[#F7970833]'
            case 'Waiting for Approval':
                return 'bg-[#487ADA33] text-[#487ADA] border-[#487ADA33]'
            default:
                return ''
        }
    }
    const getLandUseIcon = (landUse) => {
        switch (landUse) {
            case 'Residential':
                return resiIcon
            case 'Commercial':
            case 'Retail spaces':
            case 'Shopping centers':
            case 'Malls':
            case 'Restaurants':
            case 'Hotels and motels':
            case 'Office buildings':
                return commercialIcon
            case 'Agricultural':
            case 'Farms':
                return AgriIcon
            case 'Mixed-Use':
                return mixUseIcon
            case 'Public & Institutional':
            case 'Educational':
            case 'Schools':
            case 'Universities':
            case 'Training Centers':
            case 'Clinics':
            case 'Health Center':
            case 'Hospital':
            case 'Mosque':
            case 'Government':
                return industrialIcon
            case 'Industrial':
            case 'Manufacturing Plants':
            case 'Distribution Centers':
            case 'Research and development facilities':
            case 'Warehouses':
                return industrialIcon
            default:
                return
        }
    }
    const getDeedTypeIcon = (deedType) => {
        switch (deedType) {
            case 'Manual':
                return Manual
            case 'حجه استحكام':
                return WeightIcon
            default:
                return Property
        }
    }
    const getLandUseClass = (landUse) => {
        switch (landUse) {
            case 'Residential':
            case 'Commercial':
            case 'Industrial':
            case 'Agricultural':
            case 'Mixed-Use':
            case 'Farms':
            case 'Office buildings':
            case 'Retail spaces':
            case 'Shopping Centers':
            case 'Hotels and motels':
            case 'Restaurants':
            case 'Manufacturing plants':
            case 'Warehouses':
            case 'Distribution centers':
            case 'Research and development facilities':
                return 'min-w-24 bg-[#132D5E1A] text-secondary'
            default:
                return 'bg-[#F797081A] text-primaryYellow-500 min-w-24'
        }
    }

    const getLandUseIconTr = (landUse) => {
        switch (landUse) {
            case 'Residential':
            case 'Commercial':
            case 'Industrial':
            case 'Agricultural':
            case 'Mixed-Use':
            case 'Farms':
            case 'Office buildings':
            case 'Retail spaces':
            case 'Shopping Centers':
            case 'Hotels and motels':
            case 'Restaurants':
            case 'Manufacturing plants':
            case 'Warehouses':
            case 'Distribution centers':
            case 'Research and development facilities':
                return ArrowIcon
            default:
                return CrossIcon
        }
    }

    return (
        <div
            className="flex flex-col bg-white border hover:border-primary-300 hover:bg-custom-gradient-bottom-right  rounded-2xl cursor-pointer py-6 space-y-4 "
            onClick={() => handleNavigate(assetInfo.landId)}
        >
            {isEditor && (
                <button
                    className={`${getStatusStyles(
                        assetInfo.status
                    )} mx-[19px] rounded-lg py-3 px-4 font-bold border`}
                >
                    {assetInfo.status}
                </button>
            )}
            <div className="flex justify-between px-5 items-start">
                <div>
                    <p className="2xl:text-xl   text-sm font-semibold  text-primary-Main">
                        {assetInfo.referenceNumber}
                    </p>
                    <p className="2xl:text-base text-sm font-medium  text-primary-600">
                        Asset :{' '}
                        {windowWidth > 1550
                            ? assetInfo.assetName
                            : truncateText(assetInfo.assetName, 2)}
                    </p>
                    <p className="text-sm font-medium text-neutral-700">
                        Sub Asset : {assetInfo.subAssetName}
                    </p>
                </div>
                {/* <div className="flex flex-col items-end ">
                    <span
                        className={`${
                            assetInfo.businessPlan === 'Sale' ||
                            assetInfo.businessPlan === 'Development'
                                ? `${
                                      assetInfo.businessPlan === 'Sale'
                                          ? 'min-w-24 '
                                          : 'min-w-36 '
                                  } bg-[#132D5E1A] text-secondary`
                                : 'bg-[#F797081A] text-primaryYellow-500 min-w-24'
                        }   inline-flex items-center gap-x-1 justify-center 2xl:text-base text-sm whitespace-nowrap font-medium py-[6px] 2xl:px-4 px-2  rounded-lg`}
                    >
                        {assetInfo.businessPlan}
                        <img
                            src={
                                assetInfo.businessPlan === 'Sale' ||
                                assetInfo.businessPlan === 'Development'
                                    ? ArrowIcon
                                    : CrossIcon
                            }
                            alt=""
                        />
                    </span>
                    <div className="inline-flex items-center gap-x-2 mt-1">
                        <span
                            className={`inline-block ${
                                assetInfo.landStatus === 'Developed'
                                    ? 'bg-success'
                                    : 'bg-primaryYellow-500'
                            } w-3 h-3 rounded-full`}
                        ></span>
                        <p
                            className={`${
                                assetInfo.landStatus === 'Developed'
                                    ? 'text-success'
                                    : ''
                            } text-primaryYellow-500 font-medium py-1`}
                        >
                            {assetInfo.landStatus}
                        </p>
                    </div>
                </div> */}
                <div className="flex flex-col items-end">
                    <span
                        className={`${getLandUseClass(
                            assetInfo.landUse
                        )} inline-flex items-center gap-x-1 justify-center 2xl:text-base text-sm whitespace-nowrap font-medium py-[6px] 2xl:px-4 px-2 rounded-lg`}
                    >
                        {assetInfo.businessPlan}
                        <img src={getLandUseIconTr(assetInfo.landUse)} alt="" />
                    </span>
                    <div className="inline-flex items-center gap-x-2 mt-1">
                        <span
                            className={`inline-block ${
                                assetInfo.landStatus === 'Developed'
                                    ? 'bg-success'
                                    : 'bg-primaryYellow-500'
                            } w-3 h-3 rounded-full`}
                        ></span>
                        <p
                            className={`${
                                assetInfo.landStatus === 'Developed'
                                    ? 'text-success'
                                    : ''
                            } text-primaryYellow-500 font-medium py-1`}
                        >
                            {assetInfo.landStatus}
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    assetInfo.deedStatus == 'Active'
                        ? 'bg-primaryGreen-200'
                        : 'bg-primaryYellow-100'
                } flex items-center space-x-3 py-5 px-5`}
            >
                <img
                    src={
                        assetInfo.deedStatus == 'Active'
                            ? PropertyIcon
                            : PropertyIconOrange
                    }
                    loading="lazy"
                    alt=""
                />
                <div>
                    <span className="flex space-x-2 py-2">
                        <img src={PropertyType} alt="" loading="lazy" />{' '}
                        <p className="font-semibold text-[18px] text-neutral-700">
                            {assetInfo.deedOwner}
                        </p>
                    </span>
                    <span className="flex space-x-2">
                        <img
                            src={getDeedTypeIcon(assetInfo.deedType)}
                            alt=""
                            loading="lazy"
                        />{' '}
                        <p className="font-medium text-neutral-700 text-base">
                            {assetInfo.deedType}
                        </p>
                    </span>
                </div>
            </div>
            {isDepartment == 'Finance' ||
            isDepartment == 'IT' ||
            isDepartment == 'Investment' ? (
                <div className="px-5">
                    <p className="text-neutral-600">Valuation</p>
                    <p className="text-secondary font-semibold text-[18px]">
                        SAR {assetInfo.valuation}
                    </p>
                </div>
            ) : null}
            <div className="text-primary-Main grid grid-cols-2 gap-4 items-center text-sm px-4">
                <span className="font-semibold inline-flex items-center gap-x-2 rounded-full bg-primary-100 ps-1 py-2">
                    <span className="rounded-full bg-primary-200 w-10 h-10 flex justify-center items-center">
                        <img
                            src={getLandUseIcon(assetInfo.landUse)}
                            loading="lazy"
                        />
                    </span>{' '}
                    {assetInfo.landUse}
                </span>
                <span
                    className={`font-semibold ${
                        assetInfo.wltStatus == 'Yes'
                            ? 'bg-[#2997641A] text-success '
                            : 'bg-[#F768081A] text-warning'
                    } inline-flex items-center gap-x-2 rounded-full  ps-1 py-2`}
                >
                    <span
                        className={`rounded-full ${
                            assetInfo.wltStatus == 'Yes'
                                ? 'bg-[#2997641A]'
                                : 'bg-[#fdd5ba]'
                        } w-10 h-10 flex justify-center items-center`}
                    >
                        {/* <img src={TickCircle} loading="lazy" /> */}
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.3008 22.8229C17.8008 22.8229 22.3008 18.3229 22.3008 12.8229C22.3008 7.32288 17.8008 2.82288 12.3008 2.82288C6.80078 2.82288 2.30078 7.32288 2.30078 12.8229C2.30078 18.3229 6.80078 22.8229 12.3008 22.8229Z"
                                stroke={`${
                                    assetInfo.wltStatus == 'Yes'
                                        ? '#299764'
                                        : '#F76808'
                                }`}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.05078 12.8229L10.8808 15.6529L16.5508 9.99288"
                                stroke={`${
                                    assetInfo.wltStatus == 'Yes'
                                        ? '#299764'
                                        : '#F76808'
                                }`}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>{' '}
                    WLT {assetInfo.wltStatus}
                </span>
                <span className="font-semibold inline-flex items-center gap-x-2 rounded-full bg-primary-100  ps-1 py-2">
                    <span className="rounded-full bg-primary-200 w-10 h-10 flex justify-center items-center">
                        {' '}
                        <img src={Location} loading="lazy" />{' '}
                    </span>{' '}
                    {assetInfo.cityName}
                </span>
                <span className="font-semibold inline-flex items-center gap-x-2 rounded-full bg-primary-100  ps-1 py-2">
                    <span className="rounded-full bg-primary-200 w-10 h-10 flex justify-center items-center">
                        {' '}
                        <img src={AreaIcon} loading="lazy" />{' '}
                    </span>{' '}
                    {`${assetInfo.landArea.toLocaleString('en-US')} m2`}
                </span>
            </div>
        </div>
    )
}

export default AssetCard
