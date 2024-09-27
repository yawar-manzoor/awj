import More from '../assets/DashbaordIcons/More.svg'

const getStatusClass = (status) => {
    switch (status) {
        case 'Pending':
            return 'text-[#F79708]'
        case 'Approved':
            return 'text-[#299764]'
        case 'Send Back':
            return 'text-[#F2440D]'
        default:
            return ''
    }
}

export default function RequestDetailsRow({ item }) {
    return (
        <div
            className={`flex bg-[#EFECE4]/40 rounded-lg cursor-pointer text-neutral-600 font-normal text-base px-8 py-2 my-2`}
        >
            <div className="flex items-center flex-[2]   border-r border-primary-300">
                {/* <span className="">{item.id.toString().padStart(2, '0')}</span> */}
                <span className="px-6">{item.referenceNumber}</span>
            </div>

            <div className="flex-[1.5] px-2 flex items-center justify-center text-left border-r border-primary-300 ">
                {item.assetName}
            </div>
            <div className="flex-[1.5] flex items-center justify-center px-2 text-left border-r border-primary-300 ">
                {item.itdNumber}
            </div>
            <div className="flex-[1.5] flex px-2 justify-center border-r border-primary-300 items-center">
                {item.deedOwner}
            </div>
            <div className="flex-[2] flex px-2 justify-center border-r border-primary-300 items-center">
                {item.createdDate}
            </div>
            <div
                className={`flex-1 flex px-2 whitespace-nowrap items-center ${getStatusClass(
                    item.status
                )}`}
            >
                <span
                    className={`w-3 h-3 mx-2 border rounded-full ${
                        item.status === 'Pending'
                            ? 'bg-[#F79708]'
                            : item.status === 'Approved'
                            ? 'bg-[#299764]'
                            : item.status === 'Send Back'
                            ? 'bg-[#F2440D]'
                            : ''
                    } `}
                ></span>{' '}
                {item.status}
            </div>
            <div className="flex-1 flex items-center justify-end px-2 items-left">
                <img src={More} alt="more icon" />
            </div>
        </div>
    )
}
