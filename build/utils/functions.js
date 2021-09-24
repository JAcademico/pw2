"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmin = exports.generateObjectAdmin = exports.getCookie = exports.verifyToken = exports.generateObject = exports.sendEmail = exports.validadeAccount = void 0;
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
     <a href='http://localhost:8080/user/validate/${user.codeAccess}'>Click para validar</a>`,
    };
    try {
        await mail_1.default.send(message);
    }
    catch (err) {
        console.log(err);
    }
};
exports.sendEmail = sendEmail;
const getCookie = (req) => {
    const data = String(req.cookies.user_data);
    if (data.length > 0) {
        return JSON.parse(Buffer.from(data, 'base64').toString('ascii'));
    }
    return null;
};
exports.getCookie = getCookie;
const getAdmin = (req) => {
    const data = String(req.cookies.admin_data);
    if (data === 'undefined') {
        return null;
    }
    if (data.length > 0) {
        return JSON.parse(Buffer.from(data, 'base64').toString('ascii'));
    }
    return null;
};
exports.getAdmin = getAdmin;
const generateObject = async (user) => {
    return {
        id: user.id,
        email: user.email,
        token: await generateToken(`${user.id}`),
    };
};
exports.generateObject = generateObject;
const generateObjectAdmin = async (admin) => {
    return {
        id: admin.id,
        codeAccess: admin.codeAccess,
        token: await generateToken(`${admin.id}`),
    };
};
exports.generateObjectAdmin = generateObjectAdmin;
