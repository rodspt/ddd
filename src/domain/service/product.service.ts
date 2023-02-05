import Product from "../entity/product";

export default class ProductService {

    static increasePrice(products: Product[], amount: number): void {
       products.forEach(product => {
            product.changePrice( (amount * product.price) / 100  + product.price)
       });
    }
    
}