import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** Scrolls back to the top whenever the page (not just the query) changes */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
