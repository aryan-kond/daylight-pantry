import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import './Select.css';

type SelectProps = {
  id: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
};

/** Custom dropdown: a pill that opens a panel of pill-shaped options. Fully keyboard accessible. */
export default function Select({
  id,
  value,
  options,
  placeholder,
  onChange,
  onBlur,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: SelectProps) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  // Letters typed quickly in a row, to jump to a matching option
  const typed = useRef({ text: '', timer: 0 });

  const openList = () => {
    setActiveIndex(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(options[index]);
    setOpen(false);
  };

  // Close when the person clicks or taps anywhere outside
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  // Keep the highlighted option in view while moving with the keyboard
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        if (!open) {
          openList();
          return;
        }
        const step = event.key === 'ArrowDown' ? 1 : -1;
        setActiveIndex((index) => Math.min(options.length - 1, Math.max(0, index + step)));
        return;
      }
      case 'Home':
      case 'End':
        if (open) {
          event.preventDefault();
          setActiveIndex(event.key === 'Home' ? 0 : options.length - 1);
        }
        return;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (open) {
          choose(activeIndex);
        } else {
          openList();
        }
        return;
      case 'Escape':
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        return;
      case 'Tab':
        setOpen(false);
        return;
      default: {
        if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
        window.clearTimeout(typed.current.timer);
        typed.current.text += event.key.toLowerCase();
        typed.current.timer = window.setTimeout(() => {
          typed.current.text = '';
        }, 600);
        const match = options.findIndex((option) =>
          option.toLowerCase().startsWith(typed.current.text),
        );
        if (match >= 0) {
          setOpen(true);
          setActiveIndex(match);
        }
      }
    }
  };

  return (
    <div className="select" ref={containerRef}>
      <button
        type="button"
        id={id}
        role="combobox"
        className="select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        // The space key must not also fire a click when it is released
        onKeyUp={(event) => {
          if (event.key === ' ') event.preventDefault();
        }}
        onBlur={onBlur}
      >
        <span className={value ? 'select__value' : 'select__placeholder'}>
          {value || placeholder}
        </span>
        <ChevronDown size={18} aria-hidden="true" className="select__chevron" />
      </button>

      {open && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          aria-label={placeholder}
          className="select__panel"
          // Keeps keyboard focus on the button while the pointer picks an option
          onMouseDown={(event) => event.preventDefault()}
        >
          {options.map((option, index) => {
            const selected = option === value;
            return (
              <li
                key={option}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={selected}
                className={`select__option ${index === activeIndex ? 'select__option--active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(index)}
              >
                <span>{option}</span>
                {selected && <Check size={16} aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
