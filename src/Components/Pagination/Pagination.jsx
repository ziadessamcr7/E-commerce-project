import React from 'react'
import ReactPaginate from 'react-paginate'

export default function Pagination({ handlePageChange, totalNumOfPages }) {
    return (
        <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={totalNumOfPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination justify-content-center my-3"}
            pageClassName={"page-item text-dark"}
            pageLinkClassName={"page-link text-dark"}
            previousClassName={"page-item text-dark"}
            previousLinkClassName={"page-link text-dark"}
            nextClassName={"page-item text-dark"}
            nextLinkClassName={"page-link text-dark"}
            breakClassName={"page-item text-dark"}
            breakLinkClassName={"page-link text-dark"}
            activeClassName={"active"}
        />
    )
}
