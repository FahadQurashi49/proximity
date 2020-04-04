import { Router, Request, Response, NextFunction } from 'express';
import Shop from '../model/Shop';

export class ShopRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public createOne(req: Request, res: Response, next: NextFunction) {
        Shop.create(req.body).then((shop) => {
            res.json(shop);
        }).catch(next);
    }
    // just for development
    public getAll(req: Request, res: Response, next: NextFunction) {
        Shop.find({}).then((shops) => {
            res.json(shops);
        }).catch(next);
    }

    public getNearBy(req: Request, res: Response, next: NextFunction) {
        Shop.aggregate([
            {
              $geoNear: {
                 near: { type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] },
                 distanceField: "dist.calculated",
                 maxDistance: 500,
                 spherical: true
              }
            }
         ]).then((shops) => {
            res.json(shops);
        }).catch(next);
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        Shop.findById(req.params.id).then((shop) => {
            res.json(shop);
        }).catch(next);
    }

    public updateOne(req: Request, res: Response, next: NextFunction) {
        Shop.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
            Shop.findOne({ _id: req.params.id }).then((shop) => {
                res.json(shop);
            }).catch(next)
        }).catch(next);
    }

    public deleteOne(req: Request, res: Response, next: NextFunction) {
        Shop.findByIdAndRemove({ _id: req.params.id }).then((shop) => {
            res.json(shop);
        }).catch(next);
    }

    public routes() {
        this.router.post("/", this.createOne);
        this.router.get("/", this.getAll);
        this.router.get("/nearme", this.getNearBy);
        this.router.get("/:id", this.getOne);
        this.router.put("/:id", this.updateOne);
        this.router.delete("/:id", this.deleteOne);
    }

}

const shopRouter = new ShopRouter();
shopRouter.routes();

export default shopRouter.router;