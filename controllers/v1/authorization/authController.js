import jwt from "jsonwebtoken";
import { TOTP } from "totp-generator";
import bcrypt from "bcrypt";
import UserModel from "../../../models/users/userModel.js";

const isProd = process.env.NODE_ENV === "production";
const TOTP_SECRET = process.env.TOTP_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

async function verifyPassword(plain, hashed) {
    return bcrypt.compare(plain, hashed); // true/false
}

function getCookieOptions() {
    // Para la mayoría de casos sameSite: "lax" funciona bien en navegadores
    return {
        httpOnly: true,
        secure: isProd,       // Debe ser true en producción (HTTPS)
        sameSite: "lax",
        path: "/",
        maxAge: 15000 * 60 * 60, // 15 horas de ejemplo; puedes ajustar
    };
}

class AuthController {
    static async login(req, res) {
        try {
            if (!req?.body) {
                return res.status(401).send({message: "No credentials provided."});
            }
            // Validar que el body incluya email, password y totp
            const missing = ["email", "password", "totp"].filter(
                (k) =>
                    !Object.prototype.hasOwnProperty.call(req.body, k) ||
                    req.body[k] === undefined ||
                    req.body[k] === null ||
                    req.body[k] === ""
            );
            if (missing.length > 0) {
                return res.status(400).send({
                    message: `Missing data: ${missing.join(", ")}`,
                });
            }
            const {email, password, totp} = req.body;
            if(!TOTP_SECRET || !JWT_SECRET){
                return res.status(500).send({message: "Server bad configured!"});
            }
            const tokentotp = await TOTP.generate(TOTP_SECRET, {
                digits: 6,
                algorithm: "SHA-1",
                period: 30,
            });
            if (isProd && totp !== tokentotp?.otp) {
                return res.status(401).send({message: "Invalid Credentials"});
            }

            let user = await UserModel.findOne({email: email}).select('+password')
            let verify = verifyPassword(password, user.password);
            if(!verify){
                return res.status(401).send({message: "Invalid Credentials", error: 401})
            }
            const payload = {id: user._id, email: user.email, roles: user.roles};
            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "1h",
            });
            // Establecer cookie
            res.cookie("access_token", token, getCookieOptions());

            return res.status(200).send({
                message: "Bienvenido",
                data: {id: user.id, email: user.email, displayName: user.displayName, roles: user.roles},
            });
        } catch (err) {
            console.log(err.message)
            return res.status(500).send({message: "Error en login.", error: err.message});
        }
    }

    static async logout(req, res) {
        try {
            // Debe coincidir path/sameSite/secure para que borre correctamente
            res.clearCookie("access_token", getCookieOptions());
            return res.status(200).send({message: "Sesión cerrada."});
        } catch (err) {
            return res.status(500).send({message: "Error al cerrar sesión.", error: err.message});
        }
    }
}

export default AuthController;
