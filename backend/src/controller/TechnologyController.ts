import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Technology } from "../entity/Technology"

export class TechnologyController {

    private technologyRepository = AppDataSource.getRepository(Technology)

    async getTagList(request: Request, response: Response, next: NextFunction) {
        const user = await this.technologyRepository.find();

        return user
    }
}