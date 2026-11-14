import { Sun } from 'lucide-react';
import './SectionDivider.css';

type SectionDividerProps = {
  /** Plain line with no sun in the middle */
  plain?: boolean;
};

/** Clear divider between page sections: a line with a small orange sun in the middle */
export default function SectionDivider({ plain = false }: SectionDividerProps) {
  return (
    <div className="divider" role="separator">
      {!plain && (
        <span className="divider__mark" aria-hidden="true">
          <Sun size={16} />
        </span>
      )}
    </div>
  );
}
