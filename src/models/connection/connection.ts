import { Sequelize } from 'sequelize';
import dotEnv from 'dotenv';

dotEnv.config({ path: `${__dirname}/../../.env` });

const connection = new Sequelize(`${process.env.DATABASE_URL}`);

export default connection;
