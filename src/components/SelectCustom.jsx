const SelectCustom = ({
    label,
    selectedItem,
    isEditor,
    isApprover,
    items,
    onSelect,
    isOpen,
    toggleDropdown,
    placeholder,
}) => {
    return (
        <div className={`relative ${isApprover || isEditor ? '' : ''}`}>
            <button
                className="bg-white border border-primary-input py-3 px-2   rounded-[10px] w-full text-left flex justify-between items-center"
                onClick={toggleDropdown}
                placeholder={label}
            >
                <span className="text-primary-Main text-sm 2xl:text-base">
                    {selectedItem?.label || placeholder}
                </span>
                <svg
                    className={`w-4 h-4 text-primary-Main transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {isOpen && (
                <div
                    className={`absolute left-0 right-0 overflow-x-hidden mt-1 global-scroll bg-white border border-primary-200 rounded shadow-lg overflow-y-auto ${
                        items?.length > 5
                            ? 'h-52 z-20'
                            : `h-${items?.length * 12} z-10`
                    }`}
                >
                    <ul>
                        {items?.length > 0 ? (
                            items.map((item, index) => (
                                <li
                                    key={index}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => onSelect(item)}
                                >
                                    {item.label}
                                </li>
                            ))
                        ) : (
                            <div className="p-2 text-center text-neutral-50">
                                No items found
                            </div>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SelectCustom
