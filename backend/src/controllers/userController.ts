import { UserDB } from "../models/userModel";
import { Request, Response } from "express";
import userHelpers from "../helpers/userHelpers";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Iuser, headerRequest } from "models/interface";
import { tokenAuth} from "../middlewares/auth";

export default {
  //user registration
  postUserSignUp: (req: Request, res: Response) => {
    userHelpers
      .userSignUp(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        if (error.message) {
          res.status(400).json({ error: true, message: error.message });
        } else {
          res
            .status(500)
            .json({ error: true, message: "Something went wrong" });
        }
      });
  },
  //getting the user details
  getUser: async (req: headerRequest, res: Response) => {
    try {
      res.json({user:req.user,msg:"success"});
    } catch (error) {
      return res.status(401).send({
        message: "unauthenticated3",
      });
    }
  },
  //user login
  userLogin: async (req: Request, res: Response) => {
    const user = await UserDB.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send({
        message: "incorrect Password please try again",
      });
    }
    //jwt setup
    const payload = {
      user_id: user._id,
      name: user.username,
      email: user.email,
      password: user.password,
    };
    const secretKey = "secret key";
    const token = jwt.sign(payload, secretKey);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 1000,
    });

    res.json({ token: token});
  },
  postLogout: (req: Request, res: Response) => {
    res.cookie("jwt", "", { maxAge: 0 });

    res.send({
      message: "logout success",
    });
  },
};
