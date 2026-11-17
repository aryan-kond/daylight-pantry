import type { ReactNode, Ref } from 'react';
import './PageHeading.css';

type PageHeadingProps = {
  title: string;
  /** Small line under the title, for example a count */
  subtitle?: string;
  /** Extra content under the subtitle, for example a "Clear search" link */
  children?: ReactNode;
  /** Pass a ref when the page moves keyboard focus to the title, for example after a removal */
  headingRef?: Ref<HTMLHeadingElement>;
};

/** Standard page title for every page: centered, with an optional small subtitle */
export default function PageHeading({ title, subtitle, children, headingRef }: PageHeadingProps) {
  return (
    <header className="page-heading">
      <h1 ref={headingRef} tabIndex={headingRef ? -1 : undefined} className="page-heading__title">
        {title}
      </h1>
      {subtitle && (
        <p className="page-heading__subtitle" aria-live="polite">
          {subtitle}
        </p>
      )}
      {children && <div className="page-heading__extra">{children}</div>}
    </header>
  );
}
