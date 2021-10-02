import * as express from 'express';
import { body } from 'express-validator';

import { ProductController } from '../controllers/Product.controller';
import { AuthMiddleware } from '../middlewares/Auth.middleware';

export class Routes {
  public productController: ProductController = new ProductController();

  private auth: AuthMiddleware = new AuthMiddleware();

  public routes(app: express.Application): void {
    /*/  @Product /*/
    app.route('/products').get(this.productController.getProducts);
    app
      .route('/product')
      .post(
        this.auth.isLoggedin,
        [
          body('name')
            .trim()
            .isLength({ min: 4 })
            .withMessage('Atleast 4 char long'),
          body('rate')
            .trim()
            .isNumeric({ no_symbols: true })
            .withMessage('Should be  a number'),
          body('category').trim(),
          body('description').trim(),
        ],
        this.productController.addProduct
      );
    app
      .route('/product/:productId')
      .get(this.productController.getProduct)
      .put(
        this.auth.isLoggedin,
        [
          body('name')
            .trim()
            .isLength({ min: 4 })
            .withMessage('Atleast 4 char long'),
          body('rate')
            .trim()
            .isNumeric({ no_symbols: true })
            .withMessage('Should be number'),
          body('category').trim(),
          body('description').trim(),
        ],
        this.productController.updateProduct
      )
      .delete(this.auth.isLoggedin, this.productController.deleteProduct);
  }
}
