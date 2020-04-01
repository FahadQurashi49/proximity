import { Router, Request, Response, NextFunction } from 'express';
import Product from '../model/Product';

export class ProductRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public createOne(req: Request, res: Response, next: NextFunction) {
        console.log(JSON.stringify(req.body, null, 2));
        Product.create(req.body).then((product) => {
            res.json(product);
        }).catch(next);
    }
    // just for development
    public getAll(req: Request, res: Response, next: NextFunction) {
        Product.find({}).then((products) => {
            res.json(products);
        }).catch(next);
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        Product.findById(req.params.id).then((product) => {
            res.json(product);
        }).catch(next);
    }

    public updateOne(req: Request, res: Response, next: NextFunction) {
        Product.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
            Product.findOne({ _id: req.params.id }).then((product) => {
                res.json(product);
            }).catch(next)
        }).catch(next);
    }

    public deleteOne(req: Request, res: Response, next: NextFunction) {
        Product.findByIdAndRemove({ _id: req.params.id }).then((product) => {
            res.json(product);
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

const productRouter = new ProductRouter();
productRouter.routes();

export default productRouter.router;