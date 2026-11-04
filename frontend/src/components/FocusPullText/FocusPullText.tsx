import { useEffect, useRef, useState, type CSSProperties } from 'react';
import './FocusPullText.css';

// Ids that have already played during this page load. A refresh clears it.
const played = new Set<string>();

type FocusPullTextProps = {
  /** Unique name, so each piece of text plays only once per page load */
  id: string;
  children: string;
  /** Letter spacing the text starts from, before it pulls into focus */
  spread?: string;
  /** Fills the width of its parent. Use it for paragraphs. */
  block?: boolean;
  /** Delay in ms before it starts, to stagger text one after another */
  delay?: number;
};

type Phase = 'waiting' | 'playing' | 'done';

/** Starts blurred and spaced out, then snaps into focus the first time it scrolls into view */
export default function FocusPullText({
  id,
  children,
  spread = '0.18em',
  block = false,
  delay = 0,
}: FocusPullTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<Phase>(() =>
    played.has(id) || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'done'
      : 'waiting',
  );

  useEffect(() => {
    if (phase !== 'waiting') return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          played.add(id);
          setPhase('playing');
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [phase, id]);

  return (
    <span
      ref={ref}
      className={`focus-pull focus-pull--${phase} ${block ? 'focus-pull--block' : ''}`}
      style={{ '--pull-spread': spread, animationDelay: `${delay}ms` } as CSSProperties}
    >
      {children}
    </span>
  );
}
