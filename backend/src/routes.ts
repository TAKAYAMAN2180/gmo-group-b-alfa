import { UserController } from "./controller/UserController"
import {EventController} from "./controller/EventController";

export const Routes = [{
    method: "get",
    route: "/api/user",
    controller: UserController,
    action: "createUser"
}, {
    method: "get",
    route: "/api/user/:id",
    controller: UserController,
    action: "getProfile"
}, {
    method: "patch",
    route: "/api/user/:id",
    controller: UserController,
    action: "updateProfile"
}, {
    method: "post",
    route: "/api/event",
    controller: EventController,
    action: "createEvent"
}/*, {
    method: "get",
    route: "/api/event",
    controller: EventController,
    action: "getEventList"
}, {
    method: "get",
    route: "/api/event/:id",
    controller: EventController,
    action: "getEventDetail"
}, {
    method: "patch",
    route: "/api/event/:id",
    controller: EventController,
    action: "updateEvent"
}, {
    method: "delete",
    route: "/users/:id",
    controller: EventController,
    action: "deleteEvent"
}*/]