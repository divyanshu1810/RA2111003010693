import { Router } from 'express';
import { handleGetProducts } from './controller';
import { validateRequest } from '../middlwares';
import { productsSchema } from '../models';

export default (): Router => {
  const app = Router();

  //TODO: add routes here...
  app.get('/test/companies/:companyName/categories/:categoryName/products', validateRequest('params', productsSchema), handleGetProducts);
  return app;
};
