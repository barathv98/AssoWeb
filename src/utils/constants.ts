const priceListLinks = {
    book: 'https://drive.google.com/file/d/1hBmzGwWcB6onXFFWESNmWKrfQ60Uj5-b/view?usp=sharing',
    register: 'https://drive.google.com/file/d/1Tg7MjI_laAFKvEnrA3J3l2Rqg_cNyqOV/view?usp=sharing',
}

export const nameRegex = /^[a-zA-Z ]+$/;
export const pincodeRegex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
export const mobileRegex = /^[6-9]\d{9}$/;

export const rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
});

export enum MixpanelEvent {
    ABOUTUS_CLICK = 'aboutus_click',
    PRODUCTS_CLICK = 'products_click',
    CONTACTUS_CLICK = 'contactus_click',
    BOOK_CLICK = 'book_click',
    REGISTER_CLICK = 'register_click',
    POPUP_CLICK = 'popup_click',
}

export default priceListLinks;
