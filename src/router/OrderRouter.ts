import { Router, Request, Response, NextFunction } from 'express';
import Order from '../model/Order';

export class OrderRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public createOne(req: Request, res: Response, next: NextFunction) {
        Order.create(req.body).then((order) => {
            res.json(order);
        }).catch(next);
    }
    // just for development
    public getAll(req: Request, res: Response, next: NextFunction) {
        Order.find({}).then((orders) => {
            res.json(orders);
        }).catch(next);
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        Order.findById(req.params.id).then((order) => {
            res.json(order);
        }).catch(next);
    }

    public updateOne(req: Request, res: Response, next: NextFunction) {
        Order.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
            Order.findOne({ _id: req.params.id }).then((order) => {
                res.json(order);
            }).catch(next)
        }).catch(next);
    }

    public deleteOne(req: Request, res: Response, next: NextFunction) {
        Order.findByIdAndRemove({ _id: req.params.id }).then((order) => {
            res.json(order);
        }).catch(next);
    }

    public routes() {
        this.router.post("/", this.createOne);
        this.router.get("/", this.getAll);
        this.router.get("/:id", this.getOne);
        this.router.put("/:id", this.updateOne);
        this.router.delete("/:id", this.deleteOne);
    }

}

const orderRouter = new OrderRouter();
orderRouter.routes();

export default orderRouter.router;