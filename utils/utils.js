"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalPricePromotion = void 0;
const successResponse = (message, data) => {
    return {
        message: message,
        data: data
    };
};
exports.default = successResponse;
function generalPricePromotion(price) {
    const priceString = price.toString();
    const lengthPrice = priceString.length;
    const lastThreeNumbers = lengthPrice - 3;
    const firstPart = priceString[0];
    const secondPart = (start, end) => {
        return priceString.substring(start, end);
    };
    const thirdPart = priceString.substring(lengthPrice, lastThreeNumbers);
    if (price < 1000) {
        return 'x' + priceString.substring(1);
    }
    else if (price < 10000) {
        return 'x.' + priceString.substring(1);
    }
    else if (price < 100000) {
        return firstPart + 'x.' + priceString.substring(2);
    }
    else if (price < 1000000) {
        return firstPart + 'xx.' + priceString.substring(3);
    }
    else if (price < 10000000) {
        return firstPart + '.xx' + secondPart(3, lastThreeNumbers) + '.' + thirdPart;
    }
    else if (price < 100000000) {
        return firstPart + 'x.' + secondPart(2, lastThreeNumbers) + '.' + thirdPart;
    }
}
exports.generalPricePromotion = generalPricePromotion;
