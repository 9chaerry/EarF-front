import { useEffect } from 'react';

function ScrollToTopOnPageLoad() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return null;
}

export default ScrollToTopOnPageLoad;
