import { Router } from 'express';
import { handleGetProductById, handleGetProducts } from './controller';
import { validateRequest } from '../middlwares';
import { productGetSchema, productsSchema } from '../models';

export default (): Router => {
  const app = Router();

  //TODO: add routes here...
  app.get('/categories/:categoryName/products', validateRequest('params', productsSchema), handleGetProducts);
  app.get('/categories/:categoryName/products/:productId', validateRequest('params', productGetSchema), handleGetProductById);
  return app;
};
