import { useState } from 'react'
import CloseIcon from '../../assets/AssetCardIcons/close-circle.svg'
import Tick from '../../assets/tickPopup.svg'
import QuestionMark from '../../assets/questionMark.svg'
import { Link, useLocation } from 'react-router-dom'

const OldData = {
    assetName: 'Plot 2 Amwaj Mall',
    subAssterName: 'Plot 2 Am',
    city: 'Riyadh',
    district: 'Rabwa',
    area: '62658M',
    description: 'this is desciption Lorem ipsum do.',
}

const newData = {
    assetName: 'Plot 2 Amwaj Mall',
    isAssetEdited: 1,
    subAssterName: 'Plot 2 Am',
    isSubAssetEdited: 0,
    city: 'Riyadh',
    isCityEdited: 1,
    district: 'Rabwa',
    isDistrictEdited: 0,
    area: '62658M',
    isAreaEdited: 0,
    description: 'this is desciption Lorem ipsum do.',
    isDescriptionEdited: 1,
    requesterDate: '21/2/2014',
}

const popUp = [
    {
        id: 1,
        title: 'Send Back?',
    },
    {
        id: 2,
        title: 'Approved',
    },
]
const LandInfoUpdate = () => {
    const [approve, setApprove] = useState(false)
    const [content, setContent] = useState('')
    const [commentState, setCommentState] = useState({ comment: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setCommentState((prev) => ({ ...prev, [name]: value }))
    }

    function handleApprove(value) {
        setContent(value)
        setApprove(true)
        console.log(commentState)
    }

    function handleClose() {
        setApprove(false)
    }

    return (
        <div className="mx-12 p-8 2xl:mx-24 4xl:mx-32 h-screen rounded-2xl box-border bg-white">
            <div className="my-6 text-neutral-600 font-semibold text-3xl">
                Land Info Updated ..
            </div>
            <div className="bg-primary-100 pt-4 rounded-2xl">
                <div className="px-8 py-6">
                    <span className="px-6 text-primary-Main text-xl font-semibold">
                        Old Value
                    </span>
                    <div className="flex text-primary-Main py-4 px-6 font-medium border-b border-primary-Main ">
                        <div className="flex flex-[1.5] items-center  border-r border-primary-300">
                            <span className="">#</span>
                            <span className="px-6">Asset Name</span>
                        </div>
                        <div className="flex-[1] px-2 flex items-center border-r border-primary-300">
                            Sub Asset Name
                        </div>
                        <div className="flex-[1] px-2 flex items-center border-r border-primary-300">
                            City
                        </div>
                        <div className="flex-[1] px-2 flex items-center border-r border-primary-300">
                            District
                        </div>
                        <div className="flex-[1] px-2 flex items-center border-r border-primary-300">
                            Area
                        </div>
                        <div className="flex-[2] px-2 flex  items-center border-primary-300">
                            Description
                        </div>
                        {/* <div className="flex-1 px-2 text-left"></div> */}
                    </div>
                    {/* VAlue */}
                    <div className="flex text-neutral-600 bg-primary-200 text-base rounded-lg py-4 px-6 mt-2">
                        <div className="flex flex-[1.5] items-center  border-r border-primary-300">
                            <span className="">#</span>
                            <span className="px-6">{OldData.assetName}</span>
                        </div>
                        <div className="flex-[1] px-2 flex items-center border-r border-primary-300">
                            {OldData.subAssterName}
                        </div>
                        <div className="flex-[1] px-2 flex items-center border-r border-primary-300">
                            {OldData.city}
                        </div>
                        <div className="flex-[1] px-2 flex items-center border-r border-primary-300">
                            {OldData.district}
                        </div>
                        <div className="flex-[1] px-2 flex items-center border-r border-primary-300">
                            {OldData.area}
                        </div>
                        <div className="flex-[2] px-2 flex  items-center border-primary-300">
                            {OldData.description}
                        </div>
                    </div>

                    <div className=" text-neutral-600 bg-primary-200 text-base rounded-lg font-medium px-6 py-6 mt-6">
                        <span className="text-primary-Main text-xl font-semibold">
                            New Value
                        </span>
                        <div className="flex mt-2">
                            <div className="flex flex-[1] flex-col text-neutral-600 ">
                                Asset Name
                                <div
                                    className={`${
                                        newData?.isAssetEdited === 1
                                            ? 'text-secondary500'
                                            : 'text-neutral-700'
                                    } font-semibold`}
                                >
                                    {newData.assetName}
                                </div>
                            </div>
                            <div className="flex-[1] flex flex-col text-neutral-600 ">
                                Sub Asset Name
                                <div
                                    className={`${
                                        newData?.isSubAssetEdited === 1
                                            ? 'text-secondary500'
                                            : 'text-neutral-700'
                                    } font-semibold`}
                                >
                                    {newData.subAssterName}{' '}
                                </div>
                            </div>
                            <div className="flex-[.6] flex flex-col text-neutral-600 ">
                                City
                                <div
                                    className={`${
                                        newData?.isCityEdited === 1
                                            ? 'text-secondary500'
                                            : 'text-neutral-700'
                                    } font-semibold`}
                                >
                                    {newData.city}{' '}
                                </div>
                            </div>
                            <div className="flex-[.6] flex flex-col text-neutral-600 ">
                                District
                                <div
                                    className={`${
                                        newData?.isDistrictEdited === 1
                                            ? 'text-secondary500'
                                            : 'text-neutral-700'
                                    } font-semibold`}
                                >
                                    {newData.district}{' '}
                                </div>
                            </div>
                            <div className="flex-[.6] flex flex-col text-neutral-600 ">
                                Area
                                <div
                                    className={`${
                                        newData?.isAreaEdited === 1
                                            ? 'text-secondary500'
                                            : 'text-neutral-700'
                                    } font-semibold`}
                                >
                                    {newData.area}{' '}
                                </div>
                            </div>
                            <div className="flex-[2] flex flex-col text-neutral-600 ">
                                Description
                                <div
                                    className={`${
                                        newData?.isDescriptionEdited === 1
                                            ? 'text-secondary500'
                                            : 'text-neutral-700'
                                    } font-semibold`}
                                >
                                    {newData.description}{' '}
                                </div>
                            </div>

                            <div className="flex-[.8] flex flex-col text-neutral-600  ">
                                Requester & Date
                                <div
                                    className={`text-neutral-700 font-semibold`}
                                >
                                    {newData.requesterDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <div className="text-neutral-400 font-medium">Comments</div>
                <textarea
                    className="w-full border border-primary-500  placeholder-primary-500 text-primary-500 rounded-lg h-28 px-3 mb-5"
                    name="comment"
                    placeholder="comments"
                    id=""
                    value={commentState.comment}
                    onChange={handleChange}
                ></textarea>
                <button
                    className={`px-10 py-3 rounded-lg bg-neutral-100 text-primary-Main border-primary-Main border mr-5 font-bold`}
                    onClick={() => handleApprove('sendBack')}
                >
                    Send Back
                </button>
                <button
                    className={`px-10 py-3 rounded-lg bg-primary-Main text-white font-bold`}
                    onClick={() => handleApprove('Approve')}
                >
                    Approve
                </button>
                <div>
                    {approve && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#B0A68C] bg-opacity-50">
                            <div className="bg-white p-6 rounded-[20px] shadow-lg max-w-2xl w-1/3">
                                <div className="flex justify-end">
                                    <span className="">
                                        <img
                                            src={CloseIcon}
                                            onClick={handleClose}
                                            className="cursor-pointer"
                                            alt="Close"
                                        />
                                    </span>
                                </div>
                                {content === 'Approve' ? (
                                    <div>
                                        <div className="flex flex-col items-center">
                                            <div className="">
                                                <img src={Tick} alt="" />
                                            </div>
                                            <p className="text-success text-2xl mt-8">
                                                Land Type Request Approved
                                            </p>
                                            <span className="text-primary-600">
                                                Request # : 98462548
                                            </span>
                                            <p className="text-[#858E93] text-center mb-6">
                                                Land Type request has been
                                                successfully submitted. You’ll
                                                receive an email or notification
                                                with an update on the status of
                                                your request.
                                            </p>
                                            <Link to="/landbank">
                                                <button
                                                    className={`px-10 py-3 rounded-lg bg-primary-Main text-white font-bold mb-6`}
                                                >
                                                    Home
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex flex-col items-center">
                                            <div className="">
                                                <img
                                                    src={QuestionMark}
                                                    alt=""
                                                />
                                            </div>
                                            <p className="text-primary-600 text-2xl mt-8">
                                                Lorem ipsum dolor sit.
                                            </p>
                                            <span className="text-primary-600">
                                                Request # : 98462548
                                            </span>
                                            <p className="text-[#858E93] text-center mb-6">
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Natus non, neque officia quia
                                                voluptatum veritatis accusantium
                                                minima ab!
                                            </p>
                                            <div>
                                                <button
                                                    className={`px-10 py-3 rounded-lg bg-neutral-100 text-primary-Main border-primary-Main border mr-5 font-bold`}
                                                    onClick={handleClose}
                                                >
                                                    Cancel
                                                </button>
                                                <Link to="/landbank">
                                                    <button
                                                        className={`px-10 py-3 rounded-lg bg-primary-Main text-white font-bold mb-6`}
                                                    >
                                                        {/* REdirect this back  */}
                                                        Yes I am sure
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LandInfoUpdate
