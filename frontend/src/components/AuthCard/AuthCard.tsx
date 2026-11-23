import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import FormField from '../FormField/FormField';
import './AuthCard.css';

type Mode = 'signin' | 'create';
type Values = { name: string; email: string; password: string };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: '', email: '', password: '' };

const MODES: { value: Mode; label: string }[] = [
  { value: 'signin', label: 'Sign in' },
  { value: 'create', label: 'Create account' },
];

/** Returns an error message for one field, or undefined when it is fine */
function validateField(field: Field, values: Values, mode: Mode): string | undefined {
  switch (field) {
    case 'name':
      return values.name.trim() ? undefined : 'Enter your name.';

    case 'email': {
      const email = values.email.trim();
      if (!email) return 'Enter your email address.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? undefined
        : 'Enter a valid email address, like name@example.com.';
    }

    case 'password':
      if (!values.password) return 'Enter your password.';
      return mode === 'create' && values.password.length < 8
        ? 'Use at least 8 characters.'
        : undefined;
  }
}

// DEMO: signing in does not know the person's name, so it is taken from the email
function nameFromEmail(email: string): string {
  const local = email.split('@')[0];
  return local.charAt(0).toUpperCase() + local.slice(1);
}

/** Sign in and create account in one card, with a switch at the top */
export default function AuthCard() {
  const signIn = useAuthStore((state) => state.signIn);

  const [mode, setMode] = useState<Mode>('signin');
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCreate = mode === 'create';
  const fields: Field[] = isCreate ? ['name', 'email', 'password'] : ['email', 'password'];

  const switchMode = (next: Mode) => {
    setMode(next);
    setErrors({});
    setShowPassword(false);
  };

  const updateField = (field: Field, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Once a field shows an error, re-check it as the person types so the message clears when fixed
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: validateField(field, next, mode) }));
    }
  };

  const checkField = (field: Field) => () => {
    setErrors((previous) => ({ ...previous, [field]: validateField(field, values, mode) }));
  };

  // Props shared by the text inputs
  const controlProps = (field: Field) => ({
    value: values[field],
    onChange: (event: ChangeEvent<HTMLInputElement>) => updateField(field, event.target.value),
    onBlur: checkField(field),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const found: Errors = {};
    for (const field of fields) {
      const message = validateField(field, values, mode);
      if (message) found[field] = message;
    }
    setErrors(found);
    const firstInvalid = fields.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(`auth-${firstInvalid}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    // DEMO: no backend yet, so this just waits a moment and remembers the name and email
    await new Promise((resolve) => setTimeout(resolve, 800));
    const email = values.email.trim();
    signIn({ name: isCreate ? values.name.trim() : nameFromEmail(email), email });
  };

  return (
    <div className="auth-card">
      <div className="auth-card__switch" role="group" aria-label="Account options">
        {MODES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className="auth-card__switch-button"
            aria-pressed={mode === value}
            onClick={() => switchMode(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <h2 className="auth-card__title">{isCreate ? 'Create your account' : 'Welcome back'}</h2>
      <p className="auth-card__intro">
        {isCreate
          ? 'We only ask for what we need. All fields are required.'
          : 'Sign in to see your details and orders.'}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="auth-card__fields">
          {isCreate && (
            <FormField id="auth-name" label="Name" error={errors.name}>
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
          )}

          <FormField id="auth-email" label="Email address" error={errors.email}>
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
            id="auth-password"
            label="Password"
            hint={isCreate ? 'At least 8 characters' : undefined}
            error={errors.password}
          >
            {(control) => (
              <div className="password-field">
                <input
                  {...control}
                  {...controlProps('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isCreate ? 'new-password' : 'current-password'}
                  className="form-control password-field__input"
                />
                <button
                  type="button"
                  className="password-field__toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? (
                    <EyeOff size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
          </FormField>
        </div>

        <button
          type="submit"
          className="button-primary auth-card__submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting
            ? isCreate
              ? 'Creating account…'
              : 'Signing in…'
            : isCreate
              ? 'Create account'
              : 'Sign in'}
        </button>
      </form>

      <p className="auth-card__switch-text">
        {isCreate ? 'Already have an account? ' : 'New here? '}
        <button
          type="button"
          className="auth-card__link"
          onClick={() => switchMode(isCreate ? 'signin' : 'create')}
        >
          {isCreate ? 'Sign in' : 'Create an account'}
        </button>
      </p>

      {/* DEMO: remove this line when real accounts exist */}
      <p className="auth-card__demo">Demo: any email and password will sign you in.</p>
    </div>
  );
}
