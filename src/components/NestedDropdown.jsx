import { useState } from 'react'

const NestedSelect = ({
    label,
    placeholder,
    selectedItem,
    items,
    onSelect,
    isOpen,
    toggleDropdown,
}) => {
    const [expandedItems, setExpandedItems] = useState({})
    // console.log(items)

    const handleItemClick = (item) => {
        if (item.children) {
            setExpandedItems((prevState) => ({
                ...prevState,
                [item.id]: !prevState[item.id],
            }))
        } else {
            console.log(item)
            onSelect(item)
            toggleDropdown()
        }
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full px-4 py-3 border border-primary-input bg-white rounded-[10px] "
            >
                <span className="text-primary-Main text-sm 2xl:text-base">
                    {selectedItem ? selectedItem.status : placeholder}
                </span>
                <svg
                    className={`w-4 h-4 transform text-primary-Main ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                <div className="absolute mt-1 w-full bg-white border global-scroll overflow-x-hidden h-52 overflow-y-scroll border-primary-200 rounded-lg shadow-lg z-10">
                    {items?.map((item) => (
                        <div
                            key={item.id}
                            className="py-2 px-4  cursor-pointer"
                        >
                            <div
                                onClick={() => handleItemClick(item)}
                                className="flex justify-between items-center"
                            >
                                <span>{item.status}</span>
                                {item.children && (
                                    <svg
                                        className={`w-3 h-3 transform text-primary-Main ${
                                            expandedItems[item.id]
                                                ? 'rotate-90'
                                                : 'rotate-0'
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                )}
                            </div>
                            {item.children && expandedItems[item.id] && (
                                <div className="pl-2 mt-1 ">
                                    {item.children.map((child) => (
                                        <div
                                            key={child.id}
                                            onClick={() =>
                                                handleItemClick(child)
                                            }
                                            className="py-2 px-4 hover:bg-primary-100  cursor-pointer"
                                        >
                                            {' '}
                                            {child.status}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NestedSelect
