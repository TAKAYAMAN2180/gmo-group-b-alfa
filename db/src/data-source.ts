import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Event } from "./entity/Event"
import { Technology } from "./entity/Technology"
import { Reservation } from "./entity/Reservation"
import { UserTechnology } from "./entity/UserTechnology"
import { EventTechnology } from "./entity/EventTechnology"
import { EventSpeaker } from "./entity/EventSpeaker"
import { InitialSchema1693907240574 } from "./migration/1693907240574-InitialSchema"

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "gmo_intern_alpha_db",
    port: 3306,
    username: "root",
    password: "rootpass",
    database: "main",
    synchronize: true,
    logging: false,
    entities: [User, Event, Technology, Reservation, UserTechnology, EventTechnology, EventSpeaker],
    migrations: [InitialSchema1693907240574],
    subscribers: [],
})
