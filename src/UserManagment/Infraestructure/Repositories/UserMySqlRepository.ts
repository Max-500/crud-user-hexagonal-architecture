import { User } from "../../Domain/Entitys/User";
import { UserInterface } from "../../Domain/Ports/UserInterface";
import { UserModel } from "../Models/MySQL/User";

export class UserMySqlRepository implements UserInterface {
    async save(user: User): Promise<any> {
        try {

            const userResponse = await UserModel.create({
                id: user.uuid,
                name: user.contact.name,
                lastname: user.contact.lastname,
                cellphone: user.contact.cellphone,
                email: user.credential.email,
                password: user.credential.password,
                activationToken: user.status.token,
                verifiedAt: null
            });

            return userResponse.dataValues;
        } catch (error) {
            if (error instanceof Error && 'errors' in error && Array.isArray(error.errors) && error.errors.length > 0) {
                return {
                    message: error.errors[0].message,
                    error: true
                };
            } else {
                return {
                    message: 'Ocurrió un error al guardar el usuario.',
                    error: true
                };
            }
        }
    }
}