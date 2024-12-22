const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l"
      >
        Prev
      </button>
      <span className="px-4 py-2 bg-gray-100 text-gray-800">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
