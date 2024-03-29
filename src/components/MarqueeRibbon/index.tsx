import { ReactComponent as SuccessIcon } from "../../assets/icons/success.svg";
import styles from "./styles.module.scss";

const MarqueeRibbon = () => {
  const text = "2024 - 2025 Academic Year Books, Diaries booking open";
  return (
    <div className={styles.marquee}>
      <SuccessIcon />
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default MarqueeRibbon;
