import React from 'react'

const Stepper = ({ steps, currentStage }) => {
    return (
        <div className="pl-8 py-12 flex flex-col border-e h-full justify-start gap-12 relative">
            {steps?.map((step, index) => {
                const isLastStep = index === steps.length - 1

                return (
                    <div
                        key={index}
                        className="relative pr-8 flex items-center space-x-5"
                    >
                        <span
                            className={`absolute -right-[4px] w-2 h-2 border border-primary-Main rounded-full ${
                                currentStage >= step.stage
                                    ? 'bg-primary-600 '
                                    : 'bg-white'
                            }`}
                        ></span>
                        <div className="flex-grow text-right">
                            <h3
                                className={`font-bold text-base ${
                                    isLastStep
                                        ? currentStage === step.stage
                                            ? 'text-primary-600'
                                            : 'text-primary-300'
                                        : 'text-primary-600'
                                }`}
                            >
                                {step.title}
                            </h3>
                            <p
                                className={`text-base ${
                                    currentStage >= step.stage
                                        ? 'text-primary-600'
                                        : 'text-primary-400'
                                } font-normal whitespace-nowrap`}
                            >
                                {step.description}
                            </p>
                        </div>
                        <div
                            className={`w-10 h-10 rounded-full border ${
                                currentStage >= step.stage
                                    ? 'bg-[#9e8d60]'
                                    : 'bg-[#DED9D1]'
                            } flex items-center justify-center relative`}
                        >
                            {step.icon ? (
                                <img
                                    src={step.icon}
                                    alt={`${step.title} icon`}
                                />
                            ) : (
                                <span
                                    className={`text-neutral-600 font-semibold ${
                                        currentStage >= step.stage
                                            ? 'text-white'
                                            : 'text-neutral-600'
                                    }`}
                                >
                                    {step.label}
                                </span>
                            )}
                            {index !== steps.length - 1 && (
                                <div
                                    className={`absolute left-1/2 top-full w-[2px] h-[64px] ${
                                        currentStage > index
                                            ? 'bg-primary-600'
                                            : 'bg-primary-300'
                                    }`}
                                ></div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Stepper
