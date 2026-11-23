import { useEffect, useRef } from 'react';
import AuthCard from '../../components/AuthCard/AuthCard';
import OrderHistory from '../../components/OrderHistory/OrderHistory';
import PageHeading from '../../components/PageHeading/PageHeading';
import { useAuthStore } from '../../store/authStore';
import { useOrderStore } from '../../store/orderStore';
import './AccountPage.css';

export default function AccountPage() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const orders = useOrderStore((state) => state.orders);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const wasSignedIn = useRef(Boolean(user));

  // Right after signing in, move focus to the page title so the change is announced
  useEffect(() => {
    if (user && !wasSignedIn.current) headingRef.current?.focus();
    wasSignedIn.current = Boolean(user);
  }, [user]);

  // ---------- Signed out ----------
  if (!user) {
    return (
      <div className="account-page">
        <PageHeading
          title="Account"
          subtitle="Sign in to see your details and orders."
          headingRef={headingRef}
        />
        <AuthCard />
      </div>
    );
  }

  // ---------- Signed in ----------
  return (
    <div className="account-page">
      <PageHeading
        title="Your account"
        subtitle={`Signed in as ${user.email}`}
        headingRef={headingRef}
      />

      <div className="account-page__layout">
        <section className="account-card" aria-labelledby="account-details-title">
          <h2 id="account-details-title" className="account-card__title">
            Your details
          </h2>
          <dl className="account-card__list">
            <div>
              <dt>Name</dt>
              <dd>{user.name}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="button-secondary account-card__signout"
            onClick={signOut}
          >
            Sign out
          </button>
        </section>

        {/* DEMO: orders are saved on this device only until there is a backend */}
        <OrderHistory orders={orders} />
      </div>
    </div>
  );
}
