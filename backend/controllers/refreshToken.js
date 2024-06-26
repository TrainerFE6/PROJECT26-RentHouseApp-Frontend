import Admin from "../models/loginModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const admin = await Admin.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!admin[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const adminId = admin[0].id;
        const username = admin[0].username;
        const email = admin[0].email;
        const accessToken = jwt.sign(
          { adminId, username, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "20s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {}
};
