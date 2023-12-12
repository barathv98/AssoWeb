import { FC, useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './Modal.module.scss';

interface Props {
	openState: boolean;
	content: React.ReactNode;
	title?: string;
	isClosable?: boolean;
	closeOnOverlayClick?: boolean;
	cssClass?: string;
	footer?: React.ReactNode;
	onCloseModal?: () => void;
	mobileModalPosition?: 'top' | 'center' | 'bottom' | 'full';
	fullScreenOnMobile?: boolean;
}
const Modal: FC<Props> = ({
	title,
	content,
	isClosable,
	closeOnOverlayClick,
	cssClass,
	footer,
	onCloseModal,
	openState,
	mobileModalPosition,
	fullScreenOnMobile,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(openState);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		if (onCloseModal) onCloseModal();
	}, [onCloseModal]);

	const onOverlayClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (closeOnOverlayClick && e.target === e.currentTarget) {
				closeModal();
			}
		},
		[closeModal, closeOnOverlayClick]
	);

	useEffect(() => {
		setIsOpen(openState);
	}, [openState]);

	const showHeader = title || isClosable;
	const positionClass = mobileModalPosition !== 'top' ? styles[`${mobileModalPosition}`] : '';
	const fullScreenMobileClass = fullScreenOnMobile ? styles.fullScreenMobile : '';

	return isOpen ? (
		<div className={[styles.modalContainer, cssClass].filter((s) => s).join(' ')}>
			<div className={styles.modalOverlay} onClick={onOverlayClick} data-testid="modal-overlay" />
			<div className={`${styles.modal} ${positionClass} ${fullScreenMobileClass} modal`}>
				<div className={`${styles.modalContent} modal-content`}>
					{showHeader && (
						<div className={`${styles.modalHeader} modal-header`}>
							<div className={styles.title}>{title}</div>
							{isClosable && (
								<div className={styles.closeButton} onClick={onCloseModal}>
									<AiOutlineClose size={20} />
								</div>
							)}
						</div>
					)}
					{!!content && <div className={`${styles.modalBody} modal-body`}>{content}</div>}
					{footer && <div className={`${styles.actionMenu} footer`}>{footer}</div>}
				</div>
			</div>
		</div>
	) : (
		<div />
	);
};

export default Modal;
