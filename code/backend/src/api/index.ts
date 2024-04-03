import { Router } from 'express';
import { handleGetProducts } from './controller';
import { validateRequest } from '../middlwares';
import { productsSchema } from '../utils';

export default (): Router => {
  const app = Router();

  //TODO: add routes here...
  app.get('/test/companies/:companyName/categories/:categoryName/products', validateRequest('body', productsSchema), handleGetProducts);
  return app;
};
