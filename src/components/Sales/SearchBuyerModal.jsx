import React from 'react'
import { X, SearchIcon } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'

const SearchBuyerModal = ({
    SearchBuyer,
    handleOnChange,
    data,
    getBuyerDetails,
    closeModal,
    error,
    isError,
    setShowBuyerForm,
    showBuyerForm,
    setSearchBuyer,
    setError,
    setData,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="grid gap-2">
                <div className="bg-white p-6 rounded-lg relative w-96">
                    <div className="flex justify-between">
                        <h2 className="text-xl text-primary-Main">
                            Search Buyer
                        </h2>
                        <X color="gray" onClick={closeModal} />
                    </div>
                    <div className="relative my-4">
                        <Input
                            onChange={handleOnChange}
                            value={SearchBuyer}
                            placeholder="Search Buyer"
                            type="text"
                            className="border border-primary-Main px-4 py-2 rounded w-full outline-none"
                        />
                        {SearchBuyer ? (
                            <X
                                className="absolute right-2 top-2 cursor-pointer"
                                color="gray"
                                onClick={() => {
                                    setSearchBuyer('')
                                    setError(null)
                                    setData(null)
                                }}
                            />
                        ) : (
                            <SearchIcon
                                className="absolute right-2 top-2"
                                color="gray"
                            />
                        )}
                    </div>

                    {data?.data && !isError && (
                        <div className="grid gap-2 rounded global-scroll max-h-28 py-2 overflow-y-auto">
                            {data?.data.map((buyer, index) => (
                                <div
                                    className=""
                                    key={index}
                                    onClick={() =>
                                        getBuyerDetails(buyer.buyerId)
                                    }
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <span className="font-semibold text-primary-600 text-lg overflow-hidden text-ellipsis whitespace-nowrap">
                                            {buyer?.buyerName}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {error && isError && (
                        <div className="flex justify-between">
                            <p className="text-lg font-medium text-primary-Main">
                                {error && error}
                            </p>
                            <Button
                                onClick={() => {
                                    setShowBuyerForm(!showBuyerForm)
                                    closeModal()
                                }}
                                className="border text-base font-semibold text-white border-primary-Main px-6 py-3 rounded bg-primary-Main"
                            >
                                Add New Buyer
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchBuyerModal
