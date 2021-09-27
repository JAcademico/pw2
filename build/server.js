"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config({ path: `${__dirname}/.env` });
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(routes_1.default);
server.use('/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
server.listen(`${process.env.PORT}`, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
});
