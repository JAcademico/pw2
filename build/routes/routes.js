"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administratorctrl_1 = __importDefault(require("../controllers/administratorctrl"));
const contactctrl_1 = __importDefault(require("../controllers/contactctrl"));
const userctrl_1 = __importDefault(require("../controllers/userctrl"));
const routes = (0, express_1.Router)();
/* ROUTES USER */
routes.post('/user/add', userctrl_1.default.add); /* OK */
routes.post('/user/login', userctrl_1.default.login); /* OK */
routes.get('/user/logout', userctrl_1.default.logout); /* OK */
routes.get('/user/validate/:id', userctrl_1.default.validateAccount); /* OK */
routes.get('/user/list', userctrl_1.default.list); /* OK */
/* ROUTES CONTACTS */
routes.post('/contact/add', contactctrl_1.default.add); /* OK */
routes.put('/contact/update', contactctrl_1.default.update); /* OK */
routes.delete('/contact/delete/:id', contactctrl_1.default.delete); /* OK */
routes.get('/contact/search/:id', contactctrl_1.default.search); /* OK */
routes.get('/contact/list/', contactctrl_1.default.list); /* OK */
/* ROUTES ADMINISTRATOR */
routes.post('/administrator/login', administratorctrl_1.default.login); /* OK */
routes.post('/administrator/add', administratorctrl_1.default.add); /* OK */
routes.get('/administrator/logout', administratorctrl_1.default.logout); /* OK */
routes.put('/administrator/update', administratorctrl_1.default.update);
exports.default = routes;
