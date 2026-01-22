import express from "express";
import { protectRoute, isAdminRoute } from "../middlewares/authMiddlewares.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getTeamList,
  getNotifications,
  updateUserProfile,
  markNotificationsRead,
  changeUserPassword,
  activateUserProfile,
  deleteUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectRoute, getNotifications);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationsRead);
router.put("/change-password", protectRoute, changeUserPassword);

router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;
