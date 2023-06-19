import { SessionController } from '@user/controllers/SessionsController';
import { Router } from 'express';
export class SessionRouter {
  public router: Router;
  private sessionController: SessionController;
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/', this.sessionController.store);
  }


}
