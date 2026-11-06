import './SectionHeading.css';

type SectionHeadingProps = {
  /** Id of the heading, for the section's aria-labelledby */
  id: string;
  title: string;
  subtitle: string;
};

/** Centered section title with a small subheading below it */
export default function SectionHeading({ id, title, subtitle }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      <p className="section-heading__subtitle">{subtitle}</p>
    </header>
  );
}
