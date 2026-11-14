import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

type PaginationProps = {
  /** Current page, starting at 1 */
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  /** Accessible name for this pager, for example "Cart item pages" */
  label: string;
};

export default function Pagination({ page, pageCount, onChange, label }: PaginationProps) {
  return (
    <nav className="pagination" aria-label={label}>
      <button
        type="button"
        className="pagination__button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      <p className="pagination__status tabular" aria-live="polite">
        Page {page} of {pageCount}
      </p>

      <button
        type="button"
        className="pagination__button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </nav>
  );
}
