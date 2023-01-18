import { ProductWithBasket } from "../pages/api/addorder";

export function removeEmpty(obj: object) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v != null)
    );
}

export const formattedNumber = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const saltRounds = 15;

export const summedCost = (productList: ProductWithBasket) => {
    const cost = productList.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);
    return formattedNumber(cost);
};
