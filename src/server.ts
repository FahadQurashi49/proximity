import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import shopRouter from './router/ShopRouter';
import customerRouter from './router/CustomerRouter';
import productRouter from './router/ProductRouter';

// Creates and configures an ExpressJS web server.
class Server {

  // ref to Express instance
  public express: express.Application;
  private ERROR_CODE: number = 500;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.config();
    this.routes();
  }

  // application config
  private config(): void {

    // mongo connection
    const MONGO_URI:string = 'mongodb://localhost:27017/prox';
      mongoose.connect(MONGO_URI || process.env.mongodb_uri,
        {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true});
    mongoose.Promise = global.Promise;

    // express middleware
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/api/v1/shop', shopRouter);
    this.express.use('/api/v1/customer', customerRouter);
    this.express.use('/api/v1/product', productRouter);
    this.express.use((err, req, res, next) => {
      let error = {
        error: err.message,
        errorCode: err.errorCode || this.ERROR_CODE,
        statusCode: err.statusCode || this.ERROR_CODE,
      };
      res.status(error.statusCode).json(error);
    });
  }

}

export default new Server().express;