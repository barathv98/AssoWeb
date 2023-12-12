import React from "react";

export default function useDeviceDetect() {
  const [isMobile, setMobile] = React.useState(false);
  const [isTablet,setTablet] = React.useState(false);
  const [isMobileTablet,setMobileTablet] = React.useState(false);

  React.useEffect(() => {
    const mobile = window.innerWidth <= 544;
    const tablet = window.innerWidth > 544 && window.innerWidth <= 1004;
    setMobile(mobile);
    setTablet(tablet);
    setMobileTablet(mobile || tablet);
  }, []);

  return { isMobile, isTablet, isMobileTablet };
}

