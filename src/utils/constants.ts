const priceListLinks = {
	book: 'https://drive.google.com/file/d/1hBmzGwWcB6onXFFWESNmWKrfQ60Uj5-b/view?usp=sharing',
	register: 'https://drive.google.com/file/d/1Tg7MjI_laAFKvEnrA3J3l2Rqg_cNyqOV/view?usp=sharing',
	diary: '',
};

export const nameRegex = /^[a-zA-Z ]+$/;
export const pincodeRegex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
export const mobileRegex = /^[6-9]\d{9}$/;

export const rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
});

export const primaryColor = '#2d9bf0';

export enum MixpanelEvent {
	ABOUTUS_VIEW = 'AboutUs_View',
	PRODUCTS_VIEW = 'Products_View',
	CONTACTUS_VIEW = 'ContactUs_View',
	CONTACT_QUERY_CLICK = 'Contact_Query_Click',
	CONTACT_QUERY_SUCCESS = 'Contact_Query_Success',
	CART_DETAILS_VIEW = 'Cart_Details_View',
	CART_CHECKOUT_CLICK = 'Cart_Checkout_Click',
	CART_ADDRESS_VIEW = 'Cart_Address_View',
	BACK_CART_CLICK = 'Back_Cart_Click',
	CONFIRM_ORDER_CLICK = 'Confirm_Order_Click',
	ORDER_PROCESSING_VIEW = 'Order_Processing_View',
	ORDER_SUCCESS_VIEW = 'Order_Success_View',
	ORDER_FAILED_VIEW = 'Order_Failed_View',
	ORDER_CART_RETURN_CLICK = 'Order_Cart_Return_Click',
	ORDER_HOME_RETURN_CLICK = 'Order_Home_Return_Click',
	BOOK_PRICELIST_CLICK = 'Book_Pricelist_Click',
	REGISTER_PRICELIST_CLICK = 'Register_Pricelist_Click',
	DIARY_PRICELIST_CLICK = 'Diary_Pricelist_Click',
	BOOKS_VIEW = 'Books_View',
	REGISTERS_VIEW = 'Registers_View',
	DIARIES_VIEW = 'Diaries_View',
	PREKG_VIEW = 'PreKG_View',
	TERM_BOOKS_VIEW = 'Term_Books_View',
	TAMIL_VIEW = 'Tamil_View',
	TAMIL_WRITING_VIEW = 'Tamil_Writing_View',
	ENG_WRITING_VIEW = 'Eng_Writing_View',
	GK_VIEW = 'GK_View',
	HINDI_VIEW = 'Hindi_View',
	CS_VIEW = 'CS_View',
	DRAWING_VIEW = 'Drawing_View',
	OTHER_BOOKS_VIEW = 'Other_Books_View',
	CART_ITEM_REMOVE_CLICK = 'Cart_Item_Remove_Click',
	LOGOUT_CLICK = 'Logout_Click',
	MOB_SIDEBAR_OPEN = 'Mob_Sidebar_Open',
	MOB_SIDEBAR_CLOSE = 'Mob_Sidebar_Close',
	LOGIN_CLICK = 'Login_Click',
	MOB_LOGIN_CLICK = 'Mob_Login_Click',
	SEND_OTP_CLICK = 'Send_OTP_Click',
	MY_ACC_CLICK = 'My_Acc_Click',
	MOB_MY_ACC_CLICK = 'Mob_My_Acc_Click',
	OTP_RESEND_CLICK = 'OTP_Resend_Click',
	VERIFY_OTP_CLICK = 'Verify_OTP_Click',
}

export default priceListLinks;
