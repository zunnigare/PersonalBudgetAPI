import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
    // Solo desde cookie
    const token = req.cookies?.access_token;

    if (!token) {
        return res.status(401).json({message: "No autorizado. Token no encontrado en cookie."});
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET); // disponible para controladores
        next();
    } catch (err) {
        return res.status(401).json({message: "Token inválido o expirado."});
    }
}
