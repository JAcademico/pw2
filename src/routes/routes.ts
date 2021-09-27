import { Router } from 'express';
import AdministratorCtrl from '../controllers/administratorctrl';
import ContactCtrl from '../controllers/contactctrl';
import UserCtrl from '../controllers/userctrl';

const routes = Router();
/* ROUTES USER */
routes.post('/user/add', UserCtrl.add);
routes.delete('/user/delete/:id', UserCtrl.delete);
routes.post('/user/login', UserCtrl.login);
routes.get('/user/validate/:id', UserCtrl.validateAccount);
routes.get('/user/list', UserCtrl.list);

/* ROUTES CONTACTS */
routes.post('/contact/add', ContactCtrl.add);
routes.post('/contact/search', ContactCtrl.search);
routes.post('/contact/list', ContactCtrl.list);
routes.put('/contact/update', ContactCtrl.update);
routes.delete('/contact/delete', ContactCtrl.delete);

/* ROUTES ADMINISTRATOR */
routes.post('/administrator/login', AdministratorCtrl.login);
routes.post('/administrator/add', AdministratorCtrl.add);
routes.put('/administrator/update', AdministratorCtrl.update);

export default routes;
