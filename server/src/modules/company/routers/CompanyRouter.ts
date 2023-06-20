import { CompanyController } from '@company/controllers/CompanyController';
import { authenticateToken } from '@middlewares/authenticateToken';
import { Router } from 'express';

export class CompanyRouter {
  private router: Router;
  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    this.router.get('/', authenticateToken, CompanyController.index);
    // this.router.get('/:id', this.companyController.show);
    this.router.post('/', CompanyController.store);
    // this.router.put('/:id', this.companyController.update);
    // this.router.delete('/:id', this.companyController.delete);

    return this.router;
  }
}
