import express from 'express';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import cookies from 'cookie-parser';
import swaggerJson from './swagger.json';
import routes from './routes/routes';

const server = express();
server.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerJson));

server.use(cors());
server.use(cookies());
server.use(express.json());
server.use(routes);

server.listen('8080', () => {
  console.log('SERVER RUNNING ON PORT 8080');
});
