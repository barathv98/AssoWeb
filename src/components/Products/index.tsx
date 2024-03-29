import { FC } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { ReactComponent as BookIcon } from "../../assets/icons/book.svg";
import styles from "./styles.module.scss";
// import {ReactComponent as DiaryIcon} from '../../assets/icons/diary.svg';
import { ReactComponent as RegisterIcon } from "../../assets/icons/register.svg";
import useAnalytics from "../../useAnalytics";
import priceListLinks, { MixpanelEvent } from "../../utils/constants";
import RenderImage from "../RenderImage";

interface ProductsProps {
  productRef: any;
}
const Products: FC<ProductsProps> = ({ productRef }) => {
  const { trackEvent } = useAnalytics();

  const onProductClick = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className={styles.products} ref={productRef}>
      <div className={styles.image}>
        <RenderImage imageName="products_i7jrpv" />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.sectionTitle}>Products</div>
        <div className={styles.content}>
          We offer a wide variety of text books and activity books for kids from
          Pre KG to Std V.
          <div className={styles.clickNote}>
            Please click below to view our catalogues👇
          </div>
          <div className={styles.productLinks}>
            <div
              className={styles.linkContainer}
              onClick={() => {
                onProductClick(priceListLinks.book);
                trackEvent(MixpanelEvent.BOOK_CLICK, {});
              }}
            >
              <div className={`${styles.iconContainer} ${styles.book}`}>
                <BookIcon />
              </div>
              <div className={styles.text}>
                <div className={styles.title}>School Books</div>
                <div className={styles.subTitle}>
                  Term books with Ques paper, Writing books, Hindi, GK, Computer
                  Science Books, Drawing Books
                </div>
              </div>
              <div className={styles.arrowContainer}>
                <MdArrowForwardIos />
              </div>
            </div>
            <div
              className={styles.linkContainer}
              onClick={() => {
                onProductClick(priceListLinks.register);
                trackEvent(MixpanelEvent.REGISTER_CLICK, {});
              }}
            >
              <div className={`${styles.iconContainer} ${styles.register}`}>
                <RegisterIcon />
              </div>
              <div className={styles.text}>
                <div className={styles.title}>Attendance Registers</div>
                <div className={styles.subTitle}>
                  School Mirror, Fees Register, Workdone register, Cumulative
                  Record, Mark & Grade Record, TC Book
                </div>
              </div>
              <div className={styles.arrowContainer}>
                <MdArrowForwardIos />
              </div>
            </div>
            {/* <div className={styles.linkContainer}>
                        <div className={`${styles.iconContainer} ${styles.diary}`}><DiaryIcon /></div>
                        <div className={styles.text}>
                            <div className={styles.title}>School Diaries</div>
                            <div className={styles.subTitle}>
                                Term books with Ques paper, Writing books, Hindi, GK, Computer Science Books, Drawing Books
                            </div>
                        </div>
                        <div className={styles.arrowContainer}>
                            <MdArrowForwardIos />
                        </div>
                    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
