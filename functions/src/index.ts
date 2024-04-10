import * as admin from "firebase-admin";
import {registerUser, userOnCreate} from "./modules/users/index";
require("dotenv").config({path: "../../.env"});

admin.initializeApp();

export {registerUser, userOnCreate};
