import React from 'react'
import './Pagination.css'

function Pagination({ currentPage, totalPages, onPageChange }) {

    function prevPage() {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    function nextPage() {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    let pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="pagination-container">
            <button
                className="page-btn prev"
                onClick={prevPage}
                disabled={currentPage === 1}>
                Précédent
            </button>

            <div className="pages">
                {pageNumbers.map(num => (
                    <span
                        key={num}
                        className={currentPage === num ? 'active-page' : ''}
                        onClick={() => onPageChange(num)}>
                        {num}
                    </span>
                ))}
            </div>

            <button
                className="page-btn next"
                onClick={nextPage}
                disabled={currentPage === totalPages}>
                Suivant
            </button>
        </div>
    )
}

export default Pagination