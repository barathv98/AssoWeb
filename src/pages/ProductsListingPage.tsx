import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCategories from '../components/ProductCategories';
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
import useAnalytics from '../useAnalytics';
import { MixpanelEvent } from '../utils/constants';

const ProductsListingPage = () => {
	const { product } = useParams();
	const { trackEvent } = useAnalytics();

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

	useEffect(() => {
		if (product === 'prekg') trackEvent(MixpanelEvent.PREKG_VIEW, {});
		else if (product === 'term-books') trackEvent(MixpanelEvent.TERM_BOOKS_VIEW, {});
		else if (product === 'tamil-series') trackEvent(MixpanelEvent.TAMIL_VIEW, {});
		else if (product === 'tamil-writing') trackEvent(MixpanelEvent.TAMIL_WRITING_VIEW, {});
		else if (product === 'english-writing') trackEvent(MixpanelEvent.ENG_WRITING_VIEW, {});
		else if (product === 'gk') trackEvent(MixpanelEvent.GK_VIEW, {});
		else if (product === 'hindi') trackEvent(MixpanelEvent.HINDI_VIEW, {});
		else if (product === 'computer') trackEvent(MixpanelEvent.CS_VIEW, {});
		else if (product === 'drawing') trackEvent(MixpanelEvent.DRAWING_VIEW, {});
		else if (product === 'other-books') trackEvent(MixpanelEvent.OTHER_BOOKS_VIEW, {});
		else if (product === 'registers') trackEvent(MixpanelEvent.REGISTERS_VIEW, {});
		else if (product === 'books') trackEvent(MixpanelEvent.BOOKS_VIEW, {});
		else if (product === 'diaries') trackEvent(MixpanelEvent.DIARIES_VIEW, {});
	}, [product, trackEvent]);

	if (product === 'books') return <ProductCategories />;

	return (
		<>
			<ProductListing productList={productList} product={product || ''} />
		</>
	);
};

export default ProductsListingPage;
