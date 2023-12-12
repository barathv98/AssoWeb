import { useInView } from 'react-intersection-observer';
import { ReactFCC } from '../../interface';

interface Props {
	cssClass: string;
	notInViewNode?: React.ReactNode;
}
const StyleOnScroll: ReactFCC<Props> = ({ cssClass, notInViewNode, children }) => {
	const { ref, inView } = useInView({ threshold: 0 });
	return (
		<>
			<div ref={ref}>{children}</div>
			{!inView && (
				<div className={cssClass}>
					{notInViewNode}
					{children}
				</div>
			)}
		</>
	);
};

export default StyleOnScroll;
