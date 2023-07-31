import adminController from "../controllers/adminController";
import { Router } from "express";

const router= Router()

router.get('/getAllUsers',adminController.getAllUsers)

router.post('/deleteUser',adminController.deleteUser)

export default router