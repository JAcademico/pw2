"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptObject = exports.criptObjectUser = exports.criptObjectAdmin = exports.generateToken = exports.verifyToken = exports.sendEmail = exports.validadeAccount = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userdao_1 = __importDefault(require("../models/daos/userdao"));
dotenv_1.default.config({ path: `${__dirname}/../.env` });
const generateToken = async (id) => {
    return jsonwebtoken_1.default.sign({ id: id }, `${process.env.SECRET_KEY}`, {
        expiresIn: 7200,
    });
};
exports.generateToken = generateToken;
const validadeAccount = async (codeAccess) => {
    const user = await userdao_1.default.updateAccessId(codeAccess);
    console.log(user);
    return true;
};
exports.validadeAccount = validadeAccount;
const verifyToken = (token) => {
    let result = false;
    jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`, err => {
        if (!err) {
            result = true;
        }
    });
    return result;
};
exports.verifyToken = verifyToken;
const sendEmail = async (user) => {
    mail_1.default.setApiKey(`${process.env.API_EMAILKEY}`);
    const message = {
        to: user.email,
        from: 'contatemeinc@gmail.com',
        subject: 'Email de Confirmação',
        text: 'Acesse o link para acessar a sua conta',
        html: `<h2>Click no link para validar a sua conta</h2>
     <br/>
     <a href='https://apipw2if.herokuapp.com/user/validate/${user.codeAccess}'>Click para validar</a>`,
    };
    try {
        await mail_1.default.send(message);
    }
    catch (err) {
        console.log(err);
    }
};
exports.sendEmail = sendEmail;
const criptObjectUser = (user) => {
    return Buffer.from(JSON.stringify(user)).toString('base64');
};
exports.criptObjectUser = criptObjectUser;
const criptObjectAdmin = (admin) => {
    return Buffer.from(JSON.stringify(admin)).toString('base64');
};
exports.criptObjectAdmin = criptObjectAdmin;
const decryptObject = (token) => {
    return JSON.parse(Buffer.from(token, 'base64').toString('ascii'));
};
exports.decryptObject = decryptObject;
