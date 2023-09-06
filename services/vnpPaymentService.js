"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vnpPaymentService = void 0;
exports.vnpPaymentService = {
    sortObject: (obj) => {
        const sorted = {};
        const str = [];
        let key;
        for (key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
        }
        return sorted;
    }
};
