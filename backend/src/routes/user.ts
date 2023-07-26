import { Router } from "express";
import userController from "../controllers/userController";
import { tokenAuth } from "../middlewares/auth";

const router = Router()

router.post('/user/singUp',userController.postUserSignUp)

router.get('/user',tokenAuth,userController.getUser)

router.post('/userLogin',userController.userLogin)

router.post('/userLogout',userController.postLogout)


export default router

