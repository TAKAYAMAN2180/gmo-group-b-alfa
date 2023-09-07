import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { Technology } from "../entity/Technology"
import { REPLCommand } from "repl"
import { createQueryBuilder } from "typeorm"
import App from "next/app"
import { UserTechnology } from "../entity/UserTechnology"
import { Event } from "../entity/Event"

export class TechnologyController {

    private userRepository = AppDataSource.getRepository(User)
    private technologyRepository = AppDataSource.getRepository(Technology)
    private userTechnologyRepository = AppDataSource.getRepository(UserTechnology)
    private eventRepository = AppDataSource.getRepository(Event)

    async getTagList(request: Request, response: Response, next: NextFunction) {
        const user = await this.technologyRepository.find();

        return user
    }

    async getEventListByTag(request: Request, response: Response, next: NextFunction) {
        const technology_id = request.params.id

        const technology = await this.technologyRepository.findOne({
            relations: ['event_technologies', 'event_technologies.technology'],
            where: { id: technology_id },
            });

        return technology.event_technologies
    }
}