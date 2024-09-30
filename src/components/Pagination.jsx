import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 4 // Max number of visible page links (excluding first, last, and dots)
        const halfVisible = Math.floor(maxVisiblePages / 2)

        if (totalPages <= maxVisiblePages + 2) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)

            if (currentPage <= halfVisible + 1) {
                for (let i = 2; i <= maxVisiblePages; i++) {
                    pages.push(i)
                }
                pages.push('...', totalPages)
            } else if (currentPage >= totalPages - halfVisible) {
                pages.push('...')
                for (
                    let i = totalPages - (maxVisiblePages - 1);
                    i < totalPages;
                    i++
                ) {
                    pages.push(i)
                }
                pages.push(totalPages)
            } else {
                pages.push('...')
                for (
                    let i = currentPage - halfVisible;
                    i <= currentPage + halfVisible;
                    i++
                ) {
                    pages.push(i)
                }
                pages.push('...', totalPages)
            }
        }

        return pages
    }

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1)
    }

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1)
    }

    return (
        <div className="flex items-center space-x-2">
            <button
                className={`px-4 py-3 inline-flex items-center gap-x-1 mr-8 ${
                    currentPage === 1 ? 'text-[#7B7B7B]' : 'text-black'
                }  border border-[#DDD9C8] rounded-[10px]`}
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                <ChevronLeft
                    color={`${currentPage == 1 ? '#7B7B7B' : '#000000'}`}
                />{' '}
                Previous
            </button>

            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    className={`p-3  rounded-[10px] ${
                        page === currentPage
                            ? 'bg-white text-black border'
                            : 'text-[#7B7B7B]'
                    }`}
                    onClick={() => {
                        if (typeof page === 'number') onPageChange(page)
                    }}
                    disabled={typeof page !== 'number'}
                >
                    {page}
                </button>
            ))}

            <button
                className={`px-4 py-3 inline-flex items-center gap-x-1  ${
                    currentPage === totalPages ? 'text-[#7B7B7B]' : 'text-black'
                }  border border-[#DDD9C8] rounded-[10px] !ml-8`}
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next{' '}
                <ChevronRight
                    color={`${
                        currentPage == totalPages ? '#7B7B7B' : '#000000'
                    }`}
                />
            </button>
        </div>
    )
}

export default Pagination
