import { User } from "../../Domain/Entitys/User";
import { UserInterface } from "../../Domain/Ports/UserInterface";
import UserModel from "../Models/MongoDB/User";

export class UserMongoRepository implements UserInterface {
    async save(user: User): Promise<any> {
        try {
            const newUser = {
                id: user.uuid, // Asumiendo que uuid es el ID personalizado que quieres utilizar.
                name: user.contact.name,
                lastName: user.contact.lastname, // Asegúrate de que coincida con la definición del esquema (mayúsculas/minúsculas).
                cellphone: user.contact.cellphone,
                email: user.credential.email,
                password: user.credential.password, // Considera hashear esta contraseña antes de guardarla.
                activationToken: user.status.token, // Asume que `activationToken` es opcional.
                verifiedAt: null, // Asume que `verifiedAt` es opcional.
            };
            const userResponse = await UserModel.create(newUser);
            return userResponse;
        } catch (error) {
            return {
                message: 'Ocurrió un error al guardar el usuario.',
                error: true
            };
        }
    }
}
