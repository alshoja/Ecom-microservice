import { UserController } from "../controllers/User.controller";
import { AuthController } from "../controllers/Auth.controller";
import * as express from "express";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import { body } from 'express-validator';
import { User } from "../models/User.model";


export class Routes {
    public userController: UserController = new UserController();
    public authController: AuthController = new AuthController();

    private auth: AuthMiddleware = new AuthMiddleware();

    public routes(app: express.Application): void {

        /*/@Auth  /*/
        app.route('/login').post(
            [
                body('username').trim().isEmail().withMessage('Please enter a valid email.'),
                body('password').trim().isLength({ min: 5 }),
            ], this.authController.login)

        /*/ @User   /*/
        app.route('/users').get(this.auth.isLoggedin, this.userController.getUsers)
        app.route('/user').post(
            [
                body('username').isEmail()
                    .withMessage('Please enter a valid email.')
                    .custom((value, { req }) => {
                        return User.findOne({ username: value }).then(user => {
                            if (user) {
                                return Promise.reject('E-mail already exists')
                            }
                        })
                    })
                    .normalizeEmail(),
                body('password').trim().isLength({ min: 5 }),
                body('name').trim().not().notEmpty()
            ], this.userController.addUser)
    }
}