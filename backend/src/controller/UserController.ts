import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { Technology } from "../entity/Technology"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)
    private technologyRepository = AppDataSource.getRepository(Technology)

    async getProfile(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const user = await this.userRepository.findOne({
            where: { id }
        })

        return user
    }

    async createUser(request: Request, response: Response, next: NextFunction) {
        const {name, email, department, ...technology_ids} = request.params

        if (!name || !email || !department || technology_ids.empty?) {
            return JSON.stringify({message: "lack data"})
        }

        let technologies = []
        technology_ids.forEach((technology_id) => {
            const technology = await this.technologyRepository.findOne({
                where: { technology_id }
            })
            technologies = [...technologies, technology]
        })

        const user = Object.assign(new User(), {
                        name,
                        email,
                        department
                    })
        
        return this.userRepository.save(user)
    }
    

    // async one(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)


    //     const user = await this.userRepository.findOne({
    //         where: { id }
    //     })

    //     if (!user) {
    //         return "unregistered user"
    //     }
    //     return user
    // }

    // async save(request: Request, response: Response, next: NextFunction) {
    //     const { firstName, lastName, age } = request.body;

    //     const user = Object.assign(new User(), {
    //         firstName,
    //         lastName,
    //         age
    //     })

    //     return this.userRepository.save(user)
    // }

    // async remove(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)

    //     let userToRemove = await this.userRepository.findOneBy({ id })

    //     if (!userToRemove) {
    //         return "this user not exist"
    //     }

    //     await this.userRepository.remove(userToRemove)

    //     return "user has been removed"
    // }

}