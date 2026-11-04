import { useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import './ProgressTimeline.css';

export type TimelineItem = {
  title: string;
  text: string;
  Icon: LucideIcon;
};

type ProgressTimelineProps = {
  items: TimelineItem[];
};

const NODE_SIZE = 48;

export default function ProgressTimeline({ items }: ProgressTimelineProps) {
  const listRef = useRef<HTMLUListElement>(null);

  // Fills the line and lights up each step once it passes a marker at 60% of the window height.
  // Styles are written straight to the DOM, so scrolling never re-renders React.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const steps = Array.from(list.querySelectorAll<HTMLElement>('[data-step]'));
    const lastStep = steps[steps.length - 1];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      // The line runs from the first circle's center to the last circle's center
      const lineLength = lastStep ? lastStep.offsetTop : 0;
      const lineTop = list.getBoundingClientRect().top + NODE_SIZE / 2;
      const marker = window.innerHeight * 0.6;
      const filled = reduceMotion
        ? lineLength
        : Math.min(Math.max(marker - lineTop, 0), lineLength);

      list.style.setProperty('--line-length', `${lineLength}px`);
      list.style.setProperty('--progress', `${filled}px`);

      steps.forEach((step) => {
        const nodeCenter = step.getBoundingClientRect().top + NODE_SIZE / 2;
        step.dataset.reached = String(reduceMotion || nodeCenter <= marker);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <ul ref={listRef} className="progress-timeline">
      {items.map(({ title, text, Icon }) => (
        <li key={title} className="progress-timeline__step" data-step data-reached="false">
          <span className="progress-timeline__node">
            <Icon size={22} aria-hidden="true" />
          </span>
          <div className="progress-timeline__content">
            <h3 className="progress-timeline__title">{title}</h3>
            <p className="progress-timeline__text">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
