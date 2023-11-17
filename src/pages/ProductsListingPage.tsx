import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductListing from '../components/ProductListing';
import { computerBooksList } from '../data/books/computer';
import { drawingBooksList } from '../data/books/drawing';
import { engWritingBooksList } from '../data/books/engWriting';
import { gkBooksList } from '../data/books/gk';
import { hindiBooksList } from '../data/books/hindi';
import { otherBooksList } from '../data/books/other';
import { prekgBooksList } from '../data/books/prekg';
import { tamilSeriesBooksList } from '../data/books/tamilSeries';
import { tamilWritingBooksList } from '../data/books/tamilWriting';
import { termBooksList } from '../data/books/termBooks';
import { registersList } from '../data/registers';

const ProductsListingPage = () => {
	const { product } = useParams();

	const productList: any = useMemo(() => {
		if (product === 'prekg') return prekgBooksList;
		else if (product === 'term-books') return termBooksList;
		else if (product === 'tamil-series') return tamilSeriesBooksList;
		else if (product === 'tamil-writing') return tamilWritingBooksList;
		else if (product === 'english-writing') return engWritingBooksList;
		else if (product === 'gk') return gkBooksList;
		else if (product === 'hindi') return hindiBooksList;
		else if (product === 'computer') return computerBooksList;
		else if (product === 'drawing') return drawingBooksList;
		else if (product === 'other-books') return otherBooksList;
		else if (product === 'registers') return registersList;
		return [];
	}, [product]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [productList]);

	return <ProductListing productList={productList} generalProduct={product === 'registers'} />;
};

export default ProductsListingPage;
