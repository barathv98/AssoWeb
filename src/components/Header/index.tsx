import { motion } from "framer-motion";
import { FC, useCallback, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { CgOrganisation } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrContactInfo } from "react-icons/gr";
import Sidebar from "../../common/components/Sidebar";
import useAnalytics from "../../useAnalytics";
import { transitionConfig } from "../../utils/config/transitionConfig";
import { MixpanelEvent } from "../../utils/constants";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";
import styles from "./styles.module.scss";

interface HeaderProps {
  aboutRef: any;
  productRef: any;
  contactRef: any;
}
const Header: FC<HeaderProps> = ({ aboutRef, productRef, contactRef }) => {
  const { isMobile } = useDeviceDetect();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { trackEvent } = useAnalytics();

  const onSidebarItemClick = useCallback(
    (refElement: any) => {
      setShowPopup(false);
      refElement.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    },
    [setShowPopup]
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <img
            className={styles.logo}
            src={require("../../assets/images/logo.png")}
            alt="company logo"
          />
          {isMobile ? (
            <h2 className={styles.title}>ASSOCIATE PRINTS</h2>
          ) : (
            <h1 className={styles.title}>ASSOCIATE PRINTS</h1>
          )}
          {isMobile && (
            <div
              className={styles.hamburgerIcon}
              onClick={() => {
                if (showPopup)
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                setShowPopup((showPopup) => !showPopup);
                trackEvent(MixpanelEvent.POPUP_CLICK, {});
              }}
            >
              <GiHamburgerMenu />
            </div>
          )}
        </div>
        <div className={styles.optionsContainer}>
          <div
            className={styles.option}
            onClick={() => {
              aboutRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              });
              trackEvent(MixpanelEvent.ABOUTUS_CLICK, {});
            }}
          >
            About Us
          </div>
          <div
            className={styles.option}
            onClick={() => {
              productRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              });
              trackEvent(MixpanelEvent.PRODUCTS_CLICK, {});
            }}
          >
            Products
          </div>
          <div
            className={styles.option}
            onClick={() => {
              contactRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              });
              trackEvent(MixpanelEvent.CONTACTUS_CLICK, {});
            }}
          >
            Contact Us
          </div>
        </div>
      </div>
      <motion.div {...transitionConfig}>
        {showPopup && (
          <Sidebar
            onClose={() => setShowPopup(false)}
            content={
              <>
                <div
                  className={styles.sidebarItem}
                  onClick={() => {
                    onSidebarItemClick(aboutRef);
                    trackEvent(MixpanelEvent.ABOUTUS_CLICK, {});
                  }}
                >
                  <CgOrganisation />
                  <span>About Us</span>
                </div>
                <div
                  className={styles.sidebarItem}
                  onClick={() => {
                    onSidebarItemClick(productRef);
                    trackEvent(MixpanelEvent.PRODUCTS_CLICK, {});
                  }}
                >
                  <BiCategory />
                  <span>Products</span>
                </div>
                <div
                  className={styles.sidebarItem}
                  onClick={() => {
                    onSidebarItemClick(contactRef);
                    trackEvent(MixpanelEvent.CONTACTUS_CLICK, {});
                  }}
                >
                  <GrContactInfo />
                  <span>Contact Us</span>
                </div>
              </>
            }
          />
        )}
      </motion.div>
    </>
  );
};

export default Header;
