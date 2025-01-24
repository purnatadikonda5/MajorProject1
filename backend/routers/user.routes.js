import { Router } from "express";
import * as UserController from "../controllers/user.conroller.js"
import { body } from "express-validator";
import * as authMiddleware from "../middlewares/auth.middleware.js";
const router= Router();

router.post("/register",
    body('email').isEmail().withMessage("Email must be valid email address"),
    body('password').isLength({min:3}).withMessage("Password should have atleast 3 characters"),
    UserController.createUserController
);

router.post("/login",
    body('email').isEmail().withMessage("Email must be valid email address"),
    body('password').isLength({min:3}).withMessage("Password should have atleast 3 characters"),
    UserController.createLoginController
);
router.get("/profile",authMiddleware.authUser,UserController.profileController);
export default router;