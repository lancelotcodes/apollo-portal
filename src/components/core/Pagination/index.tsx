import { classNames } from '@/helpers/classNames';
import { usePagination } from '@/hooks/usePaginate';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import React from 'react';

export type PaginationProps = React.HTMLAttributes<HTMLDivElement> & {
  onPageChange: (e: number) => void;
  layout?: 'horizontal' | 'vertical';
  pageSize: number;
  pageIndex: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  totalPages?: number;
  totalCount?: number;
};

const Pagination: React.FC<PaginationProps> = ({
  hasNextPage,
  hasPreviousPage,
  totalPages,
  totalCount,
  className,
  pageIndex,
  onPageChange,
  layout = 'horizontal',
  pageSize,
  ...rest
}) => {
  const paginationRange = usePagination({
    currentPage: pageIndex,
    pageSize,
    totalCount,
  });

  const onNext = () => {
    if (totalPages && pageIndex) {
      pageIndex < totalPages && onPageChange(pageIndex + 1);
    }
  };

  const onPrevious = () => {
    if (pageIndex) {
      pageIndex > 1 && onPageChange(pageIndex - 1);
    }
  };

  return (
    <div
      className={classNames('py-3 px-2 md:px-6 flex items-center justify-between', className && className)}
      aria-label="Pagination"
      {...rest}
    >
      <div
        className={classNames(
          'flex-1 sm:flex sm:items-center sm:justify-between',
          layout === 'horizontal' ? 'flex-row' : 'flex-col items-centr gap-1',
        )}
      >
        <div>
          <nav className="relative z-0 inline-flex rounded-md space-x-1" aria-label="Pagination">
            <PaginationButton
              key={'pagination-prev'}
              className="rounded-l-md px-2 py-2 "
              disabled={!hasPreviousPage}
              onClick={onPrevious}
            >
              <span className="sr-only">Previous</span>
              <BiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </PaginationButton>

            {paginationRange?.map((page, idx) =>
              !isNaN(page as number) ? (
                <PaginationButton
                  key={page}
                  current={(page as number) === pageIndex}
                  onClick={() => onPageChange(page as number)}
                  className={classNames(
                    idx !== 0 && idx !== paginationRange.length - 1 && 'hidden',
                    idx !== paginationRange.length - 1 && idx !== 0 && 'hidden',
                    'font-bold px-4 py-2 md:inline',
                  )}
                >
                  {page}
                </PaginationButton>
              ) : (
                <span key={`pagination-span-${idx}`} className="font-bold px-4 py-2 text-gray-4">
                  {page}
                </span>
              ),
            )}

            <PaginationButton
              key={'pagination-next'}
              className="rounded-r-md px-2 py-2"
              disabled={!hasNextPage}
              onClick={onNext}
            >
              <span className="sr-only">Next</span>
              <BiChevronRight className="h-5 w-5" aria-hidden="true" />
            </PaginationButton>
          </nav>
        </div>

        <PaginationInfo pageSize={pageSize} pageIndex={pageIndex} totalCount={totalCount} />
      </div>
    </div>
  );
};

const PaginationButton: React.FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { current?: boolean }
> = ({ className, current, ...rest }) => {
  return (
    <button
      type="button"
      className={classNames(
        'relative inline-flex items-center rounded border outline-none hover:border-gray-3 hover:bg-gray-1 focus:border-gray-3 focus:bg-gray-1',
        current ? 'bg-gay-1 border-gray-3 text-black' : 'text-gray-7 border-transparent',
        className && className,
      )}
      {...rest}
    ></button>
  );
};

const PaginationInfo: React.FC<{
  totalCount?: number;
  pageSize: number;
  pageIndex: number;
}> = ({ pageIndex, totalCount, pageSize }) => {
  return (
    <div className="md:flex items-center mx-2 hidden">
      <p className="typography-label font-medium text-gray-6">
        Showing <span className="font-medium">{pageIndex === 1 ? 1 : (pageIndex - 1) * pageSize + 1}</span> -{' '}
        <span className="font-medium">
          {totalCount && pageIndex * pageSize < totalCount ? pageIndex * pageSize : totalCount}
        </span>{' '}
        of <span className="font-medium">{totalCount}</span> entries
      </p>
    </div>
  );
};

export default Pagination;
