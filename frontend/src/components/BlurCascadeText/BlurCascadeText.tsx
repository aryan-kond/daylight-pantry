import './BlurCascadeText.css';

type BlurCascadeTextProps = {
  text: string;
  /** Delay between letters, in ms */
  step?: number;
  /** Delay before the first letter, in ms */
  delay?: number;
  /** When false the text is shown plainly, with no animation */
  animate?: boolean;
};

/** Each letter sharpens into focus in sequence. Screen readers get the plain text once. */
export default function BlurCascadeText({
  text,
  step = 45,
  delay = 0,
  animate = true,
}: BlurCascadeTextProps) {
  if (!animate) return <>{text}</>;

  const words = text.split(' ').map((word, index, all) => ({
    word,
    // Position of the word's first letter in the whole text, counting spaces
    start: all.slice(0, index).reduce((sum, previous) => sum + previous.length + 1, 0),
  }));

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map(({ word, start }, wordIndex) => (
          <span key={wordIndex}>
            <span className="blur-cascade__word">
              {Array.from(word).map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="blur-cascade__char"
                  style={{ animationDelay: `${delay + (start + charIndex) * step}ms` }}
                >
                  {char}
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </>
  );
}
