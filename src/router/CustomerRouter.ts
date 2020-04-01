import { Router, Request, Response, NextFunction } from 'express';
import Customer from '../model/Customer';

export class CustomerRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public createOne(req: Request, res: Response, next: NextFunction) {
        console.log(JSON.stringify(req.body, null, 2));
        Customer.create(req.body).then((customer) => {
            res.json(customer);
        }).catch(next);
    }
    // just for development
    public getAll(req: Request, res: Response, next: NextFunction) {
        Customer.find({}).then((customers) => {
            res.json(customers);
        }).catch(next);
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        Customer.findById(req.params.id).then((customer) => {
            res.json(customer);
        }).catch(next);
    }

    public updateOne(req: Request, res: Response, next: NextFunction) {
        Customer.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
            Customer.findOne({ _id: req.params.id }).then((customer) => {
                res.json(customer);
            }).catch(next)
        }).catch(next);
    }

    public deleteOne(req: Request, res: Response, next: NextFunction) {
        Customer.findByIdAndRemove({ _id: req.params.id }).then((customer) => {
            res.json(customer);
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

const customerRouter = new CustomerRouter();
customerRouter.routes();

export default customerRouter.router;