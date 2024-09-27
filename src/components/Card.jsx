import { useNavigate } from 'react-router-dom'
import Image from '../assets/image.svg'
import M2 from '../assets/Card Image/ImageM2.svg'
import { truncateText } from '../lib/utils'
import { pushRoute } from '../features/breadcrumbSlice'
import { useDispatch, useSelector } from 'react-redux'

const Card = ({
    assetData,
    selectedCt,
    selectedDt,
    selectedAt,
    cityId,
    title,
    sub,
    image,
    icon,
    totalLands,
    m2,
    m2Data,
    gpsIcon,
    location,
}) => {
    const roleName = localStorage.getItem('roleName')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAssetClick = (
        assetData,
        selectedAsset,
        selectedCity,
        selectedDistrict
    ) => {
        dispatch(pushRoute(`${title}`))
        if (roleName === 'Viewer' || roleName === 'Editor') {
            navigate('/analytics', {
                state: {
                    title,
                    cityId,
                    assetData,
                    selectedAsset,
                    selectedCity,
                    selectedDistrict,
                },
            })
        } else {
            navigate('/approver-analytics', {
                state: {
                    title,
                    cityId,
                    assetData,
                    selectedCity,
                    selectedDistrict,
                },
            })
        }
    }
    console.log(cityId)
    const x = useSelector((state) => state.breadcrumb.breadcrumbRoutes)
    console.log(x, 'this is x')

    // added pusged commit
    return (
        <div
            onClick={() =>
                handleAssetClick(assetData, selectedAt, selectedCt, selectedDt)
            }
            className="max-w-sm py-4 rounded-2xl overflow-hidden border hover:border-primary-300 hover:bg-custom-gradient-bottom-right bg-white cursor-pointer flex flex-col"
        >
            <div className="flex px-7 items-start">
                {Image && (
                    <img
                        className="w-16 h-16"
                        src={Image}
                        alt={title}
                        loading="lazy"
                    />
                )}
                <div className="p-4 flex flex-col items-start">
                    {title && (
                        <h2 className="text-base 2xl:text-xl text-primary-Main font-semibold">
                            {window.innerWidth < 1700
                                ? truncateText(title, 2)
                                : title}
                        </h2>
                    )}

                    {sub && (
                        <h3 className="text-primary-600 text-sm font-medium">
                            Asset Code: {sub}
                        </h3>
                    )}
                </div>
            </div>

            <div className="px-7 py-2 bg-primary-50 items-center flex">
                <div className="bg-primary-100 rounded-full">
                    {icon && (
                        <img
                            className="p-2 h-14 w-14"
                            src={icon}
                            alt={title}
                            loading="lazy"
                        />
                    )}
                </div>
                <div className="flex flex-col ps-4">
                    <h2 className="text-neutral-600 text-base font-normal">
                        Total Lands
                    </h2>
                    {totalLands && (
                        <h2 className="font-semibold text-[22px] text-neutral-700">
                            {totalLands}
                        </h2>
                    )}
                </div>
            </div>
            <div className="px-7 py-4 flex items-center">
                {M2 && <img className="h-[24px]" src={M2} />}
                {m2Data && (
                    <h2 className="ps-4 font-bold text-neutral-700">
                        {`${m2Data.toLocaleString('en-US')} m2`}
                    </h2>
                )}
                {/* <h2 className="ps-4">{m2Data}</h2> */}
            </div>
            <div className="px-7 flex">
                {gpsIcon && (
                    <img className="h-[24px]" src={gpsIcon} alt={location} />
                )}
                {location && (
                    <h2 className="ps-4 font-semibold text-lg text-neutral-700">
                        {location}
                    </h2>
                )}
            </div>
        </div>
    )
}
export default Card
