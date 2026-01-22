import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded Token Payload:", decodedToken);

      const idToFind = decodedToken.userId || decodedToken.id;
      const resp = await User.findById(idToFind).select("isAdmin email");

      if (!resp) {
        return res
          .status(401)
          .json({ status: false, message: "User no longer exists" });
      }

      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: idToFind,
      };

      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "No token provided" });
    }
  } catch (error) {
    console.log("Auth middleware error", error);

    return res.status(401).json({
      status: false,
      message: "Not authorized. Tring logging in again",
    });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try logging in as admin",
    });
  }
};

export { isAdminRoute, protectRoute };
