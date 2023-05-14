import React from "react";

export default function useDeviceDetect() {
  const [isMobile, setMobile] = React.useState(false);

  React.useEffect(() => {
    const mobile = window.innerWidth <= 544;
    setMobile(mobile);
  }, []);

  return { isMobile };
}

