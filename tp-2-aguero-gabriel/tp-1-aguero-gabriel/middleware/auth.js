import jwt from "jsonwebtoken";
import "dotenv/config";

let tokenVerify = (req, res, next) => {
    let token = req.get('auth');
    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado. Debes iniciar sesión." });
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.SEED, (error, decoded) => {
        if (error) {
            if(error.name === 'TokenExpiredError')
            return res.status(401).json({ error: "Token ha expirado. Debes iniciar sesión." });
        }
        req.user = decoded.user;
        next();
    });
}

export default tokenVerify;