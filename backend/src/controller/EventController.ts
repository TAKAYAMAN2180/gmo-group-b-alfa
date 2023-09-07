import {AppDataSource} from "../data-source";
import {Event} from "../entity/Event";
import {NextFunction, Request, Response} from "express"
import {User} from "../entity/User";
import {Technology} from "../entity/Technology";
import { EventTechnology } from "../entity/EventTechnology";
import { Reservation } from "../entity/Reservation";

export class EventController {

    private eventRepository = AppDataSource.getRepository(Event)
    private userRepository = AppDataSource.getRepository(User)
    private technologyRepository = AppDataSource.getRepository(Technology)
    private reservationRespository = AppDataSource.getRepository(Reservation)

    async getRemainingSlotsByEvent(request: Request, response: Response, next: NextFunction) {
        const event_id: number = parseInt(request.params.id)
        const event = await this.eventRepository.findOne({
            relations: ['reservations', 'reservations.user'],
            where: { id: event_id },
            });
        
        let remaining: number|null = null
        if(event?.limitation !== null && event?.limitation !== undefined) {
            const reservationing_count = (event.reservations?.length===undefined) ? 0 : event.reservations.length
            remaining = event?.limitation-reservationing_count
        }
        const res = {
            'remaining': remaining
        }

        response.status(200).send(res)
        return
    }

    async getEventListByTag(request: Request, response: Response, next: NextFunction) {
        const tag_id: number = parseInt(request.params.id)
        const technology = await this.technologyRepository.findOne({
            relations: ['event_technologies', 'event_technologies.event'],
            where: { id: tag_id },
            });

        if(technology === null) {
            response.status(404).json({message: "Not Found"})
            return
        }

        const eventList: Event[] = []
        technology.event_technologies?.forEach((event_tech: EventTechnology) => {
            if(event_tech.event !== undefined) {
                eventList.push(event_tech.event)
            }
        })

        const res = {
            id: tag_id,
            name: technology.name,
            events: eventList,
            created_at: technology.created_at,
            edit_at: technology.edit_at
        }

        response.status(200).json(res)
        return 
    }

    async applyEvent(request: Request, response: Response, next: NextFunction) {
        const event_id: number = parseInt(request.params.event_id)
        const user_id: number = parseInt(request.params.user_id)
        const event: Event|null = await this.eventRepository.findOne({
            relations: ['reservations', 'reservations.user'],
            where: { id: event_id },
            });
        const user: User|null = await this.userRepository.findOne({
            where: { id: user_id },
            });
        
        if(event === undefined || event === null || user == undefined || user === null) {
            response.status(404).send({message: "NotFound"})
            return
        }
        
        let is_applied: Boolean = false
        if(event?.reservations !== undefined) {
            event?.reservations.forEach((reservation) => {
                if(reservation.user !== undefined && reservation.user.id === user_id) {
                    is_applied = true
                }
            });
        }

        if(is_applied) {
            response.status(400).send({message: "BadRequest"})
            return
        }
        const reservation = new Reservation()
        reservation.user = user
        reservation.event = event

        this.reservationRespository.save(reservation)
        response.status(201).send(reservation)
        return
    }
}