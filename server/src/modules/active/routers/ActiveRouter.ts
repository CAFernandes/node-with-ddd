import { ActiveController } from '@active/controller/ActiveController';
import { Router } from 'express';

export class ActiveRouter {
  router: Router;
  constructor() {
    this.router = Router();
  }
  routes() {
    this.router.get('/', ActiveController.index);
    this.router.get('/:unit_id/:id', ActiveController.show);
    this.router.post('/', ActiveController.create);
    this.router.put('/:unit_id/:id', ActiveController.update);
    return this.router;
  }
}
