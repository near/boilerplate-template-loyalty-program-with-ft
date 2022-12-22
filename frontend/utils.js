import { customAlphabet } from 'nanoid';

const CUSTOMER_PREFIX_KEY = 'near.loyalty-program.customer.prefix.';

const nanoid = customAlphabet(
    '0123456789abcdefghijklmnopqrstuvwxyz',
    13,
  );

export function getCustomerPrefix(merchantId) {
    const prefix = CUSTOMER_PREFIX_KEY + merchantId;
    if (getItemFromLocalStorage(prefix) === null) {
        localStorage.setItem(prefix, nanoid());
    } 
    
    return getItemFromLocalStorage(prefix);
}

function getItemFromLocalStorage(key) {
    return localStorage.getItem(key);
}
