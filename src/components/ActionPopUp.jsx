import { useState } from 'react'
import closeIcon from '../assets/AssetCardIcons/close-circle.svg'
import SplitIcon from '../assets/Group.svg'
import plusIcon from '../assets/add-circle-600.svg'
import plus from '../assets/plus.svg'
import { useNavigate } from 'react-router-dom'

const ActionPopUp = ({ onClose }) => {
    const [showInput, setShowInput] = useState(false)
    const navigate = useNavigate(false)

    return (
        <div className="fixed inset-0  flex items-center justify-center z-50 bg-black bg-opacity-50 shadow-lg  ">
            <div className="px-8 py-10 w-full   max-w-xl rounded-[20px] bg-white">
                {/* Title and Close Button */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[26px] text-neutral-600 font-semibold">
                        Take Action & Select Land
                    </h2>
                    <span onClick={onClose} className="cursor-pointer">
                        <img src={closeIcon} alt="" />
                    </span>
                </div>

                {/* Small Divs */}
                <div className="flex gap-4 mb-4">
                    <div
                        className={`border border-primary-600 text-primary-600    py-4  cursor-pointer rounded-md`}
                        onClick={() => setShowInput(true)}
                    >
                        <span className="flex justify-end px-2"></span>
                        <span className="inline-flex items-center flex-col px-8">
                            <img src={SplitIcon} alt="" />
                            Splitting
                        </span>
                    </div>
                    <div
                        className={`${
                            showInput
                                ? 'border-primary-400 text-primary-400'
                                : 'border-primary-600 text-primary-600'
                        } border  px-8 py-4 inline-flex items-center flex-col cursor-pointer rounded-md`}
                        onClick={() => {
                            setShowInput(false)
                            navigate('/add-land')
                        }}
                    >
                        <img src={showInput ? plusIcon : plus} alt="" />
                        Add Land
                    </div>
                </div>

                {/* Input Field (conditionally shown) */}
                {showInput && (
                    <>
                        <label className="text-[#7B7B7B] mb-2 block">
                            Search with Reference ID / TD
                        </label>
                        <input
                            type="text"
                            placeholder="Search.."
                            className="w-full border border-primary-400 rounded-lg p-3 placeholder:text-primary-500 text-primary-500 focus:outline-none "
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default ActionPopUp
