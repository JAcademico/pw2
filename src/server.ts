import express from 'express';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJson from './swagger.json';
import routes from './routes/routes';

dotenv.config({ path: `${__dirname}/.env` });

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);
server.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerJson));

server.listen(`${process.env.PORT}`, () => {
  console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
});
