/* eslint-disable no-console */
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';

import { Routes } from './app/routes/Router';

class App {
  public app: express.Application;
  public route: Routes = new Routes();
  public mongoUrl =
    'mongodb+srv://alshoja:alshoja@rationcartcluster.gebgm.mongodb.net/ration?retryWrites=true&w=majority';

  constructor() {
    this.app = express();
    this.config();
    this.setHeaders();
    this.route.routes(this.app);
  }

  private config(): void {
    dotenv.config();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.mongoSetup();
    this.upload();
    this.log();
  }

  private setHeaders() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
      );
      next();
    });
  }

  private upload() {
    const fileStorage = multer.diskStorage({
      destination: (req: Request, file: any, cb: CallableFunction) => {
        cb(null, path.join(__dirname, '/app/assets/uploads'));
      },
      filename: (req: Request, file: any, cb: CallableFunction) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
      },
    });

    const fileFilter = (req: Request, file: any, cb: CallableFunction) => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
    this.app.use(
      multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
    );
  }

  private log() {
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, '/server/logs/access.log'),
      { flags: 'a' }
    );
    this.app.use(morgan('combined', { stream: accessLogStream }));
  }

  private mongoSetup() {
    mongoose
      .connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('DB Connected');
      })
      .catch((err) => {
        console.log('Error in mongo connection:', err);
      });
  }
}
export default new App().app;
