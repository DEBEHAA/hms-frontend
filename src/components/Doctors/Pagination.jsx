import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

const Button = ({ page, icon, disabled, handlePageChange }) => {
  return (
    <button
      className="bg-blue p-3 text-lg text-white transition-all duration-200 first:rounded-l-md last:rounded-r-md disabled:pointer-events-none disabled:opacity-50 sm:text-[19px] lg:hover:bg-[#3d3d3d]"
      disabled={disabled}
      onClick={() => handlePageChange(page)}
    >
      {icon}
    </button>
  );
};

const Pagination = ({
  hasPrevPage,
  hasNextPage,
  lastPage,
  isFetching,
  currentPage,
}) => {
  const [_searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      prev.set("page", page);

      return prev;
    });
  };

  return (
    <div className="mt-8">
      <div className="flex justify-center gap-[1px]">
        <Button
          page={1}
          icon={<FiChevronsLeft />}
          disabled={!hasPrevPage || isFetching}
          handlePageChange={handlePageChange}
        />
        <Button
          page={currentPage - 1}
          icon={<FiChevronLeft />}
          disabled={!hasPrevPage || isFetching}
          handlePageChange={handlePageChange}
        />
        <p className="flex items-center justify-center gap-1 bg-blue px-3 font-medium text-white sm:min-w-[80px]">
          {currentPage}
          <span className="opacity-80">/</span>
          {lastPage}
        </p>
        <Button
          page={currentPage + 1}
          icon={<FiChevronRight />}
          disabled={!hasNextPage || isFetching}
          handlePageChange={handlePageChange}
        />
        <Button
          page={lastPage}
          icon={<FiChevronsRight />}
          disabled={!hasNextPage || isFetching}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Pagination;
