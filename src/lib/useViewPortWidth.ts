import { useState, useEffect } from "react";

export const useViewportWidth = (): number => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (width === null) setWidth(window.innerWidth);

    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return width ?? 0;
};
