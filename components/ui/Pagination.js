import ReactPaginate from 'react-paginate'

const Pagination = ({
  onPageChange,
  pageRangeDisplayed,
  pageCount,
  className,
  initialPage,
}) => {
  return (
    <ReactPaginate
      className={`pagination ${className}`}
      breakLabel='...'
      nextLabel='Sonraki'
      onPageChange={onPageChange}
      pageRangeDisplayed={pageRangeDisplayed ?? 5}
      pageCount={pageCount}
      previousLabel='Önceki'
      renderOnZeroPageCount={null}
      initialPage={initialPage - 1}
    />
  )
}

export default Pagination
