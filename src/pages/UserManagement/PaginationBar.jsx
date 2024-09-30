import { ChevronLeft, ChevronRight } from 'lucide-react'

function PaginationBar({
    totalCount,
    setCurrentPageNumber,
    currentPageNumber,
}) {
    const numberOfPages = Math.ceil(totalCount / 10)
    let pageIndexArray = []
    for (let i = 0; i < numberOfPages; i++) {
        pageIndexArray.push(i + 1)
    }

    const handlePageChange = (e) => {
        if (currentPageNumber === 1 && e.target.value === 'left') {
            return
        } else if (currentPageNumber === 1 && e.target.value === 'right') {
            setCurrentPageNumber(currentPageNumber + 1)
        } else if (
            currentPageNumber > 1 &&
            currentPageNumber < pageIndexArray.length &&
            e.target.value === 'left'
        ) {
            setCurrentPageNumber(currentPageNumber - 1)
        } else if (
            currentPageNumber > 1 &&
            currentPageNumber < pageIndexArray.length &&
            e.target.value === 'right'
        ) {
            setCurrentPageNumber(currentPageNumber + 1)
        } else if (
            currentPageNumber === pageIndexArray.length &&
            e.target.value === 'right'
        ) {
            return
        } else if (
            currentPageNumber === pageIndexArray.length &&
            e.target.value === 'left'
        ) {
            setCurrentPageNumber(currentPageNumber - 1)
        }
    }
    return (
        <div className="flex gap-4 items-center justify-center">
            <button value="left" onClick={handlePageChange}>
                <ChevronLeft className="pointer-events-none text-[#475569]" />
            </button>
            {pageIndexArray.map((item) => (
                <button
                    className={`${item === currentPageNumber ? 'text-primary font-bold' : 'text-[#475569]'}`}
                    key={item}
                    onClick={() => setCurrentPageNumber(item)}
                >
                    {item}
                </button>
            ))}
            <button value="right" onClick={handlePageChange}>
                <ChevronRight className="pointer-events-none text-[#475569]" />
            </button>
        </div>
    )
}

export default PaginationBar
