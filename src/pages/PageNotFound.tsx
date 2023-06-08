import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div style={{ fontSize: "24px", marginTop: "32px" }}>
            404 Page Not Found<br />
            Please click <Link to="/products-list">here</Link> to order our products.
        </div>
    );
};

export default PageNotFound;
