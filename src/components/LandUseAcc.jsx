import { useState } from 'react'

const Accordion = ({ landUseData }) => {
    const [openSection, setOpenSection] = useState(null)

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index)
    }

    return (
        <div className="w-full mb-4">
            {landUseData.map((section, index) => (
                <div key={index} className="mb-2">
                    <div
                        className={`w-full bg-primary-100 rounded-2xl 
                            ${
                                openSection === index && section.children
                                    ? ''
                                    : ''
                            }
                        `}
                    >
                        {section.children && section.children.length > 0 ? (
                            <button
                                onClick={() => toggleSection(index)}
                                className="w-full text-left flex px-6 justify-between items-center py-4 focus:outline-none"
                            >
                                <span className="flex space-x-2 items-center text-sm text-primary-Main font-semibold">
                                    <span className="rounded-full overflow-hidden w-10 h-10">
                                        <img
                                            className="bg-primary-200 p-2 w-full h-full object-cover"
                                            src={section.icon}
                                            alt=""
                                        />
                                    </span>
                                    <span>{section.status}</span>
                                </span>
                                <svg
                                    className={`w-6 h-6 transform transition-transform ${
                                        openSection === index
                                            ? 'rotate-180'
                                            : ''
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#837550"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <div className="w-full text-left flex px-6 items-center py-4">
                                <span className="flex space-x-2 items-center text-sm text-primary-Main font-semibold">
                                    <span className=" rounded-full overflow-hidden w-10 h-10">
                                        <img
                                            className="bg-primary-200 p-2 w-full h-full object-cover"
                                            src={section.icon}
                                            alt=""
                                        />{' '}
                                    </span>
                                    <span> {section.status}</span>
                                </span>
                            </div>
                        )}
                        {openSection === index && section.children && (
                            <div className="bg-primary-100 rounded-b-2xl grid grid-cols-2">
                                {section.children.map((child, i) => (
                                    <div
                                        key={i}
                                        className="px-6 py-2 flex space-x-2 items-center"
                                    >
                                        <span
                                        // className={`${
                                        //     child.length > 20
                                        //         ? 'w-[12px]'
                                        //         : 'w-2'
                                        // } h-2 bg-neutral-600 rounded-full inline-block`}
                                        >
                                            <svg
                                                width="8"
                                                height="10"
                                                viewBox="0 0 10 10"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle
                                                    cx="5"
                                                    cy="5"
                                                    r="5"
                                                    fill="#7A7474"
                                                />
                                            </svg>
                                        </span>
                                        <span className="text-neutral-600 font-medium">
                                            {child}
                                            {console.log(child.length)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Accordion
