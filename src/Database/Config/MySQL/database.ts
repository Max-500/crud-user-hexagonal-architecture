import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('crud-user-hexagonal-architecture', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
