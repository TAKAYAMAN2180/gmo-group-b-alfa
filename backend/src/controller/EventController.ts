import {AppDataSource} from "../data-source";
import {Event} from "../entity/Event";
import {NextFunction, Request, Response} from "express"
import {User} from "../entity/User";
import {Technology} from "../entity/Technology";

export class EventController {

    private eventRepository = AppDataSource.getRepository(Event)
    private userRepository = AppDataSource.getRepository(User)
    private technologyRepository = AppDataSource.getRepository(Technology)


    async createEvent(request: Request, response: Response, next: NextFunction) {
        type RequestBodyType = {
            create_user: number,
            name: string,
            description: string,
            start_time: string,
            end_time: string,
            location: string,
            technologies: number[]
        }

        const {create_user: createUserId, name: name, description: description, start_time: startTime, end_time: endTime, location: location, technologies: technologies}: RequestBodyType = request.body;
        if (!createUserId || !name || !startTime || !endTime || !location || !technologies) {
            return JSON.stringify({message: "lack data" + createUserId + name + startTime + endTime + location + technologies})
        }

        const createUser = await this.userRepository.findOneBy({
            id: createUserId
        })
        if (!createUser) {
            return JSON.stringify({message: "Specified User ID \"" + createUserId + "\" does not exist"})
        }

        /*let technologyList: Technology[] = []
        technologies.forEach((technology_id) => {
            const technology = await this.technologyRepository.findOneBy({
                id: technology_id
            })
            technologyList.push(technology)
        })*/

        let technologyList: Technology[] = []
        for (const technologyId of technologies) {
            const technology = await this.technologyRepository.findOneBy({
                id: technologyId
            })
            if (technology) {
                technologyList.push(technology)
            }
        }

        const event = new Event()
        event.user = createUser;
        event.name = name;
        event.description = description;
        event.genre = technologyList;
        event.start_time = new Date(startTime);
        event.end_time = new Date(endTime);
        event.location = location;
        event.google_calender_event_id= "test";
        return AppDataSource.manager.save(event);
    }

    async getEventList(request: Request, response: Response, next: NextFunction) {

    }

    async getEventDetail(request: Request, response: Response, next: NextFunction) {

    }

    async updateEvent(request: Request, response: Response, next: NextFunction) {

    }

    async deleteEvent(request: Request, response: Response, next: NextFunction) {

    }
}