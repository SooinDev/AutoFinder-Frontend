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

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={currentPage === 0 ? "disabled" : ""}
            >
                이전
            </button>

            {getPageNumbers().map(pageNumber => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber - 1)}
                    className={pageNumber === currentPage + 1 ? "active" : ""}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className={currentPage >= totalPages - 1 ? "disabled" : ""}
            >
                다음
            </button>
        </div>
    );
};

export default Pagination;