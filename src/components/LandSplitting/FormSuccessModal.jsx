import { CheckCircle2Icon } from 'lucide-react'
import { XCircleIcon } from 'lucide-react'
import { CheckCircleIcon } from 'lucide-react'
import React from 'react'

function FormSuccessModal({
    showFormSuccessModal,
    setShowFormSuccessModal,
    setShowTrackRequestDetails,
}) {
    return (
        <>
            <div
                onClick={() => setShowFormSuccessModal(false)}
                className="fixed inset-0 w-full h-full bg-black/50 z-10"
            ></div>
            <div className="fixed flex flex-col gap-12 items-center  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-lg z-20 py-14 px-7">
                <XCircleIcon
                    onClick={() => setShowFormSuccessModal(false)}
                    className="absolute size-6 right-4 top-4 text-[#837550] stroke-[1px]"
                />
                <CheckCircle2Icon className="text-[#299764] size-20 stroke-[1px]" />
                <div className="flex flex-col gap-3 items-center">
                    <h3 className="text-center text-[#299764] text-2xl font-normal">
                        Success!
                    </h3>
                    <div className="flex flex-col items-center">
                        <span className="text-center text-[#9E8D60] text-base font-normal">
                            Request # : 98462548
                        </span>
                        <p className="text-center text-base font-normal text-[#858E93]">
                            Your land splitting request has been successfully
                            submitted. You’ll receive an email or notification
                            with an update on the status of your request.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setShowTrackRequestDetails(true)
                            setShowFormSuccessModal(false)
                        }}
                        className="mt-3 bg-[#837550] text-white px-10 py-3 rounded-lg font-medium text-base"
                    >
                        Track Request
                    </button>
                </div>
            </div>
        </>
    )
}

export default FormSuccessModal
