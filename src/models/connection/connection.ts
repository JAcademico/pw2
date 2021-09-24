import { Sequelize } from 'sequelize';
import dotEnv from 'dotenv';

dotEnv.config({ path: `${__dirname}/../../.env` });

const connection = new Sequelize(`${process.env.DATABASE_URL}`, {
  ssl: true,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default connection;
