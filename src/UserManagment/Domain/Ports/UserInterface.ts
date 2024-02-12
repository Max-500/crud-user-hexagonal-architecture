import { User } from "../Entitys/User";

export interface UserInterface {
    save(user: User): Promise<User|any>;
}