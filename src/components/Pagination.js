import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    // 페이지 번호 범위 계산 (최대 5개 표시)
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        let startPage = Math.max(1, currentPage + 1 - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // 표시되는 페이지가 최대 개수보다 적은 경우 조정
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();
    const hasPrevious = currentPage > 0;
    const hasNext = currentPage < totalPages - 1;

    return (
        <div className="mt-10 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                    onClick={() => hasPrevious && onPageChange(currentPage - 1)}
                    disabled={!hasPrevious}
                    className={`${
                        hasPrevious ? 'text-gray-500 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'
                    } relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium`}
                >
                    <span className="sr-only">이전</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                {pageNumbers.map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber - 1)}
                        className={`${
                            pageNumber === currentPage + 1
                                ? 'bg-teal-50 border-teal-500 text-teal-600 z-10'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    onClick={() => hasNext && onPageChange(currentPage + 1)}
                    disabled={!hasNext}
                    className={`${
                        hasNext ? 'text-gray-500 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed'
                    } relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium`}
                >
                    <span className="sr-only">다음</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </nav>
        </div>
    );
};

export default Pagination;