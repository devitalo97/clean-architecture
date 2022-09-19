import { Router, Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.usecase";
import ProductRepository from "../../repository/typeorm/product/product.repository";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository())

    const input = {
        name: req.body.name,
        prices: req.body.prices
    }

    try{
        const output = await usecase.execute(input)
        res.status(200).json(output)
    }catch(e){
        res.status(500).json(e)
    }
})

router.get('/list', async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository())

    const input = {}

    try{
        const output = await usecase.execute(input)
        res.status(200).json(output)
    }catch(e){
        res.status(500).json(e)
    }
})

export { router as ProductRouter }