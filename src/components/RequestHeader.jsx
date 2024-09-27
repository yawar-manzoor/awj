// RequestDetailsHeader.js
export default function RequestDetailsHeader() {
    return (
        <div className="flex bg-white text-primary-Main text-base font-medium border-b border-primary-Main py-4 px-8">
            <div className="flex flex-[2] items-center  border-r border-primary-300">
                <span className="">#</span>
                <span className="px-6">Ref ID</span>
            </div>
            <div className="flex-[1.5] px-2 flex justify-center items-center border-r border-primary-300">
                Asset Name
            </div>
            <div className="flex-[1.5] px-2 flex justify-center items-center border-r border-primary-300">
                TD Number
            </div>
            <div className="flex-[1.5] px-2 flex justify-center items-center border-r border-primary-300">
                Owner Name
            </div>
            <div className="flex-[2] px-2 flex justify-center items-center border-r border-primary-300">
                Created Date
            </div>
            <div className="flex-1 px-2 flex justify-center items-center border-primary-300">
                Status
            </div>
            <div className="flex-1 px-2 text-left"></div>
        </div>
    )
}
