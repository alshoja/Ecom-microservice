import * as express from "express";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import { body } from 'express-validator';
import { CartController } from "../controllers/Cart.controller";


export class Routes {
    public cartController: CartController = new CartController();

    private auth: AuthMiddleware = new AuthMiddleware();

    public routes(app: express.Application): void {
        /*/  @Product Cart /*/
        app.route('cart/products/:userId')
            .get(this.auth.isLoggedin, this.cartController.getCartProducts)
        app.route('cart/product/:userId/:productId')
            .put(this.auth.isLoggedin, [
                body('quantity').trim().isNumeric({ no_symbols: true }).withMessage('Quantity is required/should be number'),
                body('userId').trim().isNumeric({ no_symbols: true }).withMessage('UserId is required'),
            ], this.cartController.addToCart)
            .delete(this.auth.isLoggedin, this.cartController.deleteCartProduct)
    }
}