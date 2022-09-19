import { Router, Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.usecase";
import CustomerRepository from "../../repository/typeorm/customer/customer.repository";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository())

    const input = {
        name: req.body.name,
        address: req.body.address
    }

    try{
        const output = await usecase.execute(input)
        res.status(200).json(output)
    }catch(e:any){
        res.status(500).json(e)
    }
})

router.get('/list', async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository())

    const input = {}
    try{
        const output = await usecase.execute(input)
        res.status(200).json(output)
    }catch(e:any){
        res.status(500).json(e)
    }


})
export { router as CustomerRouter }
