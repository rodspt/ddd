import {Sequelize} from 'sequelize-typescript';
import ProductModel from '../db/sequelize/model/product.model';
import Product from '../../domain/entity/product';
import ProductRepository from './product.repository';

describe("Product repository test", () => {

     let sequelize: Sequelize;

     //Para rodar todas as vezes
     beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });


         //Adicionando as models ao banco 
         sequelize.addModels([ProductModel]);
         await sequelize.sync();
    

    });

    afterEach(async () => {
        await sequelize.close();
      });
    

      it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("productId", "Product name", 100);
        await productRepository.create(product);
    
        const productModel = await ProductModel.findOne({
          where: { id: "productId" },
        });
    
        expect(productModel.toJSON()).toStrictEqual({
          id: "productId",
          name: "Product name",
          price: 100,
        });
      });


      it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("productId", "Product name", 100);
        await productRepository.create(product);
    
        const productModel = await ProductModel.findOne({
          where: { id: "productId" },
        });
    
        product.changeName("Product 2");
        product.changePrice(200);
        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne({
            where: { id: "productId" },
          });

          expect(productModel2.toJSON()).toStrictEqual({
            id: "productId",
            name: "Product 2",
            price: 200,
          });

      });

      it("should find a product", async () => {

        const productRepository = new ProductRepository();
        const product = new Product("product1", "Product name", 100);
        await productRepository.create(product);
    
        const productModel = await ProductModel.findOne({
          where: { id: "product1" },
        });
         
        const foundProduct = await productRepository.find("product1");
         
        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
        });

      });

      it("should find all products", async () => {

        const productRepository = new ProductRepository();
        const product = new Product("product1", "Product name1", 100);
        await productRepository.create(product);
    
        const product2 = new Product("product2", "Product name2", 100);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product, product2];

         
        expect(products).toEqual(foundProducts);

      });

});