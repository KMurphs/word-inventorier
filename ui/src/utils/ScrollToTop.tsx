import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// https://reactrouter.com/web/guides/scroll-restoration
// React router does not reliably handle scrolling to the current element 
// When we need to resort to doing it ourselves, this component when rendered will force a scroll to top

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}