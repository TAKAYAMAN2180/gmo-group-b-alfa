import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { Technology } from "../entity/Technology"
import { REPLCommand } from "repl"
import { createQueryBuilder } from "typeorm"
import App from "next/app"
import { UserTechnology } from "../entity/UserTechnology"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)
    private technologyRepository = AppDataSource.getRepository(Technology)
    private userTechnologyRepository = AppDataSource.getRepository(UserTechnology)

    async getProfile(request: Request, response: Response, next: NextFunction) {
        const user_id = parseInt(request.params.id)
        const user = await this.userRepository.findOne({
            relations: ['user_technologies', 'user_technologies.technology'],
            where: { id: user_id },
            });
        if(!user) {
            response.status(404).send({message: "Not Found"})
            return
        }

        const technologies = new Array()
        user.user_technologies?.forEach((user_tech: UserTechnology) => {
            if(user_tech?.technology !== null) {
                technologies.push(user_tech.technology?.name)
            }
        })

        const res = {
            id: user.id,
            name: user.name,
            email: user.email,
            technologies: technologies,
            created_at: user.created_at,
            edit_at: user.edit_at
        }

        response.status(200).send(res)

        return
    }

    async createUser(request: Request, response: Response, next: NextFunction) {
        const {name, email, department, technologies} = request.body
        if (!name || !email || !department || technologies.length === 0) {
            response.status(400).send({message: "Bad Request"})
            return
        }

        const user = new User()
        user.name = name
        user.email = email
        user.department = department
        technologies.forEach(async (technology) => {
            const find_tech = await this.technologyRepository.findOne({
                where: { id: parseInt(technology) },
                });
            
            if(find_tech !== null) {
                const _technology = new Technology()
                _technology.id = find_tech.id
                _technology.name  = find_tech.name

                const user_tech = new UserTechnology()
                user_tech.user = user
                user_tech.technology = _technology

                this.userTechnologyRepository.save(user_tech)
            }
        })
        
        this.userRepository.save(user)

        response.status(201).send(user)
        return
    }
    
    async updateProfile(request: Request, response: Response, next: NextFunction) {
        const user_id = parseInt(request.params.id)
        const {name, email, department, technologies} = request.body
        if (!name || !email || !department || technologies.length === 0) {
            response.status(400).send({message: "Bad Request"})
            return
        }

        const user = await this.userRepository.findOne({
            relations: ['user_technologies', 'user_technologies.technology'],
            where: { id: user_id },
            });

        if (user === null) {
            response.status(404).send({message: "Not Found"})
            return
        }

        user.user_technologies?.forEach(async (user_tech) => {
            await AppDataSource
                .createQueryBuilder()
                .delete()
                .from(UserTechnology)
                .where("id = :id", { id: user_tech.id })
                .execute()
        })

        user.name = name
        user.email = email
        user.department = department
        user.user_technologies = new Array()
        technologies.forEach(async (technology) => {
            const find_tech = await this.technologyRepository.findOne({
                where: { id: parseInt(technology) },
                });
            
            if(find_tech !== null) {
                const _technology = new Technology()
                _technology.id = find_tech.id
                _technology.name = find_tech.name

                const user_tech = new UserTechnology()
                user_tech.user = user
                user_tech.technology = _technology

                this.userTechnologyRepository.save(user_tech)
                user.user_technologies?.push(user_tech)
            }
        })

        this.userRepository.save(user)

        response.status(200).send(user)
        return
    }
}