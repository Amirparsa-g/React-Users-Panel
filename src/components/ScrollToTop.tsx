import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const root = document.getElementById("root");
    if (root) root.scrollTo(0, 0);
    const scrollableDivs = document.querySelectorAll(
      ".overflow-y-auto, .overflow-auto",
    );
    scrollableDivs.forEach((div) => div.scrollTo(0, 0));
  }, [pathname]);

  return null;
};

export default ScrollToTop;
