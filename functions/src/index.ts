import * as admin from "firebase-admin";
import {registerUser, userOnCreate} from "./modules/users/index";
require("dotenv").config();

admin.initializeApp();

export {registerUser, userOnCreate};
