import { DatabaseConfig } from "../../Database/Config/DatabaseConfig";
import { MySQLConfig } from "../../Database/Config/MySQL/MySQLConfig";

import { RegisterUserUseCase } from "../Application/UseCase/RegisterUserUseCase";
import { RegisterUserController } from "./Controllers/RegisterUserController";
import { UserMySqlRepository } from "./Repositories/UserMySqlRepository";
import { UserMongoRepository } from "./Repositories/UserMongoRepository";
import { MongoConfig } from "../../Database/Config/MongoDb/MongoConfig";
import { EmailService } from "./Services/Email/Email";

const mysqlRepository = new UserMySqlRepository();
const mongoRepository = new UserMongoRepository();

const currentRepository = mongoRepository;

function getDatabaseConfig(currentRepository: any): DatabaseConfig {
    if (currentRepository instanceof UserMySqlRepository) {
      return new MySQLConfig();
    }else if(currentRepository instanceof UserMongoRepository){
        return new MongoConfig();
    }
    throw new Error('Unsupported repository type');
  }

const registerUserCase = new RegisterUserUseCase(currentRepository);
const registerUserController = new RegisterUserController(registerUserCase, new EmailService());

const dbConfig = getDatabaseConfig(currentRepository);
dbConfig.initialize().then(() => {
  console.log('Database initialized.');
});

export { registerUserController }