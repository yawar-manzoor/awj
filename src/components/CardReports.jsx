import React from 'react'
import Button from './ui/Button'

const CardReports = ({
    RType,
    Date,
    Image,
    PublishedDate,
    DocumentType,
    FileSize,
}) => {
    return (
        <div className="max-w-sm py-4  rounded-2xl overflow-hidden bg-[#DFD9CA]/25 mt-6 cursor-pointer flex flex-col">
            <div className="flex px-7">
                <div className="py-4 flex flex-col justify-center flex-grow">
                    {RType && (
                        <h2 className="text-xl text-primary-Main font-bold">
                            {RType}
                        </h2>
                    )}
                    {Date && <h3 className="text-primary-500 mb-2">{Date}</h3>}
                </div>
                {Image && <img className="h-auto" src={Image} alt={RType} />}
            </div>
            <div className="px-7 flex flex-col">
                {PublishedDate && (
                    <h3 className=" text-neutral-600">
                        Published Date:
                        <span className="font-bold"> {PublishedDate}</span>
                    </h3>
                )}
                {DocumentType && (
                    <h3 className="mt-2 text-neutral-600">
                        Document Type:
                        <span className="font-bold"> {DocumentType}</span>
                    </h3>
                )}
                {FileSize && (
                    <h3 className="text-neutral-600 mt-2">
                        File Size:
                        <span className="font-bold"> {FileSize}</span>
                    </h3>
                )}
            </div>

            {/* --------BUTTONS------- */}
            <div className="py-4 px-7 mt-4 flex space-x-6">
                <Button
                    variant="primary"
                    size="medium"
                    className="bg-primary-Main border rounded-lg font-bold w-full text-white px-4 py-2"
                >
                    Download
                </Button>
                <Button
                    variant="primary"
                    size="medium"
                    className="text-primary-Main border font-bold rounded-lg border-primary-Main px-4 w-full py-2"
                >
                    View
                </Button>
            </div>
        </div>
    )
}

export default CardReports
