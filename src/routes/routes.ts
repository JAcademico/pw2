import { Router } from 'express';
import AdministratorCtrl from '../controllers/administratorctrl';
import ContactCtrl from '../controllers/contactctrl';
import UserCtrl from '../controllers/userctrl';

const routes = Router();
/* ROUTES USER */
routes.post('/user/add', UserCtrl.add); /* OK */
routes.post('/user/login', UserCtrl.login); /* OK */
routes.get('/user/logout', UserCtrl.logout); /* OK */
routes.get('/user/validate/:id', UserCtrl.validateAccount); /* OK */
routes.get('/user/list', UserCtrl.list); /* OK */

/* ROUTES CONTACTS */
routes.post('/contact/add', ContactCtrl.add); /* OK */
routes.put('/contact/update', ContactCtrl.update); /* OK */
routes.delete('/contact/delete/:id', ContactCtrl.delete); /* OK */
routes.get('/contact/search/:id', ContactCtrl.search); /* OK */
routes.get('/contact/list/', ContactCtrl.list); /* OK */

/* ROUTES ADMINISTRATOR */
routes.post('/administrator/login', AdministratorCtrl.login); /* OK */
routes.post('/administrator/add', AdministratorCtrl.add); /* OK */
routes.get('/administrator/logout', AdministratorCtrl.logout); /* OK */
routes.put('/administrator/update', AdministratorCtrl.update);

export default routes;
