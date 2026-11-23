import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { CONTACT } from '../../data/contact';
import { sendMessage } from '../../utils/mockContact';
import FormField from '../../components/FormField/FormField';
import MapPlaceholder from '../../components/MapPlaceholder/MapPlaceholder';
import PageHeading from '../../components/PageHeading/PageHeading';
import './ContactPage.css';

type Values = { name: string; email: string; message: string };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const FIELDS: Field[] = ['name', 'email', 'message'];
const EMPTY: Values = { name: '', email: '', message: '' };

/** Returns an error message for one field, or undefined when it is fine */
function validateField(field: Field, values: Values): string | undefined {
  const value = values[field].trim();

  switch (field) {
    case 'name':
      return value ? undefined : 'Enter your name.';

    case 'email':
      if (!value) return 'Enter your email address.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? undefined
        : 'Enter a valid email address, like name@example.com.';

    case 'message':
      if (!value) return 'Write a short message.';
      return value.length >= 10 ? undefined : 'Add a little more detail, at least 10 characters.';
  }
}

// The WhatsApp logo, drawn inline: the lucide-react icons in this project have no brand logos
function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function ContactPage() {
  const sentHeadingRef = useRef<HTMLHeadingElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'failed' | 'sent'>('idle');

  // After the message is sent, move focus to the confirmation so it is announced
  useEffect(() => {
    if (status === 'sent') sentHeadingRef.current?.focus();
  }, [status]);

  const updateField = (field: Field, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Once a field shows an error, re-check it as the person types so the message clears when fixed
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: validateField(field, next) }));
    }
  };

  const checkField = (field: Field) => () => {
    setErrors((previous) => ({ ...previous, [field]: validateField(field, values) }));
  };

  // Props shared by the inputs and the message box
  const controlProps = (field: Field) => ({
    value: values[field],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      updateField(field, event.target.value),
    onBlur: checkField(field),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    // Block sending until every field is fine, and say where the problem is
    const found: Errors = {};
    for (const field of FIELDS) {
      const message = validateField(field, values);
      if (message) found[field] = message;
    }
    setErrors(found);
    const firstInvalid = FIELDS.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus('sending');
    const result = await sendMessage();
    setStatus(result.ok ? 'sent' : 'failed');
  };

  const handleReset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus('idle');
  };

  const isSending = status === 'sending';
  const firstName = values.name.trim().split(' ')[0];

  return (
    <div className="contact-page">
      <PageHeading title="Contact us" subtitle="Send a message or reach us directly." />

      <div className="contact-page__layout">
        {/* Contact details and map. On desktop this column is as tall as the form card. */}
        <section className="contact-info" aria-labelledby="contact-info-title">
          <h2 id="contact-info-title" className="contact-info__title">
            Reach us directly
          </h2>
          <p className="contact-info__intro">Prefer to write or talk? Use any of these.</p>

          <ul className="contact-list">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="contact-row contact-row--link">
                <span className="contact-row__icon">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <span className="contact-row__text">
                  <span className="contact-row__label">Email us</span>
                  <span className="contact-row__value">{CONTACT.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phoneLink}`} className="contact-row contact-row--link">
                <span className="contact-row__icon">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <span className="contact-row__text">
                  <span className="contact-row__label">Call us, {CONTACT.hours}</span>
                  <span className="contact-row__value tabular">{CONTACT.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="contact-row contact-row--link"
              >
                <span className="contact-row__icon">
                  <WhatsAppIcon />
                </span>
                <span className="contact-row__text">
                  <span className="contact-row__label">Message us on WhatsApp</span>
                  <span className="contact-row__value tabular">
                    {CONTACT.phone}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </span>
              </a>
            </li>
            <li>
              <div className="contact-row">
                <span className="contact-row__icon">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <address className="contact-row__text">
                  <span className="contact-row__label">Visit us</span>
                  {CONTACT.address.map((line) => (
                    <span key={line} className="contact-row__value">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </li>
          </ul>

          <MapPlaceholder />
        </section>

        {/* Message sent */}
        {status === 'sent' ? (
          <section className="contact-card contact-sent" aria-labelledby="contact-sent-title">
            <span className="contact-sent__badge">
              <CheckCircle2 size={30} aria-hidden="true" />
            </span>
            <h2
              id="contact-sent-title"
              ref={sentHeadingRef}
              tabIndex={-1}
              className="contact-sent__title"
            >
              Message sent
            </h2>
            {/* DEMO: nothing is sent yet. Keep this wording only once messages really reach us. */}
            <p className="contact-sent__text">
              Thank you, {firstName}. We will reply to {values.email.trim()}.
            </p>
            <button type="button" className="button-secondary" onClick={handleReset}>
              Send another message
            </button>
          </section>
        ) : (
          /* The form */
          <form className="contact-card" onSubmit={handleSubmit} noValidate>
            <h2 className="contact-card__title">Send us a message</h2>
            <p className="contact-card__intro">
              All fields are required. Please do not include payment or card details.
            </p>

            <div className="contact-card__fields">
              <FormField id="contact-name" label="Name" error={errors.name}>
                {(control) => (
                  <input
                    {...control}
                    {...controlProps('name')}
                    type="text"
                    autoComplete="name"
                    className="form-control"
                  />
                )}
              </FormField>

              <FormField id="contact-email" label="Email address" error={errors.email}>
                {(control) => (
                  <input
                    {...control}
                    {...controlProps('email')}
                    type="email"
                    autoComplete="email"
                    className="form-control"
                  />
                )}
              </FormField>

              <FormField
                id="contact-message"
                label="Message"
                error={errors.message}
                className="contact-card__wide"
              >
                {(control) => (
                  <textarea
                    {...control}
                    {...controlProps('message')}
                    rows={5}
                    maxLength={1000}
                    className="form-control contact-card__textarea"
                  />
                )}
              </FormField>
            </div>

            {status === 'failed' && (
              <p className="contact-card__alert" role="alert">
                <AlertCircle size={18} aria-hidden="true" />
                <span>
                  Your message was not sent. What you wrote is saved, so you can try again.
                </span>
              </p>
            )}

            <button
              type="submit"
              className="button-primary contact-card__submit"
              disabled={isSending}
              aria-busy={isSending}
            >
              <Send size={18} aria-hidden="true" />
              {isSending ? 'Sending…' : status === 'failed' ? 'Try again' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
