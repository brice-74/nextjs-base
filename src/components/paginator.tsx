import clsx from "clsx";
import { ReactNode, useMemo } from "react";

type PaginatorProps = {
  currentPage: number;
  pagesTotal: number;
  displayableLimit?: number;
  onPageChange: (page: number) => void;
  className?: string;
};

function Paginator({
  currentPage,
  pagesTotal,
  displayableLimit = 5,
  onPageChange,
  className,
}: PaginatorProps) {
  const offset = Math.floor(displayableLimit / 2);

  const pages = useMemo<number[]>(() => {
    const limit = Math.min(pagesTotal, displayableLimit);

    return Array(limit)
      .fill(0)
      .map((_, i) => {
        let from = currentPage > offset ? currentPage - offset : 1;

        const diff = from + limit - pagesTotal;
        if (diff > 0) {
          from = from - (diff - 1);
        }

        return from + i;
      });
  }, [pagesTotal, displayableLimit, currentPage, offset]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= pagesTotal) {
      onPageChange(page);
    }
  };
  return (
    <div className={clsx(className, "flex flex-row")}>
      {/* Previous button */}
      <Cell
        className="bg-th-primary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          className="fill-transparent"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L8 12L15 19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Cell>

      {/* Pages */}
      {pages.map((page) => {
        const active = page === currentPage;

        return (
          <Cell
            key={`page-${page}`}
            onClick={() => handlePageChange(page)}
            className={clsx(
              active
                ? "bg-th-primary-dark"
                : "bg-th-primary"
            )}
          >
            {page}
          </Cell>
        );
      })}

      {/* Next button */}
      <Cell
        className="bg-th-primary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pagesTotal}
      >
        <svg
          className="fill-transparent"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5L16 12L9 19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Cell>
    </div>
  );
}

type CellProps = {
  children: ReactNode;
  size?: number;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

function Cell({
  children,
  size = 50,
  onClick,
  className,
  disabled = false,
}: CellProps) {
  return (
    <button
      style={{ width: size, height: size }}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "m-1 flex items-center justify-center rounded-2xl font-semibold text-th-light-1",
        disabled && "opacity-0",
        className
      )}
    >
      {children}
    </button>
  );
}

export { Paginator };