import React from 'react'
import Pdf from '../../../assets/PdfDocicon.svg'
import Button from '../../../components/ui/Button'
const DocumentLibrary = () => {
    const documents = [
        {
            category: 'Ownership Docs',
            files: [
                {
                    name: 'Financial model 2023.pdf',
                    size: '2.7 Mb',
                    date: '02 March 2023',
                },
                {
                    name: 'Financial model 2023.pdf',
                    size: '2.7 Mb',
                    date: '02 March 2023',
                },
                {
                    name: 'Financial model 2023.pdf',
                    size: '2.7 Mb',
                    date: '02 March 2023',
                },
                {
                    name: 'Financial model 2023.pdf',
                    size: '2.7 Mb',
                    date: '02 March 2023',
                },
                {
                    name: 'Financial model 2023.pdf',
                    size: '2.7 Mb',
                    date: '02 March 2023',
                },
                {
                    name: 'Financial model 2023.pdf',
                    size: '2.7 Mb',
                    date: '02 March 2023',
                },
            ],
        },
        {
            category: 'Sales Docs',
            files: [
                {
                    name: 'Invoice.pdf',
                    size: '2.7 Mb',
                    date: '02 March 2023',
                },
                {
                    name: 'Payment Transaction.pdf',
                    size: '2.7 Mb',
                    date: '02 March 2023',
                },
            ],
        },
        {
            category: 'Finance Docs',
            files: [
                {
                    name: 'Latest Evaluation.pdf',
                    size: '2.7 Mb',
                    date: '02 March 2023',
                },
                {
                    name: 'Evaluation 2023.pdf',
                    size: '2.7 Mb',
                    date: '02 March 2023',
                },
                {
                    name: 'WLT Receipt.pdf',
                    size: '2.7 Mb',
                    date: '02 March 2023',
                },
            ],
        },
    ]

    return (
        <div className=" grid gap-8 ">
            <h1 className="text-neutral-600 font-semibold mt-2 text-[32px]">
                Documents Library
            </h1>
            {documents.map((section, index) => (
                <div key={index} className="">
                    <h2 className="text-2xl font-semibold my-7  text-primary-Main">
                        {section.category}
                    </h2>
                    <div className="grid grid-cols-5 gap-4">
                        {section.files.map((file, i) => (
                            <div
                                key={i}
                                className="p-6 hover:bg-white hover:drop-shadow-[0px_30px_60px_rgba(204,192,149,0.2)] bg-[#dfd9ca]/25 bg-primary gap-2  rounded-xl flex flex-col "
                            >
                                <div className=" w-fit p-3 rounded-2xl  bg-[#dfd9ca]/50 shadow-md">
                                    <img
                                        src={Pdf}
                                        alt="PDF icon"
                                        className="w-12 h-12"
                                    />
                                </div>

                                <div className="grid my-2 gap-2">
                                    <p className="font-normal text-primary-Main text-base">
                                        {file.name}
                                    </p>
                                    <div className="flex text-neutral-500 justify-between items-center">
                                        <p className="text-sm ">{file.size}</p>
                                        <p className="text-sm ">{file.date}</p>
                                    </div>
                                    <Button className="w-fit px-4 mt-1 text-primary-Main font-semibold text-sm py-2 bg-primary-200  rounded-lg">
                                        Download
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DocumentLibrary
