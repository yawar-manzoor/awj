import { useState } from 'react'
import CloseIcon from '../assets/AssetCardIcons/close-circle.svg'
import ArrowIcon from '../assets/AssetCardIcons/Arrows.svg'
import CrossIcon from '../assets/AssetCardIcons/group.svg'
import Property from '../assets/AssetCardIcons/PropertyIcon.svg'
import PropertyIconOrange from '../assets/AssetCardIcons/PropertyIconOrange.svg'
import PropertyType from '../assets/AssetCardIcons/Property.svg'
import PropertyUser from '../assets/AssetCardIcons/PropertyType.svg'
import Manual from '../assets/AssetCardIcons/Pencil.svg'
import WeightIcon from '../assets/AssetCardIcons/Weight.svg'
import Accordion from './LandUseAcc'
import commercialIcon from '../assets/AssetCardIcons/commercial.svg'
import AgriIcon from '../assets/AssetCardIcons/Agricultural.svg'
import resiIcon from '../assets/AssetCardIcons/Residential.svg'
import mixUseIcon from '../assets/AssetCardIcons/MixedUse.svg'
import industrialIcon from '../assets/AssetCardIcons/Industrial.svg'
import publicIcon from '../assets/AssetCardIcons/Public&Instt.svg'

const TourPopUp = ({ closePopUp }) => {
    const dataPages = [
        {
            title: 'Reference ID',
            refId: 'RUH-RBWA-SB01-0001',
            assetName: 'Rabwa',
            subAssetName: 'Rabwa Riyadh Outlet SB01',
            description: 'How will the reference ID be generated?',
            components: [
                { label: 'City', value: 'Riyadh' },
                { label: 'Asset', value: 'Rabwa' },
                { label: 'Sub Asset', value: 'SB01' },
                { label: 'Sequel Number', value: '01' },
            ],
        },
        {
            title: 'Business Plan',
            refId: 'RYD-RBWA-SB01-0001',
            assetName: 'Rabwa',
            subAssetName: 'Rabwa Riyadh Outlet SB01',
            businessPlans: [
                'Lease',
                'Sale',
                'Development',
                'Splitting',
                'No Plan',
            ],
            desc: "It looks like you're considering different aspects or strategies in real estate.",
        },
        {
            title: 'Land Status',
            refId: 'RYD-RBWA-SB01-0001',
            assetName: 'Rabwa',
            subAssetName: 'Rabwa Riyadh Outlet SB01',
            description: 'Description for Land Status',
            landStatuses: [
                {
                    type: 'Transactable',
                    categories: [
                        'Residential',
                        'Commercial',
                        'Industrial',
                        'Agricultural',
                        'Mixed-Use',
                    ],
                },
                {
                    type: 'Non - Transactable',
                    categories: ['Public & Institutional', 'Expropriation'],
                },
            ],
            desc: 'All land type are transactable except Public & Institutional',
        },
        {
            title: 'Title Deed Details',
            ownername: 'Azad Electronics',
            businessType: 'Electronics',
            owner: 'Owner Name',
            deedTypes: ['Electronic Parcel', 'Manual', 'حجه استحكام'],
            statuses: ['Active', 'In Active'],
            icon: Property,
        },
        {
            title: 'Land Use',
            landUseData: [
                {
                    status: 'Commercial',
                    icon: commercialIcon,
                    children: [
                        'Retail spaces (shopping centers, malls)',
                        'Restaurants',
                        'Hotels and motels',
                        'Office buildings',
                    ],
                },
                {
                    status: 'Industrial',
                    icon: industrialIcon,
                    children: [
                        'Manufacturing plants',
                        'Distribution centers',
                        'Research and development facilities',
                        'Warehouses',
                    ],
                },
                {
                    status: 'Public & Institutional',
                    icon: publicIcon,
                    children: [
                        'Educational: Schools, universities, training centers',
                        'Healthcare: Hospitals, clinics, health centers.',
                        'Mosques',
                        'Government',
                    ],
                },
                {
                    status: 'Agricultural',
                    icon: AgriIcon,
                    children: ['Farms'],
                },
                {
                    status: 'Residential',
                    icon: resiIcon,
                },
                {
                    status: 'Mixed-Use',
                    icon: mixUseIcon,
                },
            ],
        },
    ]

    const [currentPage, setCurrentPage] = useState(0)

    const handleNext = () => {
        if (currentPage < dataPages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#B0A68C] bg-opacity-50">
            <div className="bg-white p-8 rounded-[20px] shadow-lg max-w-xl w-full">
                <div className="flex justify-between">
                    <span className="text-xl font-semibold text-neutral-600 mb-6">
                        {dataPages[currentPage].title}
                    </span>
                    <span className="inline">
                        <img
                            src={CloseIcon}
                            onClick={() => closePopUp(false)}
                            className="cursor-pointer"
                            alt="Close"
                        />
                    </span>
                </div>

                {currentPage === 0 ? (
                    <div className=" rounded-2xl ">
                        <div className="bg-[#F9F9F9] p-7 rounded-2xl">
                            <div className=" inline-flex justify-between w-full">
                                <span className="text-primary-Main text-xl font-semibold block">
                                    {dataPages[currentPage].refId}
                                </span>
                                <span className="min-w-24 opacity-20 bg-[#132D5E1A] text-secondary inline-flex items-center gap-x-1 justify-center 2xl:text-base text-sm whitespace-nowrap font-medium py-[6px] 2xl:px-4 px-2 rounded-lg">
                                    Sale
                                    <img src={ArrowIcon} alt="" />
                                </span>
                            </div>
                            <div className="opacity-20">
                                <div
                                    className="text-primary-600 font-medium
                                "
                                >
                                    Asset : {dataPages[currentPage].assetName}
                                </div>
                                <div className="text-neutral-700 font-medium">
                                    Sub Asset :{' '}
                                    {dataPages[currentPage].subAssetName}
                                </div>
                            </div>
                        </div>
                        <p className="text-neutral-600 mt-7 mb-4 ">
                            {dataPages[currentPage].description}
                        </p>
                        <div className="flex justify-between items-center mb-12">
                            {dataPages[currentPage].components.map(
                                (component, index) => (
                                    <>
                                        <div
                                            key={index}
                                            className=" bg-[#F6F5F1] px-3 p-2 flex flex-col justify-center items-center rounded-lg"
                                        >
                                            <p className="text-neutral-700 font-semibold text-sm">
                                                {component.label}
                                            </p>
                                            <p className="text-primary-400 font-semibold text-sm">
                                                {component.value}
                                            </p>
                                        </div>
                                        {index <= 2 && (
                                            <span className="text-neutral-600 font-semibold">
                                                +
                                            </span>
                                        )}
                                    </>
                                )
                            )}
                        </div>
                    </div>
                ) : dataPages[currentPage].title === 'Land Use' ? (
                    <>
                        <span className="text-neutral-700 block my-3">
                            Better experience with transformed data (Land Use
                            Data)
                        </span>
                        <Accordion
                            landUseData={dataPages[currentPage].landUseData}
                        />
                    </>
                ) : (
                    <div
                        className={`${
                            dataPages[currentPage].title ===
                            'Title Deed Details'
                                ? 'bg-[#F0F5F2]'
                                : 'bg-[#F9F9F9]'
                        } rounded-2xl p-8`}
                    >
                        {dataPages[currentPage].refId && (
                            <>
                                <div className="inline-flex justify-between w-full">
                                    <span className="text-primary-Main text-xl font-semibold block opacity-20">
                                        {dataPages[currentPage].refId}
                                    </span>
                                    <span className="min-w-24 bg-[#132D5E1A] text-secondary inline-flex items-center gap-x-1 justify-center 2xl:text-base text-sm whitespace-nowrap font-medium py-[6px] 2xl:px-4 px-2 rounded-lg">
                                        <span
                                            className={`${
                                                dataPages[currentPage].title ===
                                                'Land Status'
                                                    ? 'opacity-20'
                                                    : ''
                                            }`}
                                        >
                                            Sale
                                        </span>
                                        <img
                                            className={`${
                                                dataPages[currentPage].title ===
                                                'Land Status'
                                                    ? ''
                                                    : 'opacity-20'
                                            }`}
                                            src={ArrowIcon}
                                            alt=""
                                        />
                                    </span>
                                </div>
                            </>
                        )}

                        {dataPages[currentPage].assetName && (
                            <span className="text-primary-600 font-medium block opacity-20">
                                Asset : {dataPages[currentPage].assetName}
                            </span>
                        )}
                        {dataPages[currentPage].subAssetName && (
                            <span className="text-neutral-700 font-medium block opacity-20  ">
                                Sub Asset :{' '}
                                {dataPages[currentPage].subAssetName}
                            </span>
                        )}
                        <div className="flex items-center gap-x-4">
                            <img src={dataPages[currentPage].icon} alt="" />
                            <div>
                                {dataPages[currentPage].ownername && (
                                    <span className="flex items-center gap-x-2">
                                        <img src={PropertyUser} alt="" />
                                        <p className="my-2 text-lg font-semibold text-neutral-700">
                                            {dataPages[currentPage].ownername}
                                        </p>
                                    </span>
                                )}
                                {dataPages[currentPage].businessType && (
                                    <span className="flex items-center gap-x-2">
                                        <img src={PropertyType} alt="" />
                                        <p className="text-base font-medium text-neutral-700">
                                            {
                                                dataPages[currentPage]
                                                    .businessType
                                            }
                                        </p>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {dataPages[currentPage].desc && (
                    <span className="text-neutral-700 block mt-3">
                        {dataPages[currentPage].desc}
                    </span>
                )}
                {dataPages[currentPage].businessPlans && (
                    <div className="flex bg-primary-100 flex-col gap-3 px-8 py-4 rounded-2xl mt-4 mb-7">
                        {dataPages[currentPage].businessPlans.map(
                            (plan, index) => (
                                <p
                                    key={index}
                                    className="flex items-center text-neutral-600 font-semibold"
                                >
                                    <span className="mr-2 h-2 w-2 bg-neutral-600 rounded-full inline-block"></span>
                                    {plan}
                                </p>
                            )
                        )}
                    </div>
                )}
                {dataPages[currentPage].landStatuses && (
                    <div className="grid grid-cols-2 gap-x-4 my-4 ">
                        {dataPages[currentPage].landStatuses.map(
                            (status, index) => (
                                <div
                                    key={index}
                                    className="bg-primary-100 px-6 py-3 rounded-2xl text-neutral-600 font-semibold"
                                >
                                    <div className="flex items-center">
                                        <span
                                            className={`${
                                                status.type === 'Transactable'
                                                    ? 'bg-[#132D5E1A]'
                                                    : 'bg-[#F797081A]'
                                            } w-12 h-12 me-2 rounded-2xl flex items-center justify-center`}
                                        >
                                            <img
                                                src={
                                                    status.type ===
                                                    'Transactable'
                                                        ? ArrowIcon
                                                        : CrossIcon
                                                }
                                                alt=""
                                            />
                                        </span>
                                        {status.type}
                                    </div>
                                    {status.categories.map((category, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center pt-2"
                                        >
                                            <span className="mr-2 h-2 w-2 bg-neutral-600 rounded-full inline-block"></span>
                                            <p className="text-neutral-600">
                                                {category}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                )}
                {dataPages[currentPage].statuses && (
                    <div className="flex items-center gap-x-8 mt-4 mb-4">
                        {dataPages[currentPage].statuses.map((plan, index) => (
                            <div
                                key={index}
                                className="text-neutral-600 flex flex-col font-semibold"
                            >
                                <span
                                    className={`${
                                        plan == 'Active'
                                            ? 'bg-[#F0F5F2]'
                                            : 'bg-[#FFF3EC]'
                                    } p-3 rounded-xl inline-block `}
                                >
                                    <img
                                        className="w-14 h-14"
                                        src={
                                            plan == 'Active'
                                                ? Property
                                                : PropertyIconOrange
                                        }
                                        alt=""
                                    />
                                </span>
                                <span className="text-center mt-1">{plan}</span>
                            </div>
                        ))}
                    </div>
                )}
                {dataPages[currentPage].owner && (
                    <div className="flex flex-col space-y-2 bg-primary-100 px-6 py-3 rounded-2xl">
                        <span className="text-primary-Main text-lg font-semibold">
                            TD Owner Name
                        </span>
                        <span className="flex gap-x-2">
                            <img src={PropertyUser} alt="" />
                            <p className="my-2 text-base text-neutral-600 font-semibold">
                                {dataPages[currentPage].owner}
                            </p>
                        </span>
                    </div>
                )}

                {dataPages[currentPage].deedTypes && (
                    <div className="space-y-3 bg-primary-100 px-6 py-3 rounded-2xl my-4 border mb-6">
                        <span className="text-lg text-primary-Main font-semibold">
                            TD Type
                        </span>
                        {dataPages[currentPage].deedTypes.map((plan, index) => (
                            <div
                                key={index}
                                className=" text-neutral-600 flex items-center gap-x-2 font-semibold"
                            >
                                <img
                                    src={
                                        plan == 'Electronic Parcel'
                                            ? PropertyType
                                            : plan == 'Manual'
                                            ? Manual
                                            : WeightIcon
                                    }
                                    alt=""
                                />

                                <span className=""> {plan} </span>
                            </div>
                        ))}
                    </div>
                )}
                <div
                    className={`flex ${
                        currentPage === 0 ? 'justify-end' : 'justify-between'
                    } `}
                >
                    {currentPage === 0 ? (
                        ''
                    ) : (
                        <button
                            onClick={handlePrevious}
                            className={`px-10 py-3 rounded-lg font-medium ${
                                currentPage === 0
                                    ? 'bg-neutral-100 text-primary-Main'
                                    : 'border border-primary-Main text-primary-Main'
                            }`}
                            disabled={currentPage === 0}
                        >
                            Back
                        </button>
                    )}
                    {currentPage === 4 ? (
                        <button
                            onClick={() => closePopUp(false)}
                            className={`px-10 py-3 rounded-lg font-medium bg-primary-Main text-white cursor-pointer`}
                        >
                            Close
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className={`px-10 py-3 rounded-lg font-medium ${
                                currentPage === dataPages.length - 1
                                    ? 'bg-neutral-100 text-primary-Main'
                                    : 'bg-primary-Main text-white'
                            }`}
                            disabled={currentPage === dataPages.length - 1}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TourPopUp
