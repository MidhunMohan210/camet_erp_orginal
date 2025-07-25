import jwt from "jsonwebtoken";

const   generateAdminToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY_ADMIN, {
    expiresIn: "30d",
  });

  res.cookie("jwt_admin", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};



export default generateAdminToken
