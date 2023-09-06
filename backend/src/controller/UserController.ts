import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { Technology } from "../entity/Technology"
import { REPLCommand } from "repl"
import { createQueryBuilder } from "typeorm"
import App from "next/app"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)
    private technologyRepository = AppDataSource.getRepository(Technology)

    async getProfile(request: Request, response: Response, next: NextFunction) {
        const user_id = parseInt(request.params.id)

        const user = this.userRepository.findOneBy({
            id: user_id
        })
        if(!user) {
            return "not found"
        }

        return user
    }

    async createUser(request: Request, response: Response, next: NextFunction) {
        const {name, email, department, technologies} = request.body
        if (!name || !email || !department || technologies.length === 0) {
            return JSON.stringify({message: "lack data"})
        }

        let technologyList = []
        technologies.forEach((technology_id) => {
            const technology = this.technologyRepository.findOneBy({
                id: technology_id
            })
            technologyList.push(technology)
        })
        
        const user = new User()
        user.name = name
        user.email = email
        user.department = department
        user.can_use = technologyList
        
        return AppDataSource.manager.save(user)
    }
    
    async updateProfile(request: Request, response: Response, next: NextFunction) {
        const user_id = parseInt(request.params.id)
        const {name, email, department, technologies} = request.params
        if (!name || !email || !department || technologies.length === 0) {
            return JSON.stringify({message: "lack data"})
        }

        return await AppDataSource
            .createQueryBuilder()
            .update(User)
            .set({ 
                name: name, 
                email: email,
                department: department
            })
            .where("id = :id", { id: user_id })
            .execute()
    }
}