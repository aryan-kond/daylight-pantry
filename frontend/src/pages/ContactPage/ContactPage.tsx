import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT } from '../../data/contact';
import { sendMessage } from '../../utils/mockContact';
import FormField from '../../components/FormField/FormField';
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
        {/* Contact details */}
        <section className="contact-info" aria-labelledby="contact-info-title">
          <h2 id="contact-info-title" className="contact-info__title">
            Reach us directly
          </h2>
          <p className="contact-info__intro">Prefer to write or talk? Use any of these.</p>

          <ul className="contact-list">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="contact-row contact-row--link">
                <span className="contact-row__icon icon-fill">
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
                <span className="contact-row__icon icon-fill">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <span className="contact-row__text">
                  <span className="contact-row__label">Call us, {CONTACT.hours}</span>
                  <span className="contact-row__value tabular">{CONTACT.phone}</span>
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
              {isSending ? 'Sending…' : status === 'failed' ? 'Try again' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
