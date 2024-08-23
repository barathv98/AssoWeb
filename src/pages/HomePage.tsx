import { useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import ProductTiles from "../components/ProductTiles";

const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <HeroBanner />
            <ProductTiles />
        </>
    );
};

export default HomePage;
