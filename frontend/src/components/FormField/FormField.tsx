import type { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import './FormField.css';

type ControlProps = {
  id: string;
  'aria-invalid': boolean;
  'aria-describedby': string | undefined;
};

type FormFieldProps = {
  id: string;
  label: string;
  /** Format help shown under the control */
  hint?: string;
  error?: string;
  className?: string;
  /** Receives the props the input or select needs, so the label, hint and error stay connected */
  children: (control: ControlProps) => ReactNode;
};

/** A labelled form control with an optional hint and an error message */
export default function FormField({
  id,
  label,
  hint,
  error,
  className = '',
  children,
}: FormFieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ');

  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id} className="form-field__label">
        {label}
      </label>

      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy || undefined,
      })}

      {hint && (
        <p id={hintId} className="form-field__hint">
          {hint}
        </p>
      )}

      {/* The icon and the words carry the meaning, not just the red color */}
      {error && (
        <p id={errorId} className="form-field__error">
          <AlertCircle size={16} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
