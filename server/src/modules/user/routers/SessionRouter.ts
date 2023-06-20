import { authenticateToken } from '@middlewares/authenticateToken';
import { SessionController } from '@user/controllers/SessionsController';
import { Router } from 'express';
export class SessionRouter {
  public router: Router;
  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.post('/', SessionController.create);
    this.router.post('/refresh', SessionController.refresh);
    return this.router;
  }
}
