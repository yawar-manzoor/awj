import React from 'react'
import Tick from '../../assets/tick-circle.svg'
import CrossTick from '../../assets/cross-circle.svg'
import Button from '../ui/Button'
const Modal = ({ setShowModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white  grid gap-4 rounded-[20px] p-8 max-w-md relative">
                <Button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <img src={CrossTick} alt="cancel" />
                </Button>
                <div className="flex justify-center  ">
                    <div className="rounded-full">
                        <img src={Tick} alt="tick" className="h-16" />
                    </div>
                </div>
                <div className="">
                    <h2 className="text-center text-2xl font-normal text-success ">
                        Submitted!
                    </h2>
                    <p className="text-center text-base font-semibold text-primary-600 ">
                        Request #: 98462548
                    </p>
                    <p className="text-center text-base text-[#858E93] ">
                        Your add new land request has been successfully
                        submitted. You'll receive an email or notification with
                        an update on the status of your request.
                    </p>
                </div>
                <div className="flex justify-center h-fit ">
                    <Button
                        className="bg-primary-Main text-white py-3 px-10 rounded-lg font-medium text-base"
                        onClick={() => console.log('Track Request')}
                    >
                        Track Request
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Modal
