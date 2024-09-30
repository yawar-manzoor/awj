import React from 'react'

const FileUpload = ({
    handleFileUpload,
    downloadIcon,
    // attachment,
    fileError,
}) => {
    return (
        <div className="grid gap-1">
            <div className="flex justify-center items-center">
                <input
                    type="file"
                    id="fileUpload"
                    onChange={handleFileUpload}
                    className="hidden"
                />

                <label
                    htmlFor="fileUpload"
                    className="cursor-pointer h-fit border-dashed whitespace-nowrap bg-[#EFECE4]/50 border flex items-center border-primary-Main px-7 py-2 rounded-xl font-bold text-sm text-primary-Main"
                >
                    <img
                        src={downloadIcon}
                        alt="upload"
                        className="mr-2 rotate-180"
                    />
                    Add Attachment
                </label>
            </div>

            {/* {attachment &&
                attachment.map((att, index) => (
                    <div key={index} className="text-primary-Main">
                        {att.attachmentName}
                    </div>
                ))} */}

            {fileError && (
                <div className="text-red-500 text-sm">{fileError}</div>
            )}
        </div>
    )
}

export default FileUpload
